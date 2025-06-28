import { either } from 'fp-ts'
import type { DomainRecordsDtosUserDto } from '../../../../client/dist/models'
import { tryConvertApiResponseToTableData } from '../../../../shared/functions/api-to-table'

const convertUserDtoToTableData = (user: DomainRecordsDtosUserDto): either.Either<string, DomainRecordsDtosUserDto> => {
  try {
    if (!user.id) {
      return either.left('User ID is required')
    }
    return either.right({
      ...user,
      roles: user.roles || [],
      active: user.active ?? false
    })
  } catch (error) {
    return either.left(`Error processing user: ${error}`)
  }
}

export const convertUsersApiToTable = tryConvertApiResponseToTableData(convertUserDtoToTableData)
