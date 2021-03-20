import * as assert from 'assert'
import * as E from '../src/Either'
import { flow, identity, pipe, SK } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyRecord'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(U.double)), { k1: 2, k2: 4 })
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(U.double)), { a: 2, b: 4 })
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Monoid)(identity)), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, O.Option<number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.compact), {})
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate({ foo: E.left(123), bar: E.right(123) }), separated({ foo: 123 }, { bar: 123 }))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, E.Either<string, number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.separate), separated({}, {}))
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      U.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: _.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
      const actual = pipe(y, _.filter(isNumber))
      U.deepStrictEqual(actual, { a: 1 })
      U.deepStrictEqual(
        pipe(
          y,
          _.filter((_) => true)
        ),
        y
      )

      const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      U.deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })
      U.deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe({}, _.filterMap(f)), {})
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
    })

    it('partition', () => {
      U.deepStrictEqual(pipe({}, _.partition(p)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), separated({ a: 1 }, { b: 3 }))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))
      U.deepStrictEqual(pipe({}, _.partitionMap(f)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), separated({ a: 0 }, { b: 4 }))
    })

    it('reduceWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.foldMapWithIndex(S.Monoid)((k, a) => k + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceRightWithIndex('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
    })

    it('partitionMapWithIndex', () => {
      const f = _.partitionMapWithIndex((k, a: number) => (a > 1 ? E.right(a) : E.left(k)))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), separated({ a: 'a' } as const, { b: 2 } as const))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), separated({}, {}))
    })

    it('partitionWithIndex', () => {
      const f = _.partitionWithIndex((_, a: number) => a > 1)
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), separated({ a: 1 }, { b: 2 }))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), separated({}, {}))
    })

    it('filterMapWithIndex', () => {
      const f = _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), { b: 2 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), {})
    })

    it('filterWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterWithIndex((_, a: number) => a > 1)
        ),
        { b: 2 }
      )
    })

    it('traverse', () => {
      U.deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      U.deepStrictEqual(_.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }), O.none)
    })

    it('traverseWithIndex', () => {
      const traverseWithIndex = _.traverseWithIndex(O.Applicative)(
        (k, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      )
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? O.some(n + 1) : O.none))
      U.deepStrictEqual(await pipe({}, wither)(), {})
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wither)(), { b: 4 })
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? E.right(n + 1) : E.left(n - 1)))
      U.deepStrictEqual(await pipe({}, wilt)(), separated({}, {}))
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wilt)(), separated({ a: 0 }, { b: 4 }))
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(N.SemigroupSum)
    U.deepStrictEqual(pipe(d1, M.concat(d2)), { k1: 1, k2: 5, k3: 4 })
    U.deepStrictEqual(pipe(d1, M.concat(M.empty)), d1)
    U.deepStrictEqual(pipe(M.empty, M.concat(d2)), d2)
    U.deepStrictEqual(pipe(d1, M.concat({})), d1)
    // should ignore non own properties
    const o = Object.create({ a: 1 })
    o.k2 = 2
    o.k3 = 4
    U.deepStrictEqual(pipe(d1, M.concat(o)), { k1: 1, k2: 5, k3: 4 })
  })

  it('getEq', () => {
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ a: 1 }), true)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ a: 2 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ b: 1 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals(noPrototype)({ b: 1 }), false)
  })

  it('lookup', () => {
    U.deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('toReadonlyArray', () => {
    U.deepStrictEqual(_.toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    U.deepStrictEqual(_.toReadonlyArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    U.deepStrictEqual(_.toUnfoldable(RA.Unfoldable)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex should sort the keys', () => {
    const log: Array<string> = []
    const append = (message: string): IO.IO<void> => () => {
      log.push(message)
    }

    pipe(
      { b: append('b'), a: append('a') },
      _.traverseWithIndex(IO.Applicative)((_, io) => io)
    )()
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    U.deepStrictEqual(_.size({}), 0)
    U.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty({}), true)
    U.deepStrictEqual(_.isEmpty({ a: 1 }), false)
    // should ignore non own properties
    U.deepStrictEqual(_.isEmpty(Object.create({ a: 1 })), true)
  })

  it('insertAt', () => {
    U.deepStrictEqual(pipe({}, _.insertAt('a', 1)), O.some({ a: 1 }))
    U.deepStrictEqual(pipe({ a: 1 }, _.insertAt('a', 1)), O.none)
    U.deepStrictEqual(pipe({ a: 2 }, _.insertAt('a', 1)), O.none)
  })

  it('upsertAt', () => {
    U.deepStrictEqual(pipe({}, _.upsertAt('a', 1)), { a: 1 })
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.upsertAt('c', 3)), { a: 1, b: 2, c: 3 })
    // should return the same reference when nothing changed
    const x = { a: 1 }
    U.strictEqual(pipe(x, _.upsertAt('a', 1)), x)
    // should create a new key when the value is `undefined`
    U.deepStrictEqual(pipe({}, _.upsertAt('a', undefined)), { a: undefined })
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(pipe(x, _.updateAt('b', 2)), O.none)
    U.deepStrictEqual(pipe(x, _.updateAt('a', 2)), O.some({ a: 2 }))
    // should return the same reference when nothing changed
    U.deepStrictEqual(
      pipe(
        x,
        _.updateAt('a', 1),
        O.map((y) => y === x)
      ),
      O.some(true)
    )
  })

  it('modifyAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    U.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
    // should return the same reference if nothing changed
    const input: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt('a', identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('deleteAt', () => {
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.deleteAt('a')), O.some({ b: 2 }))
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.deleteAt('c')), O.none)
  })

  it('pop', () => {
    U.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }] as const))
    U.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    U.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    U.deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    U.deepStrictEqual(_.elem(N.Eq)(1)({ a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldable', () => {
    const f = _.fromFoldable(RA.Foldable)(N.SemigroupSum)((s: string) => [s, s.length])
    assert.deepStrictEqual(f(['a', 'bb', 'bb']), { a: 1, bb: 4 })
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show({}), `{}`)
    U.deepStrictEqual(Sh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(Sh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('has', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.has('a', x), true)
    U.deepStrictEqual(_.has('b', x), false)
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(S.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.concat(M.empty)), x)
    U.strictEqual(pipe(M.empty, M.concat(x)), x)
    U.strictEqual(pipe(x, M.concat({})), x)
    U.strictEqual(pipe({}, M.concat(x)), x)
    U.deepStrictEqual(pipe(x, M.concat(y)), {
      a: 'a1',
      b: 'b1b2',
      c: 'c1c2',
      d: 'd2'
    })
  })

  it('getIntersectionSemigroup', () => {
    const M = _.getIntersectionSemigroup(S.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.concat(_.empty)), _.empty)
    U.strictEqual(pipe(_.empty, M.concat(x)), _.empty)
    U.strictEqual(pipe(x, M.concat({})), _.empty)
    U.strictEqual(pipe({}, M.concat(x)), _.empty)
    U.deepStrictEqual(pipe(x, M.concat(y)), {
      b: 'b1b2',
      c: 'c1c2'
    })
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma<string>()
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.concat(_.empty)), x)
    U.strictEqual(pipe(_.empty, M.concat(x)), x)
    U.strictEqual(pipe(x, M.concat({})), x)
    U.strictEqual(pipe({}, M.concat(x)), x)
    U.deepStrictEqual(pipe(x, M.concat(y)), {
      a: 'a1',
      d: 'd2'
    })
  })

  it('mapWithIndex', () => {
    // should ignore non own properties
    const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
    U.deepStrictEqual(pipe(o, _.mapWithIndex(flow(SK, U.double))), {})
  })
})
