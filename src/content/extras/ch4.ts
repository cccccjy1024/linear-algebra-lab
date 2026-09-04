export const chapter4: any = {
  id: 'ch4',
  number: 4,
  title: '正交性',
  subtitle: '投影、最小二乘与正交基',
  minutes: 230,
  difficulty: '核心',
  description: '从向量垂直出发，理解投影、最小二乘、Gram-Schmidt 正交化与广义逆。',
  sections: [
    {
      id: '4-1', number: '4.1', title: '向量和子空间的正交性', minutes: 28, difficulty: '核心',
      objectives: ['判断向量正交', '理解正交子空间', '说明行空间与零空间正交'],
      prerequisites: '1.2 点积',
      concepts: [
        { title: '正交向量', body: '点积为零的两个向量互相垂直。', formula: 'u\\cdot v=0' },
        { title: '正交子空间', body: '若一个子空间中任意向量都与另一个子空间任意向量正交，则两子空间正交。' }
      ],
      workedExample: {
        title: '验证正交子空间', source: '改编自教材 4.1 节', prompt: '说明行空间 C(Aᵀ) 与零空间 N(A) 正交。',
        steps: [
          { title: '取元素', body: '任取行空间中的 y=Aᵀz 与零空间中的 x。', formula: 'y=A^Tz,\\ Ax=0' },
          { title: '点积为零', body: 'y·x=(Aᵀz)ᵀx=zᵀAx=0。', formula: 'z^TAx=0' }
        ],
        answer: '两者正交。'
      },
      interaction: 'gram-schmidt',
      quiz: [
        { id: 'q1', type: 'judge', prompt: '两个向量点积为 0 则它们正交。', correct: 'true', explanation: '这是正交的定义。' },
        { id: 'q2', type: 'numeric', prompt: '向量 (1,2) 与 (-2,1) 的点积是多少？', correct: 0, explanation: '1×(-2)+2×1=0。' },
        { id: 'q3', type: 'single', prompt: '行空间与哪个子空间正交？', options: ['列空间', '零空间', '左零空间', '整个空间'], correct: 1, explanation: 'C(Aᵀ) 与 N(A) 正交。' }
      ],
      keyTakeaway: '正交把空间切成互相垂直的两块，是投影的基础。'
    },
    {
      id: '4-2', number: '4.2', title: '向直线和子空间作正交投影', minutes: 32, difficulty: '核心',
      objectives: ['求向量在直线上的投影', '写出投影矩阵', '理解误差向量垂直'],
      prerequisites: '4.1 正交性',
      concepts: [
        { title: '直线投影', body: 'b 在直线 a 上的投影是 p=aaᵀb/(aᵀa)。', formula: 'p=\\frac{a^Tb}{a^Ta}a' },
        { title: '投影矩阵', body: '投影矩阵 P 满足 P²=P 且 Pᵀ=P。', formula: 'P=\\frac{aa^T}{a^Ta}' }
      ],
      workedExample: {
        title: '投影到直线', source: '改编自教材 4.2 节', prompt: '求 b=(1,2) 到 a=(1,1) 上的投影。',
        steps: [
          { title: '计算系数', body: 'aᵀb=3，aᵀa=2。', formula: 'c=\\frac{3}{2}' },
          { title: '写投影', body: 'p=(3/2)a=(1.5,1.5)。', formula: 'p=\\begin{bmatrix}1.5\\\\1.5\\end{bmatrix}' }
        ],
        answer: 'p=(1.5,1.5)'
      },
      interaction: 'projection',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'b 到 a 的投影系数是？', options: ['aᵀb/aᵀa', 'aᵀa/aᵀb', 'bᵀb/aᵀa', 'aᵀb/bᵀb'], correct: 0, explanation: '系数 c=aᵀb/aᵀa。' },
        { id: 'q2', type: 'numeric', prompt: 'b=(1,2) 到 a=(1,1) 的投影长度系数 c 是多少？', correct: 1.5, explanation: 'aᵀb/aᵀa=3/2。' },
        { id: 'q3', type: 'judge', prompt: '投影误差 e=b-p 与 a 正交。', correct: 'true', explanation: '投影误差垂直于投影方向。' }
      ],
      keyTakeaway: '投影就是沿着误差垂直方向，把 b 送到子空间里。'
    },
    {
      id: '4-3', number: '4.3', title: '最小二乘法', minutes: 36, difficulty: '核心',
      objectives: ['写出正规方程', '用最小二乘拟合直线', '解释误差平方和最小'],
      prerequisites: '4.2 投影',
      concepts: [
        { title: '正规方程', body: '最小二乘解满足 AᵀAx=Aᵀb。', formula: 'A^TAx=A^Tb' },
        { title: '拟合直线', body: '用数据点构造 A，解正规方程得到斜率和截距。', formula: 'y=mx+c' }
      ],
      workedExample: {
        title: '拟合三个点', source: '改编自教材 4.3 节', prompt: '用最小二乘拟合 (0,1),(1,2),(2,3)。',
        steps: [
          { title: '构造 A 和 b', body: '每行是 [x,1]，b 是 y。', formula: 'A=\\begin{bmatrix}0&1\\\\1&1\\\\2&1\\end{bmatrix},b=\\begin{bmatrix}1\\\\2\\\\3\\end{bmatrix}' },
          { title: '解正规方程', body: '得到 m=1,c=1，直线 y=x+1。', formula: 'A^TAx=A^Tb' }
        ],
        answer: 'y=x+1'
      },
      interaction: 'least-squares',
      quiz: [
        { id: 'q1', type: 'single', prompt: '最小二乘解满足什么方程？', options: ['AᵀAx=Aᵀb', 'Ax=b', 'Aᵀx=b', 'AAᵀx=b'], correct: 0, explanation: '正规方程是 AᵀAx=Aᵀb。' },
        { id: 'q2', type: 'judge', prompt: '最小二乘最小化的是误差向量的长度平方。', correct: 'true', explanation: '最小二乘使 ||b-Ax||² 最小。' },
        { id: 'q3', type: 'numeric', prompt: '用三个完全共线的点拟合直线时，误差平方和最小是多少？', correct: 0, explanation: '若点共线，直线精确穿过所有点。' }
      ],
      keyTakeaway: '最小二乘把“解不出的 Ax=b”投影到可解空间中。'
    },
    {
      id: '4-4', number: '4.4', title: '正交矩阵和格拉姆-施密特正交化', minutes: 34, difficulty: '核心',
      objectives: ['识别正交矩阵', '执行 Gram-Schmidt 正交化', '理解 Q 与 A 的关系'],
      prerequisites: '4.2 投影',
      concepts: [
        { title: '正交矩阵', body: '列向量两两正交且长度为 1，满足 QᵀQ=I。', formula: 'Q^TQ=I' },
        { title: 'Gram-Schmidt', body: '从每个向量中减去它在已选正交向量上的投影，再单位化。' }
      ],
      workedExample: {
        title: '正交化两个向量', source: '改编自教材 4.4 节', prompt: '对 v₁=(1,1), v₂=(1,0) 做 Gram-Schmidt。',
        steps: [
          { title: '单位化 v₁', body: 'q₁=(1/√2,1/√2)。', formula: 'q_1=\\frac{1}{\\sqrt2}\\begin{bmatrix}1\\\\1\\end{bmatrix}' },
          { title: '减去投影', body: 'v₂ 减去在 q₁ 上的投影，再单位化得 q₂。' }
        ],
        answer: '得到标准正交基 q₁,q₂'
      },
      interaction: 'gram-schmidt',
      quiz: [
        { id: 'q1', type: 'judge', prompt: '正交矩阵满足 QᵀQ=I。', correct: 'true', explanation: '正交矩阵的列是标准正交基。' },
        { id: 'q2', type: 'numeric', prompt: '2×2 正交矩阵有多少个自由参数（旋转角度）？', correct: 1, explanation: '二维旋转由一个角度决定。' },
        { id: 'q3', type: 'single', prompt: 'Gram-Schmidt 的主要作用是什么？', options: ['把向量组正交化', '求逆矩阵', '算行列式', '解微分方程'], correct: 0, explanation: 'Gram-Schmidt 生成标准正交基。' }
      ],
      keyTakeaway: 'Gram-Schmidt 是“减去投影、再单位化”的反复操作。'
    },
    {
      id: '4-5', number: '4.5', title: '矩阵的广义逆', minutes: 30, difficulty: '核心',
      objectives: ['理解伪逆的意义', '写出最小二乘解', '说明伪逆与 SVD 的关系'],
      prerequisites: '4.4 正交基',
      concepts: [
        { title: '伪逆', body: '伪逆 A⁺ 对任意 A 给出最小二乘解 x=A⁺b。', formula: 'x=A^+b' },
        { title: '正规方程解', body: '当 A 列满秩时，A⁺=(AᵀA)⁻¹Aᵀ。', formula: 'A^+=(A^TA)^{-1}A^T' }
      ],
      workedExample: {
        title: '求伪逆', source: '改编自教材 4.5 节', prompt: '求 A=[[1,0]] 的伪逆。',
        steps: [
          { title: '用公式', body: 'AᵀA=[1]，其逆为 1。', formula: 'A^+=(A^TA)^{-1}A^T' },
          { title: '写出', body: 'A⁺=[[1,0]]。' }
        ],
        answer: 'A⁺=[[1,0]]'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'single', prompt: '伪逆 A⁺ 主要用于解决什么问题？', options: ['最小二乘', '求行列式', '求特征值', '求逆矩阵'], correct: 0, explanation: '伪逆给出最小二乘/最小范数解。' },
        { id: 'q2', type: 'judge', prompt: '列满秩矩阵的伪逆公式是 (AᵀA)⁻¹Aᵀ。', correct: 'true', explanation: '列满秩时正规方程唯一可解。' },
        { id: 'q3', type: 'numeric', prompt: 'A=[[1,0]] 的伪逆行数是？', correct: 1, explanation: 'A 是 1×2，伪逆是 2×1。' }
      ],
      keyTakeaway: '伪逆是逆矩阵在非方阵/秩亏情形下的自然推广。'
    },
    {
      id: '4-6', number: '4.6', title: '谈谈第4章：正交性的巨大成功', minutes: 18, difficulty: '核心',
      objectives: ['总结正交性在数值计算中的价值', '连接投影与最小二乘'],
      prerequisites: '4.1-4.5',
      concepts: [
        { title: '数值稳定', body: '正交基避免病态方程，使数值计算更稳定。' },
        { title: '几何解释', body: '最小二乘 = 投影到列空间；Gram-Schmidt = 构造正交基。' }
      ],
      workedExample: {
        title: '正交性如何串联本章', source: '改编自教材 4.6 节', prompt: '说明正交性为什么是本章主线。',
        steps: [
          { title: '投影', body: '用正交误差定义投影。' },
          { title: '最小二乘', body: '把投影用于拟合数据。' }
        ],
        answer: '正交性统一了投影、最小二乘与正交基。'
      },
      interaction: 'projection',
      quiz: [
        { id: 'q1', type: 'judge', prompt: '正交基有利于数值稳定性。', correct: 'true', explanation: '正交基条件数更好。' },
        { id: 'q2', type: 'single', prompt: '最小二乘与哪个几何概念等价？', options: ['投影', '旋转', '反射', '平移'], correct: 0, explanation: '最小二乘是向列空间投影。' },
        { id: 'q3', type: 'numeric', prompt: 'Q 是正交矩阵时，QᵀQ 的行列式是多少？', correct: 1, explanation: 'QᵀQ=I，行列式为 1。' }
      ],
      keyTakeaway: '正交性把几何直觉转化为稳定数值算法。'
    }
  ]
}
