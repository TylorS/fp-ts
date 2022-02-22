/**
 * The `FromThese` type class represents those data types which support errors and warnings.
 *
 * @since 3.0.0
 */
import { flow } from './function'
import type { HKT2, Kind2, Kind3, Kind4, HKT3, HKT4 } from './HKT'
import {
  NaturalTransformation22,
  NaturalTransformation22C,
  NaturalTransformation23,
  NaturalTransformation23C,
  NaturalTransformation24
} from './NaturalTransformation'
import type { These, URI } from './These'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese<F> {
  readonly URI?: F
  readonly fromThese: <E, A>(e: These<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese2<F extends HKT2> {
  readonly URI?: F
  readonly fromThese: NaturalTransformation22<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese2C<F extends HKT2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromThese: NaturalTransformation22C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese3<F extends HKT3> {
  readonly URI?: F
  readonly fromThese: NaturalTransformation23<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese3C<F extends HKT3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromThese: NaturalTransformation23C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese4<F extends HKT4> {
  readonly URI?: F
  readonly fromThese: NaturalTransformation24<URI, F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromTheseK<F extends HKT4>(
  F: FromThese4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromTheseK<F extends HKT3>(
  F: FromThese3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromTheseK<F extends HKT3, E>(
  F: FromThese3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => These<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromTheseK<F extends HKT2>(
  F: FromThese2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromTheseK<F extends HKT2, E>(
  F: FromThese2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromTheseK<F>(
  F: FromThese<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromTheseK<F>(
  F: FromThese<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B> {
  return (f) => flow(f, F.fromThese)
}
