import type { either } from 'fp-ts'

export type FormattingResult = either.Either<Error, string>
