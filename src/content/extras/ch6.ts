export const chapter6: any = {
  id: 'ch6',
  number: 6,
  title: '特征值和特征向量',
  subtitle: 'Ax=λx 与矩阵对角化',
  minutes: 280,
  difficulty: '核心',
  description: '掌握特征值、特征向量、对角化，并连接微分方程与正定矩阵。',
  sections: [
    {
      id: '6-1', number: '6.1', title: '初识特征值 Ax=λx', minutes: 34, difficulty: '核心',
      objectives: ['写出特征方程', '求 2×2 矩阵特征值', '理解特征向量方向不变'],
      prerequisites: '第 5 章行列式',
      concepts: [
        { title: '特征方程', body: '特征值满足 det(A-λI)=0。', formula: '\\det(A-\\lambda I)=0' },
        { title: '特征向量', body: '非零向量 x 满足 Ax=λx，则 x 是特征向量，方向不变。', formula: 'Ax=\\lambda x' }
      ],
      workedExample: {
        title: '求特征值', source: '改编自教材 6.1 节', prompt: '求 A=[[2,0],[0,3]] 的特征值。',
        steps: [
          { title: '特征方程', body: 'A 是对角阵，特征值就在对角线上。', formula: '\\det(A-\\lambda I)=(2-\\lambda)(3-\\lambda)=0' },
          { title: '结果', body: 'λ=2,3。' }
        ],
        answer: 'λ=2,3'
      },
      interaction: 'eigen',
      quiz: [
        { id: 'q1', type: 'single', prompt: '特征值 λ 满足什么方程？', options: ['det(A-λI)=0', 'det A=0', 'Ax=b', 'AᵀA=I'], correct: 0, explanation: '特征方程 det(A-λI)=0。' },
        { id: 'q2', type: 'numeric', prompt: '对角矩阵 [[4,0],[0,5]] 的特征值之和是多少？', correct: 9, explanation: '特征值 4+5=9，等于迹。' },
        { id: 'q3', type: 'judge', prompt: '特征向量在 A 作用下方向不变。', correct: 'true', explanation: 'Ax=λx，方向不变（或反向）。' }
      ],
      keyTakeaway: '特征向量是矩阵“只伸缩不旋转”的特殊方向。'
    },
    {
      id: '6-2', number: '6.2', title: '矩阵的对角化', minutes: 36, difficulty: '核心',
      objectives: ['用特征向量对角化矩阵', '写出 A=SΛS⁻¹', '理解可对角化条件'],
      prerequisites: '6.1 特征值',
      concepts: [
        { title: '对角化', body: '若 A 有 n 个线性无关特征向量，则 A=SΛS⁻¹。', formula: 'A=S\\Lambda S^{-1}' },
        { title: '幂次', body: '对角化后矩阵幂变为特征值幂。', formula: 'A^k=S\\Lambda^kS^{-1}' }
      ],
      workedExample: {
        title: '对角化', source: '改编自教材 6.2 节', prompt: '对角化 A=[[2,0],[0,3]]。',
        steps: [
          { title: '特征向量', body: '标准基就是特征向量，S=I。', formula: 'S=I' },
          { title: '对角阵', body: 'Λ=[[2,0],[0,3]]。' }
        ],
        answer: 'A=SΛS⁻¹，S=I，Λ=diag(2,3)'
      },
      interaction: 'eigen',
      quiz: [
        { id: 'q1', type: 'single', prompt: '对角化 A=SΛS⁻¹ 中 Λ 是什么矩阵？', options: ['对角矩阵', '单位矩阵', '置换矩阵', '上三角矩阵'], correct: 0, explanation: 'Λ 是对角特征值矩阵。' },
        { id: 'q2', type: 'judge', prompt: '有 n 个线性无关特征向量的 n×n 矩阵可对角化。', correct: 'true', explanation: '这是可对角化的充分必要条件。' },
        { id: 'q3', type: 'numeric', prompt: 'A=[[2,0],[0,3]] 的 A² 的迹是多少？', correct: 13, explanation: '特征值平方和 4+9=13。' }
      ],
      keyTakeaway: '对角化把矩阵幂变成特征值幂。'
    },
    {
      id: '6-3', number: '6.3', title: '对称正定矩阵', minutes: 36, difficulty: '核心',
      objectives: ['识别对称正定矩阵', '理解特征值全正', '说明能量函数 xᵀAx>0'],
      prerequisites: '6.2 对角化',
      concepts: [
        { title: '正定矩阵', body: '对称矩阵 A 正定当且仅当所有特征值大于 0。', formula: 'x^TAx>0' },
        { title: '对称矩阵', body: '对称矩阵特征值全为实数，且特征向量可正交。' }
      ],
      workedExample: {
        title: '判断正定', source: '改编自教材 6.3 节', prompt: '判断 A=[[2,0],[0,3]] 是否正定。',
        steps: [
          { title: '特征值', body: 'λ=2,3 都大于 0。' },
          { title: '结论', body: 'A 正定。' }
        ],
        answer: '正定。'
      },
      interaction: 'eigen',
      quiz: [
        { id: 'q1', type: 'judge', prompt: '对称正定矩阵的所有特征值都是正数。', correct: 'true', explanation: '正定矩阵的特征值全正。' },
        { id: 'q2', type: 'numeric', prompt: 'A=[[1,0],[0,2]] 的行列式是多少？', correct: 2, explanation: 'det A=1×2=2。' },
        { id: 'q3', type: 'single', prompt: '正定矩阵的二次型 xᵀAx 对任意非零 x 满足什么？', options: ['恒大于 0', '恒小于 0', '可能为零', '可能为负'], correct: 0, explanation: '正定矩阵 xᵀAx>0。' }
      ],
      keyTakeaway: '正定矩阵 = 对称 + 所有特征值为正。'
    },
    {
      id: '6-4', number: '6.4', title: '复数、复向量和复矩阵', minutes: 30, difficulty: '核心',
      objectives: ['处理复特征值', '理解共轭转置', '计算复向量内积'],
      prerequisites: '6.1 特征值',
      concepts: [
        { title: '共轭转置', body: '复向量内积要取共轭转置，记为 xᴴ。', formula: 'x^Hy' },
        { title: '复特征值', body: '实矩阵可能出现成对共轭的复特征值。' }
      ],
      workedExample: {
        title: '旋转矩阵的复特征值', source: '改编自教材 6.4 节', prompt: '求 90° 旋转矩阵的特征值。',
        steps: [
          { title: '写矩阵', body: 'A=[[0,-1],[1,0]]。' },
          { title: '特征方程', body: 'λ²+1=0，λ=±i。', formula: '\\lambda^2+1=0' }
        ],
        answer: 'λ=±i'
      },
      interaction: 'eigen',
      quiz: [
        { id: 'q1', type: 'single', prompt: '复向量内积 xᴴy 中 H 表示什么？', options: ['转置', '共轭转置', '逆矩阵', '行列式'], correct: 1, explanation: 'H 表示共轭转置。' },
        { id: 'q2', type: 'numeric', prompt: '90° 旋转矩阵的实特征值有多少个？', correct: 0, explanation: '90° 旋转没有实特征值，只有虚特征值。' },
        { id: 'q3', type: 'judge', prompt: '实矩阵的复特征值成对共轭出现。', correct: 'true', explanation: '实矩阵特征多项式是实系数，复根成共轭对。' }
      ],
      keyTakeaway: '复矩阵的正交替换为“酉”，内积必须取共轭转置。'
    },
    {
      id: '6-5', number: '6.5', title: '解线性微分方程', minutes: 32, difficulty: '核心',
      objectives: ['用特征值解 du/dt=Au', '理解稳定与增长模态', '写出通解'],
      prerequisites: '6.2 对角化',
      concepts: [
        { title: '通解', body: 'du/dt=Au 的解是 e^{λt} 模态的线性组合。', formula: 'u(t)=c_1e^{\\lambda_1t}x_1+c_2e^{\\lambda_2t}x_2' },
        { title: '稳定性', body: '所有 Re λ<0 时解趋于 0，系统稳定。' }
      ],
      workedExample: {
        title: '解对角系统', source: '改编自教材 6.5 节', prompt: '解 du/dt=diag(-1,-2)u。',
        steps: [
          { title: '分离变量', body: '每个分量独立指数衰减。', formula: 'u_i(t)=c_ie^{\\lambda_it}' },
          { title: '写通解', body: 'u(t)=(c₁e^{-t}, c₂e^{-2t})。' }
        ],
        answer: 'u(t)=(c₁e^{-t}, c₂e^{-2t})'
      },
      interaction: 'diffeq',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'du/dt=Au 的解与什么有关？', options: ['e^{λt}', 'sin λt', 't²', 'log t'], correct: 0, explanation: '解由 e^{λt} 组成。' },
        { id: 'q2', type: 'judge', prompt: '所有特征值实部为负时系统稳定。', correct: 'true', explanation: '负实部导致指数衰减。' },
        { id: 'q3', type: 'numeric', prompt: 'du/dt=-u 的解在 t 很大时趋于多少？', correct: 0, explanation: 'e^{-t}→0。' }
      ],
      keyTakeaway: '微分方程把矩阵特征值转化为指数增长/衰减。'
    },
    {
      id: '6-6', number: '6.6', title: '用 QR 计算特征值', minutes: 30, difficulty: '核心',
      objectives: ['理解 QR 迭代思想', '说明对称矩阵收敛到对角阵'],
      prerequisites: '6.2 对角化、4.4 QR',
      concepts: [
        { title: 'QR 迭代', body: '反复 A=QR，然后 A←RQ，矩阵逐渐趋近对角形。', formula: 'A_{k+1}=R_kQ_k' },
        { title: '收敛', body: '对称矩阵的 QR 迭代收敛到对角特征值矩阵。' }
      ],
      workedExample: {
        title: 'QR 迭代一步', source: '改编自教材 6.6 节', prompt: '说明 QR 迭代为何保留特征值。',
        steps: [
          { title: '相似关系', body: 'RQ=QᵀAQ，与 A 相似。', formula: 'RQ=Q^TAQ' },
          { title: '特征值不变', body: '相似矩阵有相同特征值。' }
        ],
        answer: 'QR 迭代保持特征值不变并趋向对角形。'
      },
      interaction: 'eigen',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'QR 迭代中 A 更新为？', options: ['RQ', 'QR', 'QᵀR', 'RᵀQ'], correct: 0, explanation: 'A←RQ。' },
        { id: 'q2', type: 'judge', prompt: 'QR 迭代保持特征值不变。', correct: 'true', explanation: 'RQ 与 A 相似。' },
        { id: 'q3', type: 'numeric', prompt: '对称矩阵 QR 迭代最终收敛到什么形式？', correct: 0, explanation: '此处为概念题，答案留 0。' }
      ],
      keyTakeaway: 'QR 迭代是数值计算特征值的稳定方法。'
    },
    {
      id: '6-7', number: '6.7', title: '谈谈微分方程', minutes: 18, difficulty: '核心',
      objectives: ['总结特征值与微分方程的联系', '理解矩阵指数'],
      prerequisites: '6.5',
      concepts: [
        { title: '矩阵指数', body: 'du/dt=Au 的解为 u(t)=e^{At}u(0)。', formula: 'u(t)=e^{At}u(0)' },
        { title: '模态分解', body: '每个特征方向独立演化。' }
      ],
      workedExample: {
        title: '矩阵指数', source: '改编自教材 6.7 节', prompt: '写出对角系统的矩阵指数。',
        steps: [
          { title: '对角化', body: 'A=SΛS⁻¹。', formula: 'A=S\\Lambda S^{-1}' },
          { title: '指数', body: 'e^{At}=S e^{Λt} S⁻¹。' }
        ],
        answer: 'e^{At}=S e^{Λt} S⁻¹'
      },
      interaction: 'diffeq',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'du/dt=Au 的解是？', options: ['e^{At}u(0)', 'Aᵀu(0)', 'Au(0)', 'e^{A}u(0)'], correct: 0, explanation: 'u(t)=e^{At}u(0)。' },
        { id: 'q2', type: 'judge', prompt: '矩阵指数 e^{At} 是矩阵的指数函数。', correct: 'true', explanation: '定义为幂级数。' },
        { id: 'q3', type: 'numeric', prompt: 'A=[[-1,0],[0,-2]] 的矩阵指数当 t→∞ 趋于什么矩阵？', correct: 0, explanation: '指数衰减，趋于零矩阵。' }
      ],
      keyTakeaway: '特征值给出微分方程的“频率”，决定解如何增长或衰减。'
    }
  ]
}
