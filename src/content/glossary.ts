export interface GlossaryItem {
  term: string
  en: string
  body: string
}

export const glossary: GlossaryItem[] = [
  { term: '向量', en: 'Vector', body: '由一组有序数表示的量，可理解为带方向与长度的箭头。' },
  { term: '线性组合', en: 'Linear Combination', body: '向量乘系数后相加，例如 cv+dw。' },
  { term: '点积', en: 'Dot Product', body: '对应分量乘积之和，度量两个向量方向的一致程度。' },
  { term: '长度', en: 'Length / Norm', body: '向量到原点的距离，等于各分量平方和的平方根。' },
  { term: '垂直', en: 'Orthogonal', body: '两个向量点积为零的几何关系。' },
  { term: '矩阵', en: 'Matrix', body: '由行和列排列的数表，可表示线性变换或线性方程组。' },
  { term: '列空间', en: 'Column Space', body: '矩阵各列的所有线性组合构成的集合。' },
  { term: '秩', en: 'Rank', body: '矩阵独立列的个数，也等于非零主元的个数。' },
  { term: '矩阵乘法', en: 'Matrix Multiplication', body: 'AB 的第 (i,j) 元素是 A 第 i 行与 B 第 j 列的点积。' },
  { term: '消元', en: 'Elimination', body: '用主元消去下方元素，把方程组变为上三角形式。' },
  { term: '回代', en: 'Back Substitution', body: '从上三角方程组的最后一行开始逐步求解。' },
  { term: '初等矩阵', en: 'Elementary Matrix', body: '对单位矩阵做一次行变换得到的矩阵。' },
  { term: '逆矩阵', en: 'Inverse Matrix', body: '与原矩阵相乘得到单位矩阵的矩阵。' },
  { term: 'LU 分解', en: 'LU Factorization', body: '把矩阵写成下三角 L 与上三角 U 的乘积。' },
  { term: '置换矩阵', en: 'Permutation Matrix', body: '每行每列恰有一个 1 的矩阵，作用是对行或列重新排序。' },
  { term: '转置', en: 'Transpose', body: '把矩阵的行变成列、列变成行。' },
  { term: '对称矩阵', en: 'Symmetric Matrix', body: '满足 A^T=A 的方阵。' }
]
