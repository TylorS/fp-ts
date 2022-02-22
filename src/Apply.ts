/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `fbc |> map(bc => ab => a => bc(ab(a))) |> ap(fab) <-> fbc |> ap(fab |> ap(fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @since 3.0.0
 */
import { flow, pipe } from './function'
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import type { Kind, Kind2, Kind3, Kind4, HKT, HKT2, HKT3, HKT4 } from './HKT'
import { Semigroup, reverse } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply1<F extends HKT> extends Functor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2<F extends HKT2> extends Functor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2C<F extends HKT2, E> extends Functor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3<F extends HKT3> extends Functor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3C<F extends HKT3, E> extends Functor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply4<F extends HKT4> extends Functor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `ap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function ap<F extends HKT2, G extends HKT2, E>(
  F: Apply2<F>,
  G: Apply2C<G, E>
): <FE, A>(
  fa: Kind2<F, FE, Kind2<G, E, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, E, (a: A) => B>>) => Kind2<F, FE, Kind2<G, E, B>>
export function ap<F extends HKT, G extends HKT2, E>(
  F: Apply1<F>,
  G: Apply2C<G, E>
): <A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export function ap<F, G extends HKT2>(
  F: Apply<F>,
  G: Apply2<G>
): <E, A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export function ap<F, G extends HKT2, E>(
  F: Apply<F>,
  G: Apply2C<G, E>
): <A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export function ap<F, G extends HKT>(
  F: Apply<F>,
  G: Apply1<G>
): <A>(fa: Kind<F, Kind<G, A>>) => <B>(fab: Kind<F, Kind<G, (a: A) => B>>) => Kind<F, Kind<G, B>>
export function ap<F, G>(
  F: Apply<F>,
  G: Apply<G>
): <A>(fa: Kind<F, Kind<G, A>>) => <B>(fab: Kind<F, Kind<G, (a: A) => B>>) => Kind<F, Kind<G, B>>
export function ap<F, G>(
  F: Apply<F>,
  G: Apply<G>
): <A>(fa: Kind<F, Kind<G, A>>) => <B>(fab: Kind<F, Kind<G, (a: A) => B>>) => Kind<F, Kind<G, B>> {
  return <A>(fa: Kind<F, Kind<G, A>>): (<B>(fab: Kind<F, Kind<G, (a: A) => B>>) => Kind<F, Kind<G, B>>) =>
    flow(
      F.map((gab) => (ga: Kind<G, A>) => G.ap(ga)(gab)),
      F.ap(fa)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apFirst<F extends HKT4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
export function apFirst<F extends HKT3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst<F extends HKT3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst<F extends HKT2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst<F extends HKT2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst<F extends HKT>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A>
export function apFirst<F>(A: Apply<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A>
export function apFirst<F>(A: Apply<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A> {
  return (second) =>
    flow(
      A.map((a) => () => a),
      A.ap(second)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apSecond<F extends HKT4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export function apSecond<F extends HKT3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond<F extends HKT3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond<F extends HKT2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond<F extends HKT2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond<F extends HKT>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B>
export function apSecond<F>(A: Apply<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B>
export function apSecond<F>(A: Apply<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B> {
  return <B>(second: Kind<F, B>) =>
    flow(
      A.map(() => (b: B) => b),
      A.ap(second)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apS<F extends HKT4>(
  F: Apply4<F>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind4<F, S, R, E, B>
) => (fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends HKT3>(
  F: Apply3<F>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends HKT3, E>(
  F: Apply3C<F, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends HKT2>(
  F: Apply2<F>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends HKT2, E>(
  F: Apply2C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends HKT>(
  F: Apply1<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, B>
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F>(
  F: Apply<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, B>
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F>(
  F: Apply<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, B>
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return <B>(name: string, fb: Kind<F, B>) =>
    flow(
      F.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      F.ap(fb)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apT<F extends HKT4>(
  F: Apply4<F>
): <S, R, E, B>(
  fb: Kind4<F, S, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, readonly [...A, B]>
export function apT<F extends HKT3>(
  F: Apply3<F>
): <R, E, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export function apT<F extends HKT3, E>(
  F: Apply3C<F, E>
): <R, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export function apT<F extends HKT2>(
  F: Apply2<F>
): <E, B>(
  fb: Kind2<F, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export function apT<F extends HKT2, E>(
  F: Apply2C<F, E>
): <B>(fb: Kind2<F, E, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export function apT<F extends HKT>(
  F: Apply1<F>
): <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) => Kind<F, readonly [...A, B]>
export function apT<F>(
  F: Apply<F>
): <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) => Kind<F, readonly [...A, B]>
export function apT<F>(
  F: Apply<F>
): <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) => Kind<F, readonly [...A, B]> {
  return <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) =>
    pipe(
      fas,
      F.map((a) => (b: B): readonly [...A, B] => [...a, b]),
      F.ap(fb)
    )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export function getApplySemigroup<F extends HKT4>(
  F: Apply4<F>
): <A, S, R, E>(S: Semigroup<A>) => Semigroup<Kind4<F, S, R, E, A>>
export function getApplySemigroup<F extends HKT3>(
  F: Apply3<F>
): <A, R, E>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export function getApplySemigroup<F extends HKT3, E>(
  F: Apply3C<F, E>
): <A, R>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export function getApplySemigroup<F extends HKT2>(F: Apply2<F>): <A, E>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export function getApplySemigroup<F extends HKT2, E>(
  F: Apply2C<F, E>
): <A>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export function getApplySemigroup<F extends HKT>(F: Apply1<F>): <A>(S: Semigroup<A>) => Semigroup<Kind<F, A>>
export function getApplySemigroup<F>(F: Apply<F>): <A>(S: Semigroup<A>) => Semigroup<Kind<F, A>>
export function getApplySemigroup<F>(F: Apply<F>): <A>(S: Semigroup<A>) => Semigroup<Kind<F, A>> {
  return <A>(S: Semigroup<A>) => {
    const f = reverse(S).concat
    return {
      concat: (second: Kind<F, A>) => (first: Kind<F, A>) => pipe(first, F.map(f), F.ap(second))
    }
  }
}
