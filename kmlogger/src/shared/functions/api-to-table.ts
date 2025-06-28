import { either } from 'fp-ts'
import { createSafeFunction } from '../fp-ts/create-function-safe'
import type { BaseResponse } from '../types/api-types.types'

export type ItemConverter<TApiItem, TTableItem> = (
  item: TApiItem
) => either.Either<string, TTableItem>

function convertApiResponseToTableData<TApiItem, TTableItem>(
  response: BaseResponse<TApiItem>,
  itemConverter: ItemConverter<TApiItem, TTableItem>
): either.Either<string, TTableItem[]> {
  try {
    if (!response) {
      return either.left('Invalid API response: response is null or undefined')
    }
    if (!response.data || !Array.isArray(response.data)) {
      return either.left('Invalid API response: no data array found')
    }
    const convertedItems: TTableItem[] = []
    const errors: string[] = []
    for (const [index, item] of response.data.entries()) {
      const result = itemConverter(item)
      if (either.isRight(result)) {
        convertedItems.push(result.right)
      } else {
        errors.push(`Item ${index}: ${result.left}`)
      }
    }
    if (errors.length > 0) {
      console.warn('Some items failed to convert:', errors)
    }
    return either.right(convertedItems)
  } catch (error) {
    return either.left(`Error processing API response: ${error}`)
  }
}

export function tryConvertApiResponseToTableData<TApiItem, TTableItem>(
  itemConverter: ItemConverter<TApiItem, TTableItem>
) {
  return createSafeFunction((response: BaseResponse<TApiItem>) =>
    convertApiResponseToTableData(response, itemConverter)
  )
}


const identityConverter = <T>(item: T): either.Either<string, T> => {
  try {
    if (!item) {
      return either.left('Item is null or undefined')
    }
    return either.right(item)
  } catch (error) {
    return either.left(`Error processing item: ${error}`)
  }
}

export const tryConvertApiToTable = <TApiItem>() => {
  return tryConvertApiResponseToTableData(identityConverter<TApiItem>)
}