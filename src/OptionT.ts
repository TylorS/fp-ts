/**
 * @since 3.0.0
 */
import { ap as ap_, Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import type { Either } from './Either'
import { constant, flow, Lazy } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4, map as map_ } from './Functor'
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'
import * as _ from './internal'
import type { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import * as O from './Option'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function some<F extends HKT4>(F: Pointed4<F>): <A, S, R, E>(a: A) => Kind4<F, S, R, E, Option<A>>
export function some<F extends HKT3>(F: Pointed3<F>): <A, R, E>(a: A) => Kind3<F, R, E, Option<A>>
export function some<F extends HKT3, E>(F: Pointed3C<F, E>): <A, R>(a: A) => Kind3<F, R, E, Option<A>>
export function some<F extends HKT2>(F: Pointed2<F>): <A, E>(a: A) => Kind2<F, E, Option<A>>
export function some<F extends HKT2, E>(F: Pointed2C<F, E>): <A>(a: A) => Kind2<F, E, Option<A>>
export function some<F extends HKT>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => Kind<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => Kind<F, Option<A>> {
  return flow(_.some, F.of)
}

/**
 * @since 3.0.0
 */
export function zero<F extends HKT4>(F: Pointed4<F>): <S, R, E, A>() => Kind4<F, S, R, E, Option<A>>
export function zero<F extends HKT3>(F: Pointed3<F>): <R, E, A>() => Kind3<F, R, E, Option<A>>
export function zero<F extends HKT3, E>(F: Pointed3C<F, E>): <R, A>() => Kind3<F, R, E, Option<A>>
export function zero<F extends HKT2>(F: Pointed2<F>): <E, A>() => Kind2<F, E, Option<A>>
export function zero<F extends HKT2, E>(F: Pointed2C<F, E>): <A>() => Kind2<F, E, Option<A>>
export function zero<F extends HKT>(F: Pointed1<F>): <A>() => Kind<F, Option<A>>
export function zero<F>(F: Pointed<F>): <A>() => Kind<F, Option<A>>
export function zero<F>(F: Pointed<F>): <A>() => Kind<F, Option<A>> {
  return constant(F.of(_.none))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends HKT4>(
  F: Functor4<F>
): <S, R, E, A>(ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, Option<A>>
export function fromF<F extends HKT3>(F: Functor3<F>): <R, E, A>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, Option<A>>
export function fromF<F extends HKT3, E>(
  F: Functor3C<F, E>
): <R, A>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, Option<A>>
export function fromF<F extends HKT2>(F: Functor2<F>): <E, A>(ma: Kind2<F, E, A>) => Kind2<F, E, Option<A>>
export function fromF<F extends HKT2, E>(F: Functor2C<F, E>): <A>(ma: Kind2<F, E, A>) => Kind2<F, E, Option<A>>
export function fromF<F extends HKT>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>> {
  return F.map(_.some)
}

/**
 * @since 3.0.0
 */
export function fromNullable<F extends HKT4>(
  F: Pointed4<F>
): <A, S, R, E>(a: A) => Kind4<F, S, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends HKT3>(F: Pointed3<F>): <A, R, E>(a: A) => Kind3<F, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends HKT3, E>(
  F: Pointed3C<F, E>
): <A, R>(a: A) => Kind3<F, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends HKT2>(F: Pointed2<F>): <A, E>(a: A) => Kind2<F, E, Option<NonNullable<A>>>
export function fromNullable<F extends HKT2, E>(F: Pointed2C<F, E>): <A>(a: A) => Kind2<F, E, Option<NonNullable<A>>>
export function fromNullable<F extends HKT>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>> {
  return flow(O.fromNullable, F.of)
}

/**
 * @since 3.0.0
 */
export function fromNullableK<F extends HKT4>(
  F: Pointed4<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, E>(...a: A) => Kind4<F, S, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends HKT3>(
  F: Pointed3<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R, E>(...a: A) => Kind3<F, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends HKT3, E>(
  F: Pointed3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R>(...a: A) => Kind3<F, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends HKT2>(
  F: Pointed2<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <E>(...a: A) => Kind2<F, E, Option<NonNullable<B>>>
export function fromNullableK<F extends HKT2, E>(
  F: Pointed2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind2<F, E, Option<NonNullable<B>>>
export function fromNullableK<F extends HKT>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, Option<NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (f) => flow(f, fromNullableF)
}

/**
 * @since 3.0.0
 */
export function fromOptionK<F extends HKT4>(
  F: Pointed4<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R, E>(...a: A) => Kind4<F, S, R, E, Option<B>>
export function fromOptionK<F extends HKT3>(
  F: Pointed3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R, E>(...a: A) => Kind3<F, R, E, Option<B>>
export function fromOptionK<F extends HKT3, E>(
  F: Pointed3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, Option<B>>
export function fromOptionK<F extends HKT2>(
  F: Pointed2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <E>(...a: A) => Kind2<F, E, Option<B>>
export function fromOptionK<F extends HKT2, E>(
  F: Pointed2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, Option<B>>
export function fromOptionK<F extends HKT>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind<F, Option<B>> {
  return (f) => flow(f, F.of)
}

/**
 * @since 3.0.0
 */
export function fromEither<F extends HKT4>(
  F: Pointed4<F>
): <A, S, R, E>(e: Either<unknown, A>) => Kind4<F, S, R, E, Option<A>>
export function fromEither<F extends HKT3>(
  F: Pointed3<F>
): <A, R, E>(e: Either<unknown, A>) => Kind3<F, R, E, Option<A>>
export function fromEither<F extends HKT3, E>(
  F: Pointed3C<F, E>
): <A, R>(e: Either<unknown, A>) => Kind3<F, R, E, Option<A>>
export function fromEither<F extends HKT2>(F: Pointed2<F>): <A, E>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends HKT2, E>(F: Pointed2C<F, E>): <A>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends HKT2, E>(F: Pointed2C<F, E>): <A>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends HKT>(F: Pointed1<F>): <A>(e: Either<unknown, A>) => Kind<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <A>(e: Either<unknown, A>) => Kind<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <A>(e: Either<unknown, A>) => Kind<F, Option<A>> {
  return flow(O.fromEither, F.of)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT4>(
  F: Functor4<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <S, R, E>(ma: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, B>
export function match<F extends HKT3>(
  F: Functor3<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <R, E>(ma: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, B>
export function match<F extends HKT3, E>(
  F: Functor3C<F, E>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <R>(ma: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, B>
export function match<F extends HKT2>(
  F: Functor2<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <E>(ma: Kind2<F, E, Option<A>>) => Kind2<F, E, B>
export function match<F extends HKT2, E>(
  F: Functor2C<F, E>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind2<F, E, Option<A>>) => Kind2<F, E, B>
export function match<F extends HKT>(
  F: Functor1<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind<F, Option<A>>) => Kind<F, B>
export function match<F>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind<F, Option<A>>) => Kind<F, B>
export function match<F>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind<F, Option<A>>) => Kind<F, B> {
  return flow(O.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT4>(
  M: Chain4<M>
): <S, R, E, B, A>(
  onNone: () => Kind4<M, S, R, E, B>,
  onSome: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, B>
export function matchE<M extends HKT3>(
  M: Chain3<M>
): <R, E, B, A>(
  onNone: () => Kind3<M, R, E, B>,
  onSome: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, B>
export function matchE<M extends HKT3, E>(
  M: Chain3C<M, E>
): <R, B, A>(
  onNone: () => Kind3<M, R, E, B>,
  onSome: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, B>
export function matchE<M extends HKT2>(
  M: Chain2<M>
): <E, B, A>(
  onNone: () => Kind2<M, E, B>,
  onSome: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, B>
export function matchE<M extends HKT2, E>(
  M: Chain2C<M, E>
): <B, A>(
  onNone: () => Kind2<M, E, B>,
  onSome: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, B>
export function matchE<M extends HKT>(
  M: Chain1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function matchE<M>(
  M: Chain<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function matchE<M>(
  M: Chain<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B> {
  return flow(O.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<F extends HKT4>(
  F: Functor4<F>
): <A>(onNone: Lazy<A>) => <S, R, E>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
export function getOrElse<F extends HKT3>(
  F: Functor3<F>
): <A>(onNone: Lazy<A>) => <R, E>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
export function getOrElse<F extends HKT3, E>(
  F: Functor3C<F, E>
): <A>(onNone: Lazy<A>) => <R>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
export function getOrElse<F extends HKT2>(
  F: Functor2<F>
): <A>(onNone: Lazy<A>) => <E>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
export function getOrElse<F extends HKT2, E>(
  F: Functor2C<F, E>
): <A>(onNone: Lazy<A>) => (fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
export function getOrElse<F extends HKT>(
  F: Functor1<F>
): <A>(onNone: Lazy<A>) => (fa: Kind<F, Option<A>>) => Kind<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(onNone: Lazy<A>) => (fa: Kind<F, Option<A>>) => Kind<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(onNone: Lazy<A>) => (fa: Kind<F, Option<A>>) => Kind<F, A> {
  return flow(O.getOrElse, F.map)
}

/**
 * @since 3.0.0
 */
export function getOrElseE<M extends HKT4>(
  M: Monad4<M>
): <S, R, E, A>(onNone: Lazy<Kind4<M, S, R, E, A>>) => (fa: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, A>
export function getOrElseE<M extends HKT3>(
  M: Monad3<M>
): <R, E, A>(onNone: Lazy<Kind3<M, R, E, A>>) => (fa: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, A>
export function getOrElseE<M extends HKT3, E>(
  M: Monad3C<M, E>
): <R, A>(onNone: Lazy<Kind3<M, R, E, A>>) => (fa: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, A>
export function getOrElseE<M extends HKT2>(
  M: Monad2<M>
): <E, A>(onNone: Lazy<Kind2<M, E, A>>) => (fa: Kind2<M, E, Option<A>>) => Kind2<M, E, A>
export function getOrElseE<M extends HKT2, E>(
  M: Monad2C<M, E>
): <A>(onNone: Lazy<Kind2<M, E, A>>) => (fa: Kind2<M, E, Option<A>>) => Kind2<M, E, A>
export function getOrElseE<M extends HKT>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElseE<M>(M: Monad<M>): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElseE<M>(M: Monad<M>): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A> {
  return (onNone) => M.chain(O.match(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function chainNullableK<M extends HKT4>(
  M: Monad4<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, E>(ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends HKT3>(
  M: Monad3<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <R, E>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends HKT3, E>(
  M: Monad3C<M, E>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends HKT2>(
  M: Monad2<M>
): <A, B>(f: (a: A) => B | null | undefined) => <E>(ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<NonNullable<B>>>
export function chainNullableK<M extends HKT2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<NonNullable<B>>>
export function chainNullableK<M extends HKT>(
  M: Monad1<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, Option<A>>) => Kind<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, Option<A>>) => Kind<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, Option<A>>) => Kind<M, Option<NonNullable<B>>> {
  return flow(fromNullableK(M), chain(M))
}

/**
 * @since 3.0.0
 */
export function chainOptionK<M extends HKT4>(
  M: Monad4<M>
): <A, B>(f: (a: A) => Option<B>) => <S, R, E>(ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<B>>
export function chainOptionK<M extends HKT3>(
  M: Monad3<M>
): <A, B>(f: (a: A) => Option<B>) => <R, E>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chainOptionK<M extends HKT3, E>(
  M: Monad3C<M, E>
): <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chainOptionK<M extends HKT2>(
  M: Monad2<M>
): <A, B>(f: (a: A) => Option<B>) => <E>(ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chainOptionK<M extends HKT2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chainOptionK<M extends HKT>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>> {
  return flow(fromOptionK(M), chain(M))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends HKT4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, Option<B>>
export function map<F extends HKT3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, Option<B>>
export function map<F extends HKT3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, Option<B>>
export function map<F extends HKT2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, Option<B>>
export function map<F extends HKT2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, Option<A>>) => Kind2<F, E, Option<B>>
export function map<F extends HKT>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 3.0.0
 */
export function ap<F extends HKT4>(
  F: Apply4<F>
): <S, R, E, A>(
  fa: Kind4<F, S, R, E, Option<A>>
) => <B>(fab: Kind4<F, S, R, E, Option<(a: A) => B>>) => Kind4<F, S, R, E, Option<B>>
export function ap<F extends HKT3>(
  F: Apply3<F>
): <R, E, A>(
  fa: Kind3<F, R, E, Option<A>>
) => <B>(fab: Kind3<F, R, E, Option<(a: A) => B>>) => Kind3<F, R, E, Option<B>>
export function ap<F extends HKT3, E>(
  F: Apply3C<F, E>
): <R, A>(fa: Kind3<F, R, E, Option<A>>) => <B>(fab: Kind3<F, R, E, Option<(a: A) => B>>) => Kind3<F, R, E, Option<B>>
export function ap<F extends HKT2>(
  F: Apply2<F>
): <E, A>(fa: Kind2<F, E, Option<A>>) => <B>(fab: Kind2<F, E, Option<(a: A) => B>>) => Kind2<F, E, Option<B>>
export function ap<F extends HKT2, E>(
  F: Apply2C<F, E>
): <A>(fa: Kind2<F, E, Option<A>>) => <B>(fab: Kind2<F, E, Option<(a: A) => B>>) => Kind2<F, E, Option<B>>
export function ap<F extends HKT>(
  F: Apply1<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>> {
  return ap_(F, O.Apply)
}

/**
 * @since 3.0.0
 */
export function chain<M extends HKT4>(
  M: Monad4<M>
): <A, S, R, E, B>(
  f: (a: A) => Kind4<M, S, R, E, Option<B>>
) => (ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<B>>
export function chain<M extends HKT3>(
  M: Monad3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, Option<B>>) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chain<M extends HKT3, E>(
  M: Monad3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, Option<B>>) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chain<M extends HKT2>(
  M: Monad2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, Option<B>>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chain<M extends HKT2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, Option<B>>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chain<M extends HKT>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>> {
  const zeroM = zero(M)
  return (f) => M.chain(O.match(() => zeroM(), f))
}

/**
 * @since 3.0.0
 */
export function alt<M extends HKT4>(
  M: Monad4<M>
): <S, R, E, A>(
  second: Lazy<Kind4<M, S, R, E, Option<A>>>
) => (first: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<A>>
export function alt<M extends HKT3>(
  M: Monad3<M>
): <R, E, A>(second: Lazy<Kind3<M, R, E, Option<A>>>) => (first: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<A>>
export function alt<M extends HKT3, E>(
  M: Monad3C<M, E>
): <R, A>(second: Lazy<Kind3<M, R, E, Option<A>>>) => (first: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<A>>
export function alt<M extends HKT2>(
  M: Monad2<M>
): <E, A>(second: Lazy<Kind2<M, E, Option<A>>>) => (first: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<A>>
export function alt<M extends HKT2, E>(
  M: Monad2C<M, E>
): <A>(second: Lazy<Kind2<M, E, Option<A>>>) => (first: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<A>>
export function alt<M extends HKT>(
  M: Monad1<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>> {
  const _some = some(M)
  return (second) => M.chain(O.match(second, _some))
}
