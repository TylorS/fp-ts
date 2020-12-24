/**
 * @since 3.0.0
 */
import { Lazy } from './function'

/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 * import { fold } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(fold(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const fold = <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean): A => (value ? onTrue() : onFalse())
