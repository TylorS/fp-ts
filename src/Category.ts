/**
 * @since 3.0.0
 */
import type { HKT2, Kind2, Kind3, HKT3, HKT4, Kind4 } from './HKT'
import type { Semigroupoid, Semigroupoid2, Semigroupoid3, Semigroupoid4 } from './Semigroupoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => Kind2<F, A, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Category2<F extends HKT2> extends Semigroupoid2<F> {
  readonly id: <A>() => Kind2<F, A, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Category3<F extends HKT3> extends Semigroupoid3<F> {
  readonly id: <R, A>() => Kind3<F, R, A, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Category4<F extends HKT4> extends Semigroupoid4<F> {
  readonly id: <S, R, A>() => Kind4<F, S, R, A, A>
}
