import type { ZodDefault, ZodNumber, ZodString, ZodTypeAny } from 'zod';

import { isObject, isString } from '@x-monorepo-core/shared/utils';
import { toRaw } from 'vue';

// Zod v4 兼容：使用类型别名处理内部 API 变化
type AnyZodObject = ZodTypeAny;
type ZodEffects<T extends ZodTypeAny = ZodTypeAny> = T;

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 * 使用 toRaw 解包 Vue 代理以避免 Zod 4 的 _def 属性访问冲突
 */
export function getBaseRules<
  ChildType extends AnyZodObject | ZodTypeAny = ZodTypeAny,
>(schema: ChildType | ZodEffects<ChildType>): ChildType | null {
  if (!schema || isString(schema)) return null;
  const rawSchema = toRaw(schema);
  const def = rawSchema._def as any;
  if ('innerType' in def) return getBaseRules(def.innerType as ChildType);

  if ('schema' in def) return getBaseRules(def.schema as ChildType);

  return schema as ChildType;
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 * 使用 toRaw 解包 Vue 代理以避免 Zod 4 的 _def 属性访问冲突
 */
export function getDefaultValueInZodStack(schema: ZodTypeAny): any {
  if (!schema || isString(schema)) {
    return;
  }
  const rawSchema = toRaw(schema);
  const typedSchema = rawSchema as unknown as ZodDefault<ZodNumber | ZodString>;
  const def = typedSchema._def as any;

  if (def?.typeName === 'ZodDefault') return def.defaultValue();

  if ('innerType' in def) {
    return getDefaultValueInZodStack(def.innerType as unknown as ZodTypeAny);
  }
  if ('schema' in def) {
    return getDefaultValueInZodStack(def.schema as ZodTypeAny);
  }

  return undefined;
}

export function isEventObjectLike(obj: any) {
  if (!obj || !isObject(obj)) {
    return false;
  }
  return Reflect.has(obj, 'target') && Reflect.has(obj, 'stopPropagation');
}
