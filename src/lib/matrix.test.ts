import { describe, it, expect } from 'vitest'
import {
  matMul,
  matVec,
  transpose,
  inverse2,
  gaussEliminate,
  backSubstitute,
  solveLinear,
  inverseGaussJordan,
  luNoPivot,
  dot,
  cosine,
  permutationMatrices
} from './matrix'

describe('matrix utilities', () => {
  it('multiplies matrices', () => {
    expect(matMul([[1, 2], [3, 4]], [[1, 0], [0, 1]])).toEqual([[1, 2], [3, 4]])
    expect(matMul([[1, 2, 3], [4, 5, 6]], [[1, 0], [0, 1], [1, 1]])).toEqual([[4, 5], [10, 11]])
  })

  it('computes matrix-vector product', () => {
    expect(matVec([[1, 2], [3, 4]], [1, 2])).toEqual([5, 11])
  })

  it('computes transpose and dot/cosine', () => {
    expect(transpose([[1, 2, 3], [4, 5, 6]])).toEqual([[1, 4], [2, 5], [3, 6]])
    expect(dot([1, 2, 3], [4, 5, 6])).toBe(32)
    expect(cosine([1, 0], [0, 1])).toBe(0)
  })

  it('inverts a 2x2 matrix', () => {
    expect(inverse2([[1, 2], [3, 4]])).toEqual([[-2, 1], [1.5, -0.5]])
  })

  it('solves a 3x3 system by elimination', () => {
    const A = [[2, 4, -2], [4, 9, -3], [-2, -3, 7]]
    const b = [2, 8, 10]
    const x = solveLinear(A, b)
    expect(x).not.toBeNull()
    expect(x!.map((v) => Math.round(v * 100) / 100)).toEqual([-1, 2, 2])
  })

  it('produces LU decomposition', () => {
    const { L, U, singular } = luNoPivot([[2, 1, 1], [4, 3, 3], [8, 7, 9]])
    expect(singular).toBe(false)
    expect(matMul(L, U)).toEqual([[2, 1, 1], [4, 3, 3], [8, 7, 9]])
  })

  it('computes Gauss-Jordan inverse', () => {
    const inv = inverseGaussJordan([[1, 2], [3, 4]])
    expect(inv).not.toBeNull()
    expect(inv!.map((r) => r.map((v) => Math.round(v * 100) / 100))).toEqual([[-2, 1], [1.5, -0.5]])
  })

  it('lists 6 permutation matrices for n=3', () => {
    expect(permutationMatrices(3).length).toBe(6)
  })
})

