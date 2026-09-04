export const chapter10: any = {
  id: 'ch10',
  number: 10,
  title: '数据学习',
  subtitle: '从线性分段到均值方差协方差',
  minutes: 200,
  difficulty: '核心',
  description: '把线性代数用于数据学习：分段线性函数、深度学习思想、均值方差协方差。',
  sections: [
    {
      id: '10-1', number: '10.1', title: '分段线性学习函数', minutes: 30, difficulty: '核心',
      objectives: ['用 ReLU 构造分段线性函数', '理解激活函数作用'],
      prerequisites: '第 1 章矩阵',
      concepts: [
        { title: 'ReLU', body: 'ReLU(x)=max(0,x) 是分段线性的基本单元。', formula: 'ReLU(x)=\\max(0,x)' },
        { title: '分段线性', body: '多个 ReLU 的线性组合可逼近任意分段线性函数。' }
      ],
      workedExample: {
        title: '分段线性', source: '改编自教材 10.1 节', prompt: '用 ReLU 表示 f(x)=max(0,x)-max(0,-x)。',
        steps: [
          { title: '展开', body: 'x>0 时 f=x；x<0 时 f=-(-x)=x。', formula: 'f(x)=x' },
          { title: '简化', body: '恒等函数。' }
        ],
        answer: 'f(x)=x'
      },
      interaction: 'piecewise',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'ReLU(x) 等于什么？', options: ['max(0,x)', 'min(0,x)', 'x²', 'eˣ'], correct: 0, explanation: 'ReLU 取 0 和 x 的最大值。' },
        { id: 'q2', type: 'judge', prompt: 'ReLU 是分段线性函数。', correct: 'true', explanation: 'ReLU 在 x=0 处分段。' },
        { id: 'q3', type: 'numeric', prompt: 'ReLU(-3) 是多少？', correct: 0, explanation: '负数时输出 0。' }
      ],
      keyTakeaway: '神经网络用大量 ReLU 拼出灵活的分段线性函数。'
    },
    {
      id: '10-2', number: '10.2', title: '发明和实验', minutes: 26, difficulty: '核心',
      objectives: ['理解深度学习的实验性', '认识架构选择'],
      prerequisites: '10.1 ReLU',
      concepts: [
        { title: '实验驱动', body: '深度学习很多结论来自实验与工程经验。' },
        { title: '架构', body: '宽度、深度、连接方式共同决定表达能力。' }
      ],
      workedExample: {
        title: '实验思想', source: '改编自教材 10.2 节', prompt: '说明为何需要实验验证网络结构。',
        steps: [
          { title: '假设', body: '提出某种结构可能更好。' },
          { title: '验证', body: '在数据上比较训练/验证误差。' }
        ],
        answer: '通过实验比较假设，再总结规律。'
      },
      interaction: 'experiment',
      quiz: [
        { id: 'q1', type: 'single', prompt: '深度学习中，网络结构选择通常依赖什么？', options: ['实验', '纯理论推导', '猜测', '无规则'], correct: 0, explanation: '深度学习高度依赖实验验证。' },
        { id: 'q2', type: 'judge', prompt: '验证集用于评估模型泛化能力。', correct: 'true', explanation: '验证集不参与训练。' },
        { id: 'q3', type: 'numeric', prompt: '一个隐藏层宽度为 8 的网络有多少个偏置参数？', correct: 8, explanation: '每个隐藏单元一个偏置。' }
      ],
      keyTakeaway: '深度学习 = 假说 + 实验 + 证据。'
    },
    {
      id: '10-3', number: '10.3', title: '均值、方差和协方差', minutes: 34, difficulty: '核心',
      objectives: ['计算均值与方差', '写出协方差矩阵', '理解相关性'],
      prerequisites: '1.2 点积',
      concepts: [
        { title: '均值方差', body: '均值是数据中心，方差是离均值的平均平方距离。', formula: '\\mu=E[x],\\ \\sigma^2=E[(x-\\mu)^2]' },
        { title: '协方差', body: '协方差矩阵描述多维数据的线性相关。', formula: 'V=E[(x-\\mu)(x-\\mu)^T]' }
      ],
      workedExample: {
        title: '算均值方差', source: '改编自教材 10.3 节', prompt: '求数据 1,2,3 的均值与方差。',
        steps: [
          { title: '均值', body: '(1+2+3)/3=2。' },
          { title: '方差', body: '((−1)²+0²+1²)/3=2/3。' }
        ],
        answer: '均值 2，方差 2/3'
      },
      interaction: 'covariance',
      quiz: [
        { id: 'q1', type: 'numeric', prompt: '数据 1,2,3 的均值是多少？', correct: 2, explanation: '(1+2+3)/3=2。' },
        { id: 'q2', type: 'judge', prompt: '方差总是非负。', correct: 'true', explanation: '方差是平方的期望。' },
        { id: 'q3', type: 'single', prompt: '协方差矩阵是什么矩阵？', options: ['对称矩阵', '上三角矩阵', '单位矩阵', '置换矩阵'], correct: 0, explanation: '协方差矩阵是对称半正定矩阵。' }
      ],
      keyTakeaway: '均值定位中心，协方差描述数据如何共同变化。'
    },
    {
      id: '10-4', number: '10.4', title: '深度学习的成功引发的思考', minutes: 24, difficulty: '核心',
      objectives: ['总结深度学习为何成功', '理解表示学习'],
      prerequisites: '10.1-10.3',
      concepts: [
        { title: '表示学习', body: '深度网络逐层形成适合任务的数据表示。' },
        { title: '归纳偏置', body: '架构选择体现了对问题结构的先验假设。' }
      ],
      workedExample: {
        title: '成功的三个因素', source: '改编自教材 10.4 节', prompt: '总结深度学习成功的关键。',
        steps: [
          { title: '数据', body: '大规模数据提供经验。' },
          { title: '计算', body: '并行硬件加速训练。' },
          { title: '结构', body: '深层网络自动形成表示。' }
        ],
        answer: '数据、计算、结构。'
      },
      interaction: 'experiment',
      quiz: [
        { id: 'q1', type: 'single', prompt: '表示学习是指？', options: ['逐层形成表示', '手工特征', '只背数据', '降低数据量'], correct: 0, explanation: '深度网络自动学习表示。' },
        { id: 'q2', type: 'judge', prompt: '归纳偏置是架构对问题结构的假设。', correct: 'true', explanation: '例如卷积假设平移等变。' },
        { id: 'q3', type: 'numeric', prompt: '深度学习成功通常依赖数据、计算和什么？', correct: 0, explanation: '第三个是结构/表示，概念题答案留 0。' }
      ],
      keyTakeaway: '深度学习的成功来自数据、计算与结构化表示。'
    }
  ]
}
