/**
 * Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 *
 * @since 3.0.0
 */

/**
 * `* -> *` constructors
 * @since 3.0.0
 */
export interface HKT {
  readonly _type: unknown
  readonly _A: unknown
}

/**
 * `* -> * -> *` constructors
 * @since 3.0.0
 */
export interface HKT2 extends HKT {
  readonly _E: unknown
}

/**
 * `* -> * -> * -> *` constructors
 * @since 3.0.0
 */
export interface HKT3 extends HKT2 {
  readonly _R: unknown
}

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 3.0.0
 */
export interface HKT4 extends HKT3 {
  readonly _S: unknown
}

/**
 * `* -> *` constructors
 * @since 3.0.0
 */
export type Kind<T, A> = T extends {readonly _type: unknown } ? (T & { readonly _A: A })['_type'] : never 

/**
 * `* -> * -> *` constructors
 * @since 3.0.0
 */
export type Kind2<T, E, A> =  T extends { readonly _type: unknown } ? (T & { readonly _E: E; readonly _A: A })['_type'] : never 

/**
 * `* -> * -> * -> *` constructors
 * @since 3.0.0
 */
export type Kind3<T, R, E, A> =  T extends {readonly _type: unknown } ? (T & { readonly _R: R; readonly _E: E; readonly _A: A })['_type'] : never

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 3.0.0
 */
export type Kind4<T, S, R, E, A> =  T extends {readonly _type: unknown } ? (T & { readonly  _S: S;  readonly _R: R;  readonly _E: E;  readonly _A: A })['_type'] : never

