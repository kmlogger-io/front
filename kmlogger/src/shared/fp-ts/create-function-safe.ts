import { either } from 'fp-ts'

type Parameters = readonly unknown[]

export function createSafeFunction<Args extends Parameters, Error, Output>(
  fn: (...args: Args) => either.Either<Error, Output>
) {
  return (...args: Args) => ({
    or: (fallback: Output) => either.getOrElse(() => fallback)(fn(...args)),
    orError: (fallback: Error) =>
      either.getOrElseW(() => {
        throw fallback
      })(fn(...args)),
    orThrow: () =>
      either.getOrElseW(e => {
        throw e
      })(fn(...args)),
    orIgnore: (fallback?: null | undefined) =>
      either.getOrElseW(() => fallback)(fn(...args)),
  })
}
