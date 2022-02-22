/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.
 *
 * @since 3.0.0
 */
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'
import type { Option } from './Option'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable<F> {
  readonly URI?: F
  readonly unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable1<F extends HKT> {
  readonly URI?: F
  readonly unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable2<F extends HKT2> {
  readonly URI?: F
  readonly unfold: <B, A, E>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable2C<F extends HKT2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable3<F extends HKT3> {
  readonly URI?: F
  readonly unfold: <B, A, R, E>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable3C<F extends HKT3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly unfold: <B, A, R>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable4<F extends HKT4> {
  readonly URI?: F
  readonly unfold: <B, A, S, R, E>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind4<F, S, R, E, A>
}
