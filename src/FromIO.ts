/**
 * Lift a computation from the `IO` monad.
 *
 * @since 3.0.0
 */
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4, chainFirst } from './Chain'
import { flow } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'
import type { IO, URI } from './IO'
import {
  NaturalTransformation11,
  NaturalTransformation12,
  NaturalTransformation12C,
  NaturalTransformation13,
  NaturalTransformation13C,
  NaturalTransformation14
} from './NaturalTransformation'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO<F> {
  readonly URI?: F
  readonly fromIO: <A>(fa: IO<A>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO1<F extends HKT> {
  readonly URI?: F
  readonly fromIO: NaturalTransformation11<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO2<F extends HKT2> {
  readonly URI?: F
  readonly fromIO: NaturalTransformation12<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO2C<F extends HKT2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromIO: NaturalTransformation12C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO3<F extends HKT3> {
  readonly URI?: F
  readonly fromIO: NaturalTransformation13<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO3C<F extends HKT3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromIO: NaturalTransformation13C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO4<F extends HKT4> {
  readonly URI?: F
  readonly fromIO: NaturalTransformation14<URI, F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromIOK<F extends HKT4>(
  F: FromIO4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export function fromIOK<F extends HKT3>(
  F: FromIO3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export function fromIOK<F extends HKT3, E>(
  F: FromIO3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromIOK<F extends HKT2>(
  F: FromIO2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => Kind2<F, E, B>
export function fromIOK<F extends HKT2, E>(
  F: FromIO2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind2<F, E, B>
export function fromIOK<F extends HKT>(
  F: FromIO1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind<F, B>
export function fromIOK<F>(
  F: FromIO<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind<F, B>
export function fromIOK<F>(
  F: FromIO<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind<F, B> {
  return (f) => flow(f, F.fromIO)
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainIOK<M extends HKT4>(
  F: FromIO4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainIOK<M extends HKT3>(
  F: FromIO3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainIOK<M extends HKT3, E>(
  F: FromIO3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainIOK<M extends HKT2>(
  F: FromIO2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainIOK<M extends HKT2, E>(
  F: FromIO2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainIOK<M extends HKT>(
  F: FromIO1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, B>
export function chainIOK<M>(F: FromIO<M>, M: Chain<M>): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, B>
export function chainIOK<M>(F: FromIO<M>, M: Chain<M>): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, B> {
  return (f) => M.chain(flow(f, F.fromIO))
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainFirstIOK<M extends HKT4>(
  F: FromIO4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstIOK<M extends HKT3>(
  F: FromIO3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstIOK<M extends HKT3, E>(
  F: FromIO3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstIOK<M extends HKT2>(
  F: FromIO2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstIOK<M extends HKT2, E>(
  F: FromIO2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstIOK<M extends HKT>(
  F: FromIO1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirstIOK<M>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirstIOK<M>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, A> {
  const chainFirstM = chainFirst(M)
  return (f) => chainFirstM(flow(f, F.fromIO))
}
