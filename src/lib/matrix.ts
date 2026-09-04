export type Matrix = number[][]
export type Vector = number[]

export function matMul(A: Matrix, B: Matrix): Matrix {
  const m = A.length
  const n = B[0]?.length ?? 0
  const p = A[0]?.length ?? 0
  const C: Matrix = Array.from({ length: m }, () => Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let k = 0; k < p; k++) {
      const aik = A[i][k]
      if (aik === 0) continue
      for (let j = 0; j < n; j++) C[i][j] += aik * B[k][j]
    }
  }
  return C
}

export function matVec(A: Matrix, x: Vector): Vector {
  return A.map((row) => row.reduce((s, a, j) => s + a * (x[j] ?? 0), 0))
}

export function transpose(A: Matrix): Matrix {
  const n = A[0]?.length ?? 0
  return Array.from({ length: n }, (_, j) => A.map((row) => row[j]))
}

export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)))
}

export function dot(u: Vector, v: Vector): number {
  return u.reduce((s, a, i) => s + a * (v[i] ?? 0), 0)
}

export function norm(v: Vector): number {
  return Math.sqrt(dot(v, v))
}

export function cosine(u: Vector, v: Vector): number {
  const n = norm(u) * norm(v)
  return n === 0 ? 0 : dot(u, v) / n
}

export function scalarMul(k: number, v: Vector): Vector {
  return v.map((x) => k * x)
}

export function addVectors(u: Vector, v: Vector): Vector {
  return u.map((x, i) => x + (v[i] ?? 0))
}

export function det2(A: Matrix): number {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0]
}

export function inverse2(A: Matrix): Matrix | null {
  const d = det2(A)
  if (Math.abs(d) < 1e-12) return null
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d]
  ]
}

export interface LUResult {
  L: Matrix
  U: Matrix
  singular: boolean
  pivots: number[]
}

/** LU without row exchanges. Returns L unit-lower and U upper. */
export function luNoPivot(A: Matrix): LUResult {
  const n = A.length
  const U = A.map((row) => [...row])
  const L = identity(n)
  const pivots: number[] = []
  for (let k = 0; k < n; k++) {
    const p = U[k][k]
    pivots.push(p)
    if (Math.abs(p) < 1e-12) {
      return { L, U, singular: true, pivots }
    }
    for (let i = k + 1; i < n; i++) {
      const mult = U[i][k] / p
      L[i][k] = mult
      for (let j = k; j < n; j++) U[i][j] -= mult * U[k][j]
    }
  }
  return { L, U, singular: false, pivots }
}

export interface GaussResult {
  U: Matrix
  c: Vector
  L: Matrix
  P: Matrix
  rowSwaps: number
  singular: boolean
  pivots: number[]
}

/** Gaussian elimination with partial pivoting for a square system Ax=b. */
export function gaussEliminate(A: Matrix, b: Vector): GaussResult {
  const n = A.length
  const U = A.map((row) => [...row])
  const c = [...b]
  const L = identity(n)
  const P = identity(n)
  let rowSwaps = 0
  const pivots: number[] = []
  for (let k = 0; k < n; k++) {
    let max = k
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(U[i][k]) > Math.abs(U[max][k])) max = i
    }
    if (Math.abs(U[max][k]) < 1e-12) {
      pivots.push(0)
      return { U, c, L, P, rowSwaps, singular: true, pivots }
    }
    if (max !== k) {
      ;[U[k], U[max]] = [U[max], U[k]]
      ;[c[k], c[max]] = [c[max], c[k]]
      ;[P[k], P[max]] = [P[max], P[k]]
      rowSwaps++
      // keep L row swap up to current columns
      for (let j = 0; j < k; j++) {
        ;[L[k][j], L[max][j]] = [L[max][j], L[k][j]]
      }
    }
    const pivot = U[k][k]
    pivots.push(pivot)
    for (let i = k + 1; i < n; i++) {
      const mult = U[i][k] / pivot
      L[i][k] = mult
      for (let j = k; j < n; j++) U[i][j] -= mult * U[k][j]
      c[i] -= mult * c[k]
    }
  }
  return { U, c, L, P, rowSwaps, singular: false, pivots }
}

export function backSubstitute(U: Matrix, c: Vector): Vector | null {
  const n = U.length
  const x = Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(U[i][i]) < 1e-12) {
      if (Math.abs(c[i]) > 1e-12) return null
      x[i] = 0
      continue
    }
    let s = c[i]
    for (let j = i + 1; j < n; j++) s -= U[i][j] * x[j]
    x[i] = s / U[i][i]
  }
  return x
}

export function solveLinear(A: Matrix, b: Vector): Vector | null {
  const { U, c, singular } = gaussEliminate(A, b)
  if (singular) return null
  return backSubstitute(U, c)
}

export function inverseGaussJordan(A: Matrix): Matrix | null {
  const n = A.length
  const M = A.map((row, i) => [...row, ...identity(n)[i]])
  for (let k = 0; k < n; k++) {
    let max = k
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[max][k])) max = i
    if (Math.abs(M[max][k]) < 1e-12) return null
    if (max !== k) [M[k], M[max]] = [M[max], M[k]]
    const p = M[k][k]
    for (let j = 0; j < 2 * n; j++) M[k][j] /= p
    for (let i = 0; i < n; i++) {
      if (i === k) continue
      const f = M[i][k]
      for (let j = 0; j < 2 * n; j++) M[i][j] -= f * M[k][j]
    }
  }
  return M.map((row) => row.slice(n))
}

export function permutationMatrices(n: number): Matrix[] {
  const base = Array.from({ length: n }, (_, i) => i)
  const out: Matrix[] = []
  function permute(arr: number[], k: number) {
    if (k === n) {
      out.push(arr.map((r) => Array.from({ length: n }, (_, j) => (j === r ? 1 : 0))))
      return
    }
    for (let i = k; i < n; i++) {
      ;[arr[k], arr[i]] = [arr[i], arr[k]]
      permute([...arr], k + 1)
      ;[arr[k], arr[i]] = [arr[i], arr[k]]
    }
  }
  permute(base, 0)
  return out
}

export function fmt(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return '—'
  const v = Number(x.toFixed(digits))
  return String(v)
}

export function rowsToColumns(A: Matrix): Vector[] {
  const n = A[0]?.length ?? 0
  return Array.from({ length: n }, (_, j) => A.map((row) => row[j]))
}
