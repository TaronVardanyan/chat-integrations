import { useMessageContext } from './contexts'
import { isJsonString, safeReadJson } from './helpers'

export function useFormSlots (): Record<string, string | Record<string, boolean | number | string>> {
  const { message } = useMessageContext()
  const messageFields = message.form?.fields || {}

  const returnObject = {}
  Object.keys(messageFields).forEach(item => {
    const fieldValue = isJsonString(messageFields[item]) ? safeReadJson(messageFields[item]) : messageFields[item]
    const fieldName = item.replace(`form_${message.form?.title || ''}_`, '')

    returnObject[fieldName] = fieldValue
  })

  return returnObject
}
