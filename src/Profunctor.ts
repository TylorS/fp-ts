/**
 * @since 3.0.0
 */
import type { Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import type { HKT2, Kind2, Kind3, Kind4, HKT3, HKT4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor<P> {
  readonly URI?: P
  readonly map: <A, B>(f: (a: A) => B) => <E>(pea: Kind2<P, E, A>) => Kind2<P, E, B>
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor2<P extends HKT2> extends Functor2<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor2C<P extends HKT2, E> extends Functor2C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor3<P extends HKT3> extends Functor3<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor3C<P extends HKT3, E> extends Functor3C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor4<P extends HKT4> extends Functor4<P> {
  readonly promap: <D, E, A, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => <S, R>(pea: Kind4<P, S, R, E, A>) => Kind4<P, S, R, D, B>
}
