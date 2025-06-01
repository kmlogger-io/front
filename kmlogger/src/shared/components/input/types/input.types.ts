export type InputType =
  | 'text'
  | 'select'
  | 'autocomplete'
  | 'password'
  | 'file'
  | 'email'
  | 'number'

export type InputSize = 'small' | 'medium' | 'large'

export type FormattingMode = 'onlyLetters' | 'onlyNumbers' | 'alphanumeric' | 'phone' | 'currency'
export interface CharacterLimit {
  minimum?: number
  maximum: number
  warningAt: number
  additionalCharacters?: string
  keepBasicLetters?: boolean
  keepNumbers?: boolean
  keepAccents?: boolean
  keepCedilla?: boolean
}

export type RenderingMode = 'view' | 'edit' | 'create'

