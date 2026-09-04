export const chapter9: any = {
  id: 'ch9',
  number: 9,
  title: '最优化中的线性代数',
  subtitle: '最小化、梯度下降与约束优化',
  minutes: 220,
  difficulty: '核心',
  description: '把线性代数用于优化：最小二乘、梯度下降、拉格朗日乘子与线性规划。',
  sections: [
    {
      id: '9-1', number: '9.1', title: '多变量函数的最小化问题', minutes: 32, difficulty: '核心',
      objectives: ['写出梯度条件', '解最小二乘问题', '理解凸函数'],
      prerequisites: '4.3 最小二乘',
      concepts: [
        { title: '梯度为零', body: '光滑函数最小值处梯度为零。', formula: '\\nabla f=0' },
        { title: '正规方程', body: '二次函数最小化常回到 AᵀAx=Aᵀb。' }
      ],
      workedExample: {
        title: '最小化二次函数', source: '改编自教材 9.1 节', prompt: '最小化 f(x)=(x-1)²。',
        steps: [
          { title: '求导', body: 'f\'=2(x-1)=0。' },
          { title: '解', body: 'x=1 时最小。' }
        ],
        answer: 'x=1'
      },
      interaction: 'minimize',
      quiz: [
        { id: 'q1', type: 'single', prompt: '光滑函数最小值点梯度为？', options: ['0', '1', '正数', '负数'], correct: 0, explanation: '极值点梯度为零。' },
        { id: 'q2', type: 'numeric', prompt: 'f(x)=(x-1)² 最小值点 x 是多少？', correct: 1, explanation: 'x=1。' },
        { id: 'q3', type: 'judge', prompt: '最小二乘是二次函数最小化问题。', correct: 'true', explanation: '||b-Ax||² 是二次函数。' }
      ],
      keyTakeaway: '最小化 = 找梯度为零的点。'
    },
    {
      id: '9-2', number: '9.2', title: '反向传播和随机梯度下降', minutes: 34, difficulty: '核心',
      objectives: ['写出梯度下降迭代', '理解学习率作用', '说明随机梯度'],
      prerequisites: '9.1 最小化',
      concepts: [
        { title: '梯度下降', body: '沿负梯度方向迭代更新参数。', formula: 'x_{k+1}=x_k-\\eta\\nabla f(x_k)' },
        { title: '随机梯度', body: '用部分样本估计梯度，提高大规模训练效率。' }
      ],
      workedExample: {
        title: '梯度下降一步', source: '改编自教材 9.2 节', prompt: '对 f(x)=x² 从 x=2 出发，学习率 0.5 做一步。',
        steps: [
          { title: '求梯度', body: 'f\'=2x，在 x=2 处为 4。' },
          { title: '更新', body: 'x←2-0.5×4=0。', formula: 'x_{1}=0' }
        ],
        answer: 'x=0'
      },
      interaction: 'gradient-descent',
      quiz: [
        { id: 'q1', type: 'single', prompt: '梯度下降沿什么方向更新？', options: ['负梯度', '正梯度', '水平', '随机'], correct: 0, explanation: '沿负梯度方向下降。' },
        { id: 'q2', type: 'numeric', prompt: 'f(x)=x² 在 x=2 的梯度是多少？', correct: 4, explanation: 'f\'=2x=4。' },
        { id: 'q3', type: 'judge', prompt: '学习率过大会导致震荡甚至发散。', correct: 'true', explanation: '步长过大会越过极小值。' }
      ],
      keyTakeaway: '梯度下降用局部斜率指导每一步移动。'
    },
    {
      id: '9-3', number: '9.3', title: '约束条件、拉格朗日乘子与最小范数', minutes: 32, difficulty: '核心',
      objectives: ['写出拉格朗日方程', '求解约束最小化', '理解最小范数解'],
      prerequisites: '9.1 最小化',
      concepts: [
        { title: '拉格朗日乘子', body: '约束 g=0 下最小化 f，引入 λ 并令 ∇f=λ∇g。', formula: '\\nabla f=\\lambda\\nabla g' },
        { title: '最小范数', body: '欠定方程的最小范数解可用伪逆表示。' }
      ],
      workedExample: {
        title: '约束最小化', source: '改编自教材 9.3 节', prompt: '在 x+y=1 下最小化 x²+y²。',
        steps: [
          { title: '对称性', body: '最优点 x=y=1/2。' },
          { title: '验证', body: '梯度条件成立。' }
        ],
        answer: 'x=y=1/2'
      },
      interaction: 'lagrange',
      quiz: [
        { id: 'q1', type: 'single', prompt: '拉格朗日条件是什么？', options: ['∇f=λ∇g', '∇f=0', '∇g=0', 'f=g'], correct: 0, explanation: '约束最优满足 ∇f=λ∇g。' },
        { id: 'q2', type: 'numeric', prompt: 'x+y=1 下 x²+y² 的最小值是多少？', correct: 0.5, explanation: 'x=y=1/2，最小值 1/2。' },
        { id: 'q3', type: 'judge', prompt: '最小范数解是欠定方程中长度最小的解。', correct: 'true', explanation: '最小范数解由伪逆给出。' }
      ],
      keyTakeaway: '约束优化用拉格朗日乘子把约束并进梯度。'
    },
    {
      id: '9-4', number: '9.4', title: '线性规划、博弈论和对偶', minutes: 30, difficulty: '核心',
      objectives: ['写出线性规划标准形', '理解可行域顶点', '认识对偶问题'],
      prerequisites: '9.3 约束优化',
      concepts: [
        { title: '线性规划', body: '在线性约束下最大化线性目标。', formula: '\\max c^Tx\\quad s.t.\\ Ax\\le b' },
        { title: '对偶', body: '每个线性规划都有对偶问题，两者最优值相等。' }
      ],
      workedExample: {
        title: '简单线性规划', source: '改编自教材 9.4 节', prompt: '在 x+y≤1, x,y≥0 下最大化 x+y。',
        steps: [
          { title: '可行域', body: '三角形区域，顶点 (0,0),(1,0),(0,1)。' },
          { title: '最优', body: '目标在边 x+y=1 上达到，最优值 1。' }
        ],
        answer: '最优值 1。'
      },
      interaction: 'lp',
      quiz: [
        { id: 'q1', type: 'single', prompt: '线性规划的目标是？', options: ['最大化线性函数', '求逆矩阵', '算行列式', '求特征值'], correct: 0, explanation: '线性规划优化线性目标。' },
        { id: 'q2', type: 'judge', prompt: '线性规划最优解总能在可行域顶点取得。', correct: 'true', explanation: '有界可行域最优在顶点。' },
        { id: 'q3', type: 'numeric', prompt: 'x+y≤1, x,y≥0 下 x+y 的最大值是多少？', correct: 1, explanation: '最大值为 1。' }
      ],
      keyTakeaway: '线性规划把优化问题限制在多面体上。'
    }
  ]
}
