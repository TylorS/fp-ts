---
title: ReadonlyTuple2.ts
nav_order: 67
parent: Modules
---

## ReadonlyTuple2 overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [combinators](#combinators)
  - [duplicate](#duplicate)
  - [swap](#swap)
- [destructors](#destructors)
  - [fst](#fst)
  - [snd](#snd)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Semigroupoid](#semigroupoid-1)
  - [Traversable](#traversable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: readonly [A, E]) => readonly [B, G]
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: readonly [A, E]) => readonly [A, G]
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: readonly [A, E]) => A
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v3.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: readonly [B, A]) => <C>(bc: readonly [C, B]) => readonly [C, A]
```

Added in v3.0.0

# combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(wa: readonly [A, E]) => readonly [readonly [A, E], E]
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <A, E>(ea: readonly [A, E]) => readonly [E, A]
```

Added in v3.0.0

# destructors

## fst

**Signature**

```ts
export declare const fst: <A, E>(ea: readonly [A, E]) => A
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <A, E>(ea: readonly [A, E]) => E
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'ReadonlyTuple'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'ReadonlyTuple'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'ReadonlyTuple'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReadonlyTuple'>
```

Added in v3.0.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'ReadonlyTuple'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'ReadonlyTuple'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyTuple'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <M>(M: Monoid<M>) => Applicative2C<'ReadonlyTuple', M>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<'ReadonlyTuple', S>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <M>(M: Monoid<M>) => Monad2C<'ReadonlyTuple', M>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <M>(M: Monoid<M>) => Pointed2C<'ReadonlyTuple', M>
```

Added in v3.0.0

# utils

## sequence

**Signature**

```ts
export declare const sequence: Sequence2<'ReadonlyTuple'>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse2<'ReadonlyTuple'>
```

Added in v3.0.0