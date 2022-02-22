/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4
} from './Applicative'
import { flow } from './function'
import type { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable<T> extends Functor<T> {
  readonly traverse: Traverse<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable1<T extends HKT> extends Functor1<T> {
  readonly traverse: Traverse1<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable2<T extends HKT2> extends Functor2<T> {
  readonly traverse: Traverse2<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable2C<T extends HKT2, E> extends Functor2C<T, E> {
  readonly traverse: Traverse2C<T, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable3<T extends HKT3> extends Functor3<T> {
  readonly traverse: Traverse3<T>
}

/**
 * @since 3.0.0
 */
export interface Traverse<T> {
  <F extends HKT4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: Kind<T, A>) => Kind4<F, S, R, E, Kind<T, B>>
  <F extends HKT3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends HKT3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends HKT2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends HKT2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends HKT>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse1<T extends HKT> {
  <F extends HKT4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: Kind<T, A>) => Kind4<F, S, R, E, Kind<T, B>>
  <F extends HKT3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends HKT3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends HKT2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends HKT2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends HKT>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2<T extends HKT2> {
  <F extends HKT4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind4<F, S, R, FE, Kind2<T, TE, B>>
  <F extends HKT3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends HKT3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends HKT2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends HKT2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends HKT>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2C<T extends HKT2, E> {
  <F extends HKT4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind4<F, S, R, FE, Kind2<T, E, B>>
  <F extends HKT3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends HKT3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends HKT2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends HKT2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends HKT>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse3<T extends HKT3> {
  <F extends HKT4>(F: Applicative4<F>): <A, S, FR, FE, B>(
    f: (a: A) => Kind4<F, S, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind4<F, S, FR, FE, Kind3<T, TR, TE, B>>
  <F extends HKT3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends HKT3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends HKT2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends HKT2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends HKT>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <R, E>(ta: Kind3<T, R, E, A>) => Kind<F, Kind3<T, R, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => <R, E>(ta: Kind3<T, R, E, A>) => Kind<F, Kind3<T, R, E, B>>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `traverse` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function traverse<T extends HKT, G extends HKT>(
  T: Traversable1<T>,
  G: Traversable1<G>
): {
  <F extends HKT>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => Kind<F, B>) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>>
}
export function traverse<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A, B>(f: (a: A) => Kind<F, B>) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>>
export function traverse<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A, B>(f: (a: A) => Kind<F, B>) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>> {
  return (F) => flow(G.traverse(F), T.traverse(F))
}
