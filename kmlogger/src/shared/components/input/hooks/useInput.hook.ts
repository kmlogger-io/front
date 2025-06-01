import { useRef, useState, useCallback, useEffect, type ChangeEvent } from "react"
import type { CharacterLimit, FormattingMode, InputType } from "../types/input.types"
import { safeOnlyNumbers } from "../../../formatters/only-numbers/only-numbers.formatter"
import { safeOnlyLetters } from "../../../formatters/only-letters/only-letters.formatter"
import { safeAlphanumeric } from "../../../formatters/alphanumeric/alphanumeric.formatter"
import { safePhone } from "../../../formatters/phone/phone.formatter"
import { safeCurrency } from "../../../formatters/concurrency/currency.formatter"

interface UseInputProps {
  error: boolean
  InputType?: InputType
  FormattingMode?: FormattingMode
  CharacterLimit?: CharacterLimit
  onBlur?: (event: unknown) => void
  onFocus?: (event: unknown) => void
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function useInput(props: UseInputProps) {
  const { 
    onBlur, 
    onFocus, 
    onInput, 
    error, 
    InputType, 
    FormattingMode, 
    CharacterLimit 
  } = props

  // States
  const [isFocused, setIsFocused] = useState(false)
  const [hasError, setHasError] = useState(error || false)
  const [isValid, setIsValid] = useState(true)
  const [characterCount, setCharacterCount] = useState(0)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)

  // Hooks
  const validateInput = useCallback((value: string) => {
    if (InputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    }
    if (InputType === 'number') {
      return !isNaN(Number(value))
    }
    return true
  }, [InputType])

  const formatValue = useCallback((value: string) => {
    switch (FormattingMode) {
      case 'phone':
        return safePhone(value)
      case 'currency':
        return safeCurrency(value)
      case 'onlyNumbers':
        return safeOnlyNumbers(value)
      case 'onlyLetters':
        return safeOnlyLetters(value)
      case 'alphanumeric':
        return safeAlphanumeric(value)
      default:
        return value
    }
  }, [FormattingMode])

  useEffect(() => {
    setHasError(error)
  }, [error])

  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(event)
  }, [onFocus])

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (inputRef.current) {
      const isInputValid = validateInput(inputRef.current.value)
      setIsValid(isInputValid)
    }
    onBlur?.(event)
  }, [onBlur, validateInput])

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    value = formatValue(value)
    setCharacterCount(value.length)
    if (CharacterLimit && value.length > CharacterLimit.maximum) {
      event.target.value = value.slice(0, CharacterLimit.maximum)
      return
    }
    event.target.value = value
    onInput?.(event)
  }, [onInput, CharacterLimit, formatValue])

  const isNearLimit = CharacterLimit 
    ? characterCount >= CharacterLimit.warningAt 
    : false
  const isOverLimit = CharacterLimit 
    ? characterCount > CharacterLimit.maximum 
    : false

  const focus = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const clear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
      setCharacterCount(0)
    }
  }, [])

  const getValue = useCallback(() => {
    return inputRef.current?.value || ''
  }, [])

  return {
    isFocused,
    hasError,
    isValid,
    characterCount,
    isNearLimit,
    isOverLimit,
    inputRef,
    handleFocus,
    handleBlur,
    handleInput,
    focus,
    clear,
    getValue,
    validateInput,
    formatValue
  }
}
