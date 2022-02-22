/**
 * @since 3.0.0
 */
import type { HKT, Kind, Kind2, Kind3, Kind4, HKT2, HKT3, HKT4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant<F> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant1<F extends HKT> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant2<F extends HKT2> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant2C<F extends HKT2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant3<F extends HKT3> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant3C<F extends HKT3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant4<F extends HKT4> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
