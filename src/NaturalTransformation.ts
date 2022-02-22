/**
 * A type for natural transformations.
 *
 * A natural transformation is a mapping between type constructors of kind `* -> *` where the mapping
 * operation has no ability to manipulate the inner values.
 *
 * The definition of a natural transformation in category theory states that `F` and `G` should be functors,
 * but the `Functor` constraint is not enforced here; that the types are of kind `* -> *` is enough for our purposes.
 *
 * @since 3.0.0
 */
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'

/**
 * @since 3.0.0
 */
export interface NaturalTransformation<F, G> {
  <A>(fa: Kind<F, A>): Kind<G, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation11<F extends HKT, G extends HKT> {
  <A>(fa: Kind<F, A>): Kind<G, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation12<F extends HKT, G extends HKT2> {
  <A, E>(fa: Kind<F, A>): Kind2<G, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation12C<F extends HKT, G extends HKT2, E> {
  <A>(fa: Kind<F, A>): Kind2<G, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation13<F extends HKT, G extends HKT3> {
  <A, R, E>(fa: Kind<F, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation13C<F extends HKT, G extends HKT3, E> {
  <A, R>(fa: Kind<F, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation14<F extends HKT, G extends HKT4> {
  <A, S, R, E>(fa: Kind<F, A>): Kind4<G, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation14C<F extends HKT, G extends HKT4, E> {
  <A, S, R>(fa: Kind<F, A>): Kind4<G, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation21<F extends HKT2, G extends HKT> {
  <A>(fa: Kind2<F, unknown, A>): Kind<G, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation22<F extends HKT2, G extends HKT2> {
  <E, A>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation22C<F extends HKT2, G extends HKT2, E> {
  <A>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation23<F extends HKT2, G extends HKT3> {
  <E, A, R>(fa: Kind2<F, E, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation23C<F extends HKT2, G extends HKT3, E> {
  <A, R>(fa: Kind2<F, E, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation24<F extends HKT2, G extends HKT4> {
  <E, A, S, R>(fa: Kind2<F, E, A>): Kind4<G, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation23R<F extends HKT2, G extends HKT3> {
  <R, A, E>(fa: Kind2<F, R, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation23RC<F extends HKT2, G extends HKT3, E> {
  <R, A>(fa: Kind2<F, R, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation24R<F extends HKT2, G extends HKT4> {
  <R, A, S, E>(fa: Kind2<F, R, A>): Kind4<G, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation24S<F extends HKT2, G extends HKT4> {
  <S, A, R, E>(fa: Kind2<F, S, A>): Kind4<G, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation33<F extends HKT3, G extends HKT3> {
  <R, E, A>(fa: Kind3<F, R, E, A>): Kind3<G, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation34<F extends HKT3, G extends HKT4> {
  <R, E, A, S>(fa: Kind3<F, R, E, A>): Kind4<G, S, R, E, A>
}
