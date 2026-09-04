export const chapter5: any = {
  id: 'ch5',
  number: 5,
  title: '行列式',
  subtitle: '面积、体积与可逆性的标量刻画',
  minutes: 160,
  difficulty: '核心',
  description: '掌握行列式的定义、计算，并理解它如何刻画面积、体积与可逆性。',
  sections: [
    {
      id: '5-1', number: '5.1', title: '三阶方阵的行列式和代数余子式', minutes: 30, difficulty: '核心',
      objectives: ['按行展开计算行列式', '写出代数余子式', '理解行列式的正负号规则'],
      prerequisites: '第 2 章 LU 分解',
      concepts: [
        { title: '代数余子式', body: '行列式可沿某行展开为元素乘余子式。', formula: '\\det A=\\sum_j (-1)^{i+j}a_{ij}M_{ij}' },
        { title: '三阶行列式', body: '三阶行列式可由 2×2 余子式递归计算。' }
      ],
      workedExample: {
        title: '计算三阶行列式', source: '改编自教材 5.1 节', prompt: '计算单位矩阵 I₃ 的行列式。',
        steps: [
          { title: '展开', body: '每行只有一个 1，展开后得 1。', formula: '\\det I=1' },
          { title: '意义', body: '单位矩阵不缩放体积。' }
        ],
        answer: 'det I₃ = 1'
      },
      interaction: 'determinant',
      quiz: [
        { id: 'q1', type: 'single', prompt: '代数余子式用于什么计算？', options: ['行列式展开', '矩阵乘法', '消元', '转置'], correct: 0, explanation: '行列式按行/列展开用余子式。' },
        { id: 'q2', type: 'numeric', prompt: 'det I₃ 是多少？', correct: 1, explanation: '单位矩阵行列式为 1。' },
        { id: 'q3', type: 'judge', prompt: '交换两行会改变行列式符号。', correct: 'true', explanation: '交换行使行列式变号。' }
      ],
      keyTakeaway: '行列式可以通过“选主元 + 余子式”递归展开计算。'
    },
    {
      id: '5-2', number: '5.2', title: '行列式的计算和使用', minutes: 32, difficulty: '核心',
      objectives: ['用消元法算行列式', '利用行列式判断可逆性', '掌握行列式乘积公式'],
      prerequisites: '5.1 行列式定义',
      concepts: [
        { title: '消元与行列式', body: '消元不改变行列式（除交换行变号），det A 等于主元乘积。', formula: '\\det A=\\prod pivots\\times sign' },
        { title: '乘积公式', body: 'det(AB)=det A det B。', formula: '\\det(AB)=\\det A\\det B' }
      ],
      workedExample: {
        title: '判断可逆性', source: '改编自教材 5.2 节', prompt: '用行列式判断 A=[[1,2],[3,4]] 是否可逆。',
        steps: [
          { title: '计算行列式', body: 'det A=1×4-2×3=-2。', formula: '\\det A=-2' },
          { title: '结论', body: '行列式非零，矩阵可逆。' }
        ],
        answer: '可逆。'
      },
      interaction: 'determinant',
      quiz: [
        { id: 'q1', type: 'judge', prompt: 'det A≠0 是 A 可逆的充要条件。', correct: 'true', explanation: '行列式非零当且仅当可逆。' },
        { id: 'q2', type: 'numeric', prompt: 'det [[1,2],[3,4]] 是多少？', correct: -2, explanation: '1×4-2×3=-2。' },
        { id: 'q3', type: 'single', prompt: 'det(AB) 等于？', options: ['det A+det B', 'det A·det B', 'det A-det B', '(det A)(det B)'], correct: 1, explanation: '行列式乘积公式。' }
      ],
      keyTakeaway: '行列式非零 = 可逆 = 主元全非零。'
    },
    {
      id: '5-3', number: '5.3', title: '行列式与面积和体积', minutes: 30, difficulty: '核心',
      objectives: ['用行列式表示面积与体积', '理解行列式的几何意义', '说明行列式为负表示翻转'],
      prerequisites: '5.2 行列式计算',
      concepts: [
        { title: '面积', body: '2×2 矩阵的列向量张成平行四边形的面积等于行列式的绝对值。', formula: 'area=|\\det A|' },
        { title: '体积', body: '3×3 矩阵的行列式绝对值是三个列向量张成平行六面体的体积。' }
      ],
      workedExample: {
        title: '求面积', source: '改编自教材 5.3 节', prompt: '求列向量 (1,0),(0,2) 张成的矩形面积。',
        steps: [
          { title: '写矩阵', body: 'A=[[1,0],[0,2]]。', formula: 'A=\\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}' },
          { title: '算行列式', body: 'det A=2，面积 2。' }
        ],
        answer: '面积 2。'
      },
      interaction: 'determinant',
      quiz: [
        { id: 'q1', type: 'numeric', prompt: '列向量 (1,0),(0,2) 张成的面积是多少？', correct: 2, explanation: 'det [[1,0],[0,2]]=2。' },
        { id: 'q2', type: 'judge', prompt: '行列式为负表示方向发生翻转。', correct: 'true', explanation: '负行列式意味着定向反转。' },
        { id: 'q3', type: 'single', prompt: '3×3 行列式的绝对值表示什么？', options: ['面积', '体积', '长度', '角度'], correct: 1, explanation: '三个列向量张成平行六面体的体积。' }
      ],
      keyTakeaway: '行列式是“线性变换把体积缩放多少倍”的标量。'
    }
  ]
}
