export function maxLength(maxTextLength: number) {
  return `Text can contain a maximum of ${maxTextLength} character(s)`
}

const requiredField = 'Required'
const invalidField = 'Invalid field'

const invalidZipCode = 'Invalid ZIP code field'
const invalidCpf = invalidField
const requiredCpf = 'Required'
const requiredZipCode = 'Required'

const invalidToggle = invalidField
const requiredToggle = requiredField

export function createValidationMessage(fieldName: string) {
  return {
    required: `${fieldName} field is required`,
    invalidField: `${fieldName} field is invalid`,
    invalidValue: (field: string) =>
      `${fieldName} field must be a valid ${field}`,
    invalidPhone: `${fieldName} field must be a valid number`,
    invalidTelephone: `${fieldName} field must be a valid number`,
    mustContainOnlyLetters: `${fieldName} field must contain only letters.`,
    invalidEmail: `${fieldName} field must be a valid email`,
    invalidSpace: `${fieldName} field cannot start or end with whitespace.`,
    mustContainOnlyNumbers: `${fieldName} field must contain only numbers.`,
    mustContainOnlyAlphanumericCharacters: `${fieldName} field must contain only letters and numbers.`,
    maxLength: (maximum: number) =>
      `${fieldName} field can contain a maximum of ${maximum} character(s)`,
    maxLimitReached: (maximum: number) =>
      `Maximum limit reached: ${maximum}`,
    minLength: (minimum: number) =>
      `${fieldName} field must contain at least ${minimum} character(s)`,
    invalidType: (type: string) =>
      `${fieldName} field must be of type ${type}`,
    mustNotBeEqual: (value: string) =>
      `${fieldName} field must not be equal to ${value}`,
    maxQuantity: (quantity: number) =>
      `${fieldName} field cannot contain more than ${quantity} item(s)`,
    minQuantity: (quantity: number) =>
      `${fieldName} field must contain at least ${quantity} item(s)`,
    /* date */
    maxDate: (maxDate: string) =>
      `${fieldName} field cannot be later than ${maxDate}`,
    minDate: (minDate: string) =>
      `${fieldName} field cannot be earlier than ${minDate}`,
    dateAfter: (dateAfter: string) =>
      `${fieldName} field must be after ${dateAfter}`,
    invalidDate: `${fieldName} field is invalid`,

    duplicate: `${fieldName} field cannot be duplicated`,
    remainingCharacters: (remainingCharacters: number) =>
      `${fieldName} field has ${remainingCharacters} characters remaining`,
    minValue: (minimum: number | string) =>
      `${fieldName} field must be greater than or equal to ${minimum}`,
    maxValue: (maximum: number | string) =>
      `${fieldName} field must be less than or equal to ${maximum}`,
    file: {
      sizeExceeded: () => 'File exceeds maximum allowed size',
      minSize: () => 'File is smaller than minimum allowed size',
      typeNotAllowed: (allowedTypes: string[]) => ({
        title: 'Invalid file format!',
        message: `Only ${allowedTypes.join(', ')} files are allowed!`,
      }),
      fileLimit: () => 'Maximum number of files exceeded',
      upload: () => 'Error uploading file',
      validation: () => 'File did not pass validation',
    },
  }
}

export type ValidationMessagesType = ReturnType<typeof createValidationMessage>

export const fieldErrors = {
  cpf: createValidationMessage('cpf'),
}

export const ValidationMessages = {
  createValidationMessage,
  invalidZipCode,
  invalidToggle,
  requiredToggle,
  requiredField,
  invalidCpf,
  requiredCpf,
  requiredZipCode,
  maxLength,
}
