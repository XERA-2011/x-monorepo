<template>
  <UModal v-model="isOpen">
    <UCard>
      <!-- 隐藏的可聚焦元素，解决 FocusTrap 警告 -->
      <button class="sr-only" aria-hidden="true">focus trap placeholder</button>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-semibold">安全验证</span>
          <UButton 
            icon="i-heroicons-arrow-path" 
            color="gray" 
            variant="ghost" 
            size="xs"
            @click="refreshCaptcha"
            :loading="loading"
          />
        </div>
      </template>

      <div v-if="captchaData" class="captcha-container">
        <!-- 背景图 + 拼图 -->
        <div class="captcha-image-wrapper" ref="imageWrapper">
          <img 
            :src="`data:image/png;base64,${captchaData.originalImageBase64}`" 
            class="captcha-bg"
            draggable="false"
          />
          <img 
            :src="`data:image/png;base64,${captchaData.jigsawImageBase64}`" 
            class="captcha-jigsaw"
            :style="{ left: `${sliderValue}px` }"
            draggable="false"
          />
        </div>

        <!-- 滑动条 -->
        <div class="slider-container" ref="sliderContainer">
          <div class="slider-track">
            <div class="slider-fill" :style="{ width: `${sliderValue}px` }"></div>
          </div>
          <div 
            class="slider-thumb"
            :style="{ left: `${sliderValue}px` }"
            tabindex="0"
            @mousedown="startDrag"
            @touchstart="startDrag"
            @keydown.right="sliderValue = Math.min(sliderValue + 5, 270)"
            @keydown.left="sliderValue = Math.max(sliderValue - 5, 0)"
          >
            <span class="text-lg">↔️</span>
          </div>
          <span class="slider-hint" v-if="sliderValue === 0">向右拖动滑块完成验证</span>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</div>
      </div>

      <div v-else class="text-center py-8">
        <div class="inline-block animate-spin text-2xl text-gray-400">↻</div>
        <p class="text-gray-500 mt-2">加载验证码...</p>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { getCaptchaApi, checkCaptchaApi } from '~/api/core/auth'
import CryptoJS from 'crypto-js'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'success': [captchaVerification: string]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)
const error = ref('')
const sliderValue = ref(0)
const captchaData = ref<{
  originalImageBase64: string
  jigsawImageBase64: string
  secretKey: string
  token: string
} | null>(null)

const sliderContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)

// 获取验证码
async function refreshCaptcha() {
  loading.value = true
  error.value = ''
  sliderValue.value = 0
  captchaData.value = null
  
  try {
    const res = await getCaptchaApi({ captchaType: 'blockPuzzle' })
    console.log('Captcha API response:', res)
    // API 返回格式：{ repCode: '0000', repData: {...} }
    if ((res as any) && (res as any).repCode === '0000' && (res as any).repData) {
      captchaData.value = (res as any).repData
    } else if (res && res.data) {
      // 兼容标准格式
      captchaData.value = res.data
    } else {
      error.value = '获取验证码失败'
    }
  } catch (e: any) {
    console.error('Captcha error:', e)
    error.value = '获取验证码失败'
  } finally {
    loading.value = false
  }
}

// 开始拖动
function startDrag(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  isDragging.value = true
  startX.value = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', endDrag)
}

// 拖动中
function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value || !sliderContainer.value) return
  
  const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
  const containerRect = sliderContainer.value.getBoundingClientRect()
  const maxValue = containerRect.width - 40 // 减去滑块宽度
  
  let newValue = clientX - containerRect.left - 20 // 滑块中心
  newValue = Math.max(0, Math.min(newValue, maxValue))
  sliderValue.value = newValue
}

// 结束拖动
async function endDrag() {
  if (!isDragging.value) return
  isDragging.value = false
  
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
  
  // 验证
  await verifyCaptcha()
}

// 校验验证码
async function verifyCaptcha() {
  if (!captchaData.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const moveLeftDistance = Math.round(sliderValue.value)
    const pointJson = JSON.stringify({ x: moveLeftDistance, y: 5 })
    
    // 加密: AES 加密 pointJson，密钥是 secretKey（16位字符串）
    const secretKey = captchaData.value.secretKey
    const token = captchaData.value.token
    
    const encrypted = CryptoJS.AES.encrypt(pointJson, CryptoJS.enc.Utf8.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    
    const res = await checkCaptchaApi({
      captchaType: 'blockPuzzle',
      pointJson: encrypted,
      token: token  // 使用 token 字段，不是 secretKey
    })
    
    console.log('Check captcha response:', res)
    
    // 检查验证结果：repCode === '0000' 表示成功
    const isSuccess = ((res as any) && (res as any).repCode === '0000')
    
    if (isSuccess) {
      // 验证成功，生成 captchaVerification
      // 格式: AES.encrypt(token + '---' + pointJson, secretKey)
      const captchaVerification = CryptoJS.AES.encrypt(
        `${token}---${pointJson}`,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      ).toString()
      
      emit('success', captchaVerification)
      isOpen.value = false
    } else {
      error.value = (res as any)?.repMsg || '验证失败，请重试'
      await refreshCaptcha()
    }
  } catch (e: any) {
    console.error('Captcha verify error:', e)
    error.value = '验证失败，请重试'
    await refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// 监听打开状态
watch(isOpen, (value) => {
  if (value) {
    refreshCaptcha()
  }
})
</script>

<style scoped>
.captcha-container {
  user-select: none;
}

.captcha-image-wrapper {
  position: relative;
  width: 310px;
  height: 155px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 4px;
}

.captcha-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.captcha-jigsaw {
  position: absolute;
  top: 0;
  height: 100%;
  transition: left 0.05s linear;
}

.slider-container {
  position: relative;
  width: 310px;
  height: 40px;
  margin: 16px auto 0;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  transform: translateY(-50%);
  overflow: hidden;
}

.slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 0.05s linear;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #10b981;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: left 0.05s linear;
}

.slider-thumb:active {
  cursor: grabbing;
}

.slider-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #9ca3af;
  font-size: 14px;
  pointer-events: none;
}
</style>
