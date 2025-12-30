export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  xAppAlert as alert,
  clearAllAlerts,
  xAppConfirm as confirm,
  xAppPrompt as prompt,
} from './AlertBuilder';
