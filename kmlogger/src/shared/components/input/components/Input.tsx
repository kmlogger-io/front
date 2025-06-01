import { type ChangeEvent, type ReactElement } from "react"
import type { CharacterLimit, FormattingMode, InputType, InputSize } from "../types/input.types"
import { useInput } from "../hooks/useInput.hook"
import { 
  StyledTextField, 
  StyledTextFieldSmall, 
  StyledTextFieldLarge,
  InputContainer,
} from "../styles/styles"

interface InputProps{
  onBlur?: (event: unknown) => void
  onFocus?: (event: unknown) => void
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  label: string | ReactElement
  tabIndex: number
  error: boolean
  value: unknown
  className: string
  helperText?: string | React.ReactNode | null
  disabled?: boolean
  InputType?: InputType
  FormattingMode?: FormattingMode
  CharacterLimit?: CharacterLimit
  InputSize?: InputSize
} 

export function Input(props: InputProps) {

  //Hooks
  const {
    isFocused,
    hasError,
    isValid,
    characterCount,
    isNearLimit,
    isOverLimit,
    inputRef,
    handleFocus,
    handleBlur,
    handleInput
  } = useInput({
    error: props.error,
    InputType: props.InputType,
    FormattingMode: props.FormattingMode,
    CharacterLimit: props.CharacterLimit,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onInput: props.onInput
  })

  // Styles
  const getStyledComponent = () => {
    if (props.InputSize === 'small') return StyledTextFieldSmall
    if (props.InputSize === 'large') return StyledTextFieldLarge
    return StyledTextField
  }
  const StyledComponent = getStyledComponent()

  const inputProps = props.CharacterLimit?.maximum
    ? { maxLength: props.CharacterLimit.maximum }
    : {};
  
  return(
    <InputContainer isFocused={isFocused} hasError={hasError} isValid={isValid}>
      <StyledComponent 
        className={props.className}
        label={props.label}
        value={props.value}
        error={hasError}
        helperText={props.helperText}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
        type={props.InputType === 'password' ? 'password' : 'text'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInput}
        inputRef={inputRef}
        variant="outlined"
        fullWidth
        inputProps={inputProps} 
      />
    </InputContainer>
  )
}