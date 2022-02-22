/**
 * @since 3.0.0
 */
import type { Either } from './Either'
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec<F> {
  readonly URI?: F
  readonly chainRec: <A, B>(f: (a: A) => Kind<F, Either<A, B>>) => (a: A) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec1<F extends HKT> {
  readonly URI?: F
  readonly chainRec: <A, B>(f: (a: A) => Kind<F, Either<A, B>>) => (a: A) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec2<F extends HKT2> {
  readonly URI?: F
  readonly chainRec: <A, E, B>(f: (a: A) => Kind2<F, E, Either<A, B>>) => (a: A) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec2C<F extends HKT2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly chainRec: <A, B>(f: (a: A) => Kind2<F, E, Either<A, B>>) => (a: A) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec3<F extends HKT3> {
  readonly URI?: F
  readonly chainRec: <A, R, E, B>(f: (a: A) => Kind3<F, R, E, Either<A, B>>) => (a: A) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec3C<F extends HKT3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly chainRec: <A, R, B>(f: (a: A) => Kind3<F, R, E, Either<A, B>>) => (a: A) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface ChainRec4<F extends HKT4> {
  readonly URI?: F
  readonly chainRec: <A, S, R, E, B>(f: (a: A) => Kind4<F, S, R, E, Either<A, B>>) => (a: A) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tailRec = <A, B>(f: (a: A) => Either<A, B>) => (startWith: A): B => {
  let v = f(startWith)
  while (_.isLeft(v)) {
    v = f(v.left)
  }
  return v.right
}
