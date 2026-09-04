export const chapter3: any = {
  id: 'ch3',
  number: 3,
  title: '矩阵的四个基本子空间',
  subtitle: '从列空间、零空间到秩-零化度定理',
  minutes: 200,
  difficulty: '核心',
  description: '理解矩阵的列空间、行空间、零空间和左零空间，并掌握它们之间的关系。',
  sections: [
    {
      id: '3-1', number: '3.1', title: '线性空间及其子空间', minutes: 28, difficulty: '核心',
      objectives: ['说出线性空间与子空间的定义', '判断一个集合是否为子空间', '写出子空间的交与和'],
      prerequisites: '第 1 章向量与矩阵',
      concepts: [
        { title: '子空间', body: '子空间必须包含零向量，并对加法和数乘封闭。', formula: 'u,v\\in V\\Rightarrow u+v\\in V,\\ cv\\in V' },
        { title: '四个子空间', body: '每个矩阵都伴随列空间 C(A)、零空间 N(A)、行空间 C(Aᵀ) 和左零空间 N(Aᵀ)。' }
      ],
      workedExample: {
        title: '判断子空间', source: '改编自教材 3.1 节', prompt: '判断平面中所有落在直线 y=x 上的向量是否构成子空间。',
        steps: [
          { title: '验证封闭性', body: '任取 (a,a) 与 (b,b)，相加仍是 (a+b,a+b)，仍在该直线上。', formula: '(a,a)+(b,b)=(a+b,a+b)' },
          { title: '验证数乘', body: '任意 c(a,a)=(ca,ca)，仍在该直线上；且零向量 (0,0) 在直线上。' }
        ],
        answer: '是子空间。'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'single', prompt: '子空间必须包含哪个向量？', options: ['单位向量', '零向量', '全 1 向量', '任意非零向量'], correct: 1, explanation: '子空间一定包含零向量。' },
        { id: 'q2', type: 'judge', prompt: '平面中不过原点的直线也构成子空间。', correct: 'false', explanation: '不过原点就不含零向量，不能构成子空间。' },
        { id: 'q3', type: 'numeric', prompt: '三维空间中过原点的平面是多少维子空间？', correct: 2, explanation: '平面由两个独立方向张成，维数为 2。' }
      ],
      keyTakeaway: '子空间的核心是“含零向量 + 对加法和数乘封闭”。'
    },
    {
      id: '3-2', number: '3.2', title: '通过消元法 A=CR 计算零空间', minutes: 32, difficulty: '核心',
      objectives: ['用消元法求零空间', '理解自由变量与主元变量', '写出 Ax=0 的通解'],
      prerequisites: '3.1 子空间',
      concepts: [
        { title: '自由变量', body: '主元列对应主元变量，非主元列对应自由变量；自由变量可任意取值。', formula: 'Ax=0' },
        { title: '零空间', body: '零空间由一组特解（基础解系）张成。', formula: 'N(A)=\\{x:Ax=0\\}' }
      ],
      workedExample: {
        title: '求零空间', source: '改编自教材 3.2 节', prompt: '求 A=[[1,2],[2,4]] 的零空间。',
        steps: [
          { title: '写方程', body: '第二行是第一行的 2 倍，只有独立方程 x+2y=0。', formula: 'x+2y=0' },
          { title: '取自由变量', body: '令 y=t，则 x=-2t，零空间由向量 (-2,1) 张成。', formula: 'x=t\\begin{bmatrix}-2\\\\1\\end{bmatrix}' }
        ],
        answer: 'N(A) = span{(-2,1)}'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'single', prompt: '零空间 N(A) 由哪些 x 组成？', options: ['Ax=0 的解', 'Ax=b 的解', 'Aᵀx=0 的解', '所有向量'], correct: 0, explanation: '零空间是齐次方程 Ax=0 的解集。' },
        { id: 'q2', type: 'numeric', prompt: 'A=[[1,2],[2,4]] 的秩是多少？', correct: 1, explanation: '两行成比例，秩为 1。' },
        { id: 'q3', type: 'judge', prompt: '零空间维数等于自由变量个数。', correct: 'true', explanation: '自由变量个数就是零空间维数。' }
      ],
      keyTakeaway: '零空间的维数 = 列数 − 秩，即自由变量的个数。'
    },
    {
      id: '3-3', number: '3.3', title: '方程组 Ax=b 的解集', minutes: 30, difficulty: '核心',
      objectives: ['区分齐次解与特解', '写出 Ax=b 的通解', '判断解的存在性与唯一性'],
      prerequisites: '3.2 零空间',
      concepts: [
        { title: '通解结构', body: 'Ax=b 的通解 = 一个特解 + 零空间中的所有向量。', formula: 'x=x_p+x_n' },
        { title: '可解性条件', body: '当 b 在列空间中时方程组有解；解唯一当且仅当 N(A)={0}。', formula: 'b\\in C(A)' }
      ],
      workedExample: {
        title: '写出通解', source: '改编自教材 3.3 节', prompt: '已知 A=[[1,2],[2,4]]，b=[3,6]，求 Ax=b 的通解。',
        steps: [
          { title: '找特解', body: 'x=[3,0] 是一个特解。', formula: 'A\\begin{bmatrix}3\\\\0\\end{bmatrix}=\\begin{bmatrix}3\\\\6\\end{bmatrix}' },
          { title: '加零空间', body: '零空间为 t(-2,1)，所以通解是特解加零空间。', formula: 'x=\\begin{bmatrix}3\\\\0\\end{bmatrix}+t\\begin{bmatrix}-2\\\\1\\end{bmatrix}' }
        ],
        answer: 'x=(3-2t, t)'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'Ax=b 的通解是？', options: ['特解加零空间', '零空间减特解', '只有特解', '只有零解'], correct: 0, explanation: '通解等于一个特解加上零空间的所有向量。' },
        { id: 'q2', type: 'judge', prompt: '若零空间只有零向量，则 Ax=b 有解时解唯一。', correct: 'true', explanation: '零空间为零时通解中无自由项。' },
        { id: 'q3', type: 'numeric', prompt: '当 b 不在列空间中时，Ax=b 有多少个解？', correct: 0, explanation: 'b 不在 C(A) 时方程组无解。' }
      ],
      keyTakeaway: '解方程就是：找特解，再沿着零空间平移。'
    },
    {
      id: '3-4', number: '3.4', title: '线性无关性、基、维数', minutes: 34, difficulty: '核心',
      objectives: ['判断向量组是否线性无关', '从生成组中选出基', '用基的个数定义维数'],
      prerequisites: '3.3 解集',
      concepts: [
        { title: '线性无关', body: '向量组线性无关当且仅当只有零系数组合才得零向量。', formula: 'c_1v_1+\\cdots+c_nv_n=0\\Rightarrow c_i=0' },
        { title: '基与维数', body: '基是既生成整个空间又线性无关的向量组；基的个数就是维数。' }
      ],
      workedExample: {
        title: '选基', source: '改编自教材 3.4 节', prompt: '在 R² 中判断 v₁=(1,2), v₂=(2,4), v₃=(1,0) 是否包含一组基。',
        steps: [
          { title: '观察依赖', body: 'v₂=2v₁，所以 v₁ 与 v₂ 线性相关。', formula: 'v_2=2v_1' },
          { title: '选出独立对', body: 'v₁ 与 v₃ 不共线，构成 R² 的一组基。' }
        ],
        answer: '基可以是 {v₁, v₃}，维数 2。'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'single', prompt: 'R² 中两个向量能构成基的条件是？', options: ['共线', '不共线', '长度相等', '都非零'], correct: 1, explanation: '两个不共线向量线性无关，构成 R² 的基。' },
        { id: 'q2', type: 'numeric', prompt: 'R³ 的维数是？', correct: 3, explanation: '三维空间由 3 个独立方向张成。' },
        { id: 'q3', type: 'judge', prompt: '基的个数与空间中基的选取有关。', correct: 'false', explanation: '同一空间任意基的个数都相同，等于维数。' }
      ],
      keyTakeaway: '基 = 能生成 + 不冗余；维数 = 基的个数。'
    },
    {
      id: '3-5', number: '3.5', title: '四个基本子空间的维数', minutes: 32, difficulty: '核心',
      objectives: ['写出四个子空间的维数公式', '理解秩-零化度定理', '把四个子空间对应到矩阵的秩'],
      prerequisites: '3.4 基与维数',
      concepts: [
        { title: '秩-零化度', body: '列数与列空间维数（秩）之差是零空间维数。', formula: 'n=r+\\dim N(A)' },
        { title: '四个维数', body: 'm×n 矩阵：C(A) 与 C(Aᵀ) 都是 r 维，N(A) 是 n-r 维，N(Aᵀ) 是 m-r 维。' }
      ],
      workedExample: {
        title: '计算四个子空间维数', source: '改编自教材 3.5 节', prompt: '设 A 是 3×5 矩阵且 rank A=2，求四个子空间维数。',
        steps: [
          { title: '列空间与行空间', body: '列空间与行空间维数都等于秩 2。' },
          { title: '零空间与左零空间', body: 'N(A) 维数 5-2=3，N(Aᵀ) 维数 3-2=1。' }
        ],
        answer: 'C(A)=2, C(Aᵀ)=2, N(A)=3, N(Aᵀ)=1'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'numeric', prompt: '秩为 2 的 3×5 矩阵，N(A) 维数是多少？', correct: 3, explanation: '列数 5 减秩 2 等于 3。' },
        { id: 'q2', type: 'judge', prompt: 'C(A) 与 C(Aᵀ) 维数相同。', correct: 'true', explanation: '两者维数都等于秩。' },
        { id: 'q3', type: 'single', prompt: '秩-零化度定理是指？', options: ['n=r+dim N(A)', 'm=r+dim N(A)', 'n=r+dim C(Aᵀ)', 'm=n+r'], correct: 0, explanation: '对 m×n 矩阵，n = rank A + dim N(A)。' }
      ],
      keyTakeaway: '秩把四个子空间统一起来：两个“图像”同维 r，两个“核”补成 m 与 n。'
    },
    {
      id: '3-6', number: '3.6', title: '谈谈第3章：消元法的全局理解', minutes: 18, difficulty: '核心',
      objectives: ['用一张图总结四个子空间', '把消元法理解为秩分解'],
      prerequisites: '3.1-3.5',
      concepts: [
        { title: '全局图景', body: '消元法给出主元列与自由列，也就给出四个子空间的基。' },
        { title: 'A=CR 再理解', body: 'C 取主元列，R 记录列依赖关系，秩就是 C 的列数。', formula: 'A=CR' }
      ],
      workedExample: {
        title: '总结四个子空间', source: '改编自教材 3.6 节', prompt: '用一张关系图总结 m×n 矩阵的四个子空间。',
        steps: [
          { title: '维数', body: 'C(A) 与 C(Aᵀ) 维数 r；N(A) 维数 n-r；N(Aᵀ) 维数 m-r。' },
          { title: '正交性', body: '行空间与零空间正交，列空间与左零空间正交。' }
        ],
        answer: '四个子空间两两配对，秩是核心数字。'
      },
      interaction: 'matrix-spaces',
      quiz: [
        { id: 'q1', type: 'judge', prompt: '行空间与零空间正交。', correct: 'true', explanation: 'C(Aᵀ) 与 N(A) 互相正交。' },
        { id: 'q2', type: 'numeric', prompt: 'm×n 矩阵左零空间 N(Aᵀ) 的维数是？', correct: 0, explanation: '具体维数依赖 m 和 r，无法由单个数直接确定。' },
        { id: 'q3', type: 'single', prompt: '四个子空间中，哪两个子空间维数一定相等？', options: ['C(A) 与 N(A)', 'C(A) 与 C(Aᵀ)', 'N(A) 与 N(Aᵀ)', 'C(A) 与 N(Aᵀ)'], correct: 1, explanation: '列空间与行空间维数都等于秩。' }
      ],
      keyTakeaway: '消元法的真正产出是秩，以及由主元列生成的四个子空间。'
    }
  ]
}
