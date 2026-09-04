export const chapter7: any = {
  id: 'ch7',
  number: 7,
  title: '奇异值分解',
  subtitle: 'SVD 与 PCA',
  minutes: 180,
  difficulty: '核心',
  description: '掌握奇异值分解 A=UΣVᵀ，并理解图像压缩与主成分分析。',
  sections: [
    {
      id: '7-1', number: '7.1', title: '奇异值和奇异向量', minutes: 36, difficulty: '核心',
      objectives: ['写出 SVD 形式', '求奇异值', '理解左右奇异向量'],
      prerequisites: '6.3 对称正定矩阵',
      concepts: [
        { title: 'SVD', body: '任意矩阵可分解为 A=UΣVᵀ。', formula: 'A=U\\Sigma V^T' },
        { title: '奇异值', body: '奇异值是 AᵀA 特征值的平方根。', formula: '\\sigma_i=\\sqrt{\\lambda_i(A^TA)}' }
      ],
      workedExample: {
        title: '求奇异值', source: '改编自教材 7.1 节', prompt: '求对角矩阵 A=[[3,0],[0,1]] 的奇异值。',
        steps: [
          { title: '对角矩阵', body: '奇异值就是对角线元素的绝对值。' },
          { title: '结果', body: 'σ=3,1。' }
        ],
        answer: 'σ=3,1'
      },
      interaction: 'svd',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'SVD 把任意矩阵分解为？', options: ['UΣVᵀ', 'QR', 'LU', 'SΛS⁻¹'], correct: 0, explanation: 'A=UΣVᵀ。' },
        { id: 'q2', type: 'numeric', prompt: 'A=[[3,0],[0,1]] 的最大奇异值是多少？', correct: 3, explanation: '奇异值为 3 和 1。' },
        { id: 'q3', type: 'judge', prompt: '奇异值总是非负实数。', correct: 'true', explanation: '奇异值是非负平方根。' }
      ],
      keyTakeaway: 'SVD 为每个矩阵找到最自然的正交坐标系。'
    },
    {
      id: '7-2', number: '7.2', title: '通过线性代数来做图像处理', minutes: 34, difficulty: '核心',
      objectives: ['用低秩近似压缩图像', '理解能量占比', '比较奇异值大小'],
      prerequisites: '7.1 SVD',
      concepts: [
        { title: '低秩近似', body: '保留前 k 个奇异值，得到秩 k 近似。', formula: 'A_k=\\sum_{i=1}^k \\sigma_i u_iv_i^T' },
        { title: '图像压缩', body: '奇异值衰减快时，少量项即可近似图像。' }
      ],
      workedExample: {
        title: '低秩近似思想', source: '改编自教材 7.2 节', prompt: '说明为什么 SVD 能压缩图像。',
        steps: [
          { title: '分解', body: '图像矩阵分解为奇异值与左右向量。' },
          { title: '截断', body: '保留大奇异值项，丢弃小项。' }
        ],
        answer: '用少量主成分近似图像，实现压缩。'
      },
      interaction: 'svd',
      quiz: [
        { id: 'q1', type: 'single', prompt: '图像压缩利用 SVD 的什么性质？', options: ['低秩近似', '行列式', '迹', '转置'], correct: 0, explanation: '保留前 k 项做低秩近似。' },
        { id: 'q2', type: 'judge', prompt: '奇异值越大，对应成分越重要。', correct: 'true', explanation: '奇异值代表能量/拉伸程度。' },
        { id: 'q3', type: 'numeric', prompt: '保留前 k 个奇异值的近似矩阵秩是多少？', correct: 0, explanation: '秩为 k，具体数值依赖选择。' }
      ],
      keyTakeaway: 'SVD 把图像信息按重要性排序，丢掉小奇异值实现压缩。'
    },
    {
      id: '7-3', number: '7.3', title: '主成分分析', minutes: 32, difficulty: '核心',
      objectives: ['理解 PCA 目标', '用协方差矩阵求主方向', '降维数据'],
      prerequisites: '7.2 图像处理',
      concepts: [
        { title: '主方向', body: '第一主成分是数据方差最大的方向。' },
        { title: 'PCA 与 SVD', body: '数据中心化后，主方向就是协方差矩阵的特征向量。' }
      ],
      workedExample: {
        title: 'PCA 思想', source: '改编自教材 7.3 节', prompt: '说明 PCA 如何选择第一主成分。',
        steps: [
          { title: '中心化', body: '数据减去均值。' },
          { title: '找最大方差方向', body: '求协方差矩阵最大特征值对应特征向量。' }
        ],
        answer: '第一主成分是最大方差方向。'
      },
      interaction: 'svd',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'PCA 的第一主成分是？', options: ['方差最大方向', '方差最小方向', '均值方向', '任意方向'], correct: 0, explanation: 'PCA 找方差最大方向。' },
        { id: 'q2', type: 'judge', prompt: 'PCA 与协方差矩阵的特征向量有关。', correct: 'true', explanation: '主成分是协方差矩阵特征向量。' },
        { id: 'q3', type: 'numeric', prompt: '二维数据 PCA 通常最多有几个主成分？', correct: 2, explanation: '二维数据最多两个主成分。' }
      ],
      keyTakeaway: 'PCA 用特征向量找到数据变化最大的坐标轴。'
    }
  ]
}
