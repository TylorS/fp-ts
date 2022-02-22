/**
 * @since 3.0.0
 */
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import type { HKT, Kind, Kind2, Kind3, HKT2, HKT3, HKT4, Kind4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(f: (wa: Kind<W, A>) => B) => (wa: Kind<W, A>) => Kind<W, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend1<W extends HKT> extends Functor1<W> {
  readonly extend: <A, B>(f: (wa: Kind<W, A>) => B) => (wa: Kind<W, A>) => Kind<W, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend2<W extends HKT2> extends Functor2<W> {
  readonly extend: <E, A, B>(f: (wa: Kind2<W, E, A>) => B) => (wa: Kind2<W, E, A>) => Kind2<W, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend2C<W extends HKT2, E> extends Functor2C<W, E> {
  readonly extend: <A, B>(f: (wa: Kind2<W, E, A>) => B) => (wa: Kind2<W, E, A>) => Kind2<W, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend3<W extends HKT3> extends Functor3<W> {
  readonly extend: <R, E, A, B>(f: (wa: Kind3<W, R, E, A>) => B) => (wa: Kind3<W, R, E, A>) => Kind3<W, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend3C<W extends HKT3, E> extends Functor3C<W, E> {
  readonly extend: <R, A, B>(f: (wa: Kind3<W, R, E, A>) => B) => (wa: Kind3<W, R, E, A>) => Kind3<W, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend4<W extends HKT4> extends Functor4<W> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind4<W, S, R, E, A>) => B
  ) => (wa: Kind4<W, S, R, E, A>) => Kind4<W, S, R, E, B>
}
