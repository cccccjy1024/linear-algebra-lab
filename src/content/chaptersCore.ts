import type { Chapter } from './types'

export const knowledgeChapters: any[] = [
  {
    id: 'ch1',
    number: 1,
    title: '向量和矩阵',
    subtitle: '用线性组合与矩阵乘法建立几何直觉',
    minutes: 180,
    difficulty: '入门',
    description: '从向量、点积、列空间到矩阵乘法和 A=CR，理解线性代数的核心语言。',
    sections: [
      {
        id: '1-1',
        slug: 'vectors-linear-combinations',
        number: '1.1',
        title: '向量及其线性组合',
        minutes: 30,
        difficulty: '入门',
        objectives: ['写出向量的线性组合 cv+dw', '把二元方程组翻译成向量方程', '判断两个向量张成直线还是平面'],
        prerequisites: '平面直角坐标与二元一次方程组',
        concepts: [
          { title: '线性组合', body: '给定向量 v 与 w，所有形如 cv+dw 的向量称为它们的线性组合。改变系数 c、d，就得到由 v 和 w 张成的图形。', formula: 'cv+dw' },
          { title: '向量方程', body: '线性方程组可以写成列向量的组合等于目标向量 b。寻找 c、d 就是解方程组。', formula: 'c\\begin{bmatrix}1\\\\2\\end{bmatrix}+d\\begin{bmatrix}3\\\\1\\end{bmatrix}=b' },
          { title: '失效情形', body: '当 v 与 w 共线时，线性组合只能落在这条直线上，无法覆盖整个平面。' }
        ],
        workedExample: {
          title: '求解线性组合系数',
          source: '改编自教材 1.1 节',
          prompt: '设 v=(1,2)，w=(3,1)，求 c、d，使 cv+dw=(7,8)。',
          steps: [
            { title: '写成向量方程', body: '把目标向量写成列向量组合。', formula: 'c\\begin{bmatrix}1\\\\2\\end{bmatrix}+d\\begin{bmatrix}3\\\\1\\end{bmatrix}=\\begin{bmatrix}7\\\\8\\end{bmatrix}' },
            { title: '转成方程组', body: '第一行对应 x 分量，第二行对应 y 分量。', formula: '\\begin{cases}c+3d=7\\\\2c+d=8\\end{cases}' },
            { title: '消元求解', body: '从第一个方程得 c=7-3d，代入第二个方程。', formula: '2(7-3d)+d=8 \\Rightarrow 14-5d=8' },
            { title: '回代', body: '解得 d=6/5，再回代求 c。', formula: 'd=\\tfrac{6}{5},\\quad c=7-3\\cdot\\tfrac{6}{5}=\\tfrac{17}{5}' }
          ],
          answer: 'c=17/5，d=6/5'
        },
        interaction: 'linear-combo',
        quiz: [
          { id: 'q1', type: 'single', prompt: '在二维平面中，两个不共线向量 v、w 的所有线性组合形成什么图形？', options: ['一条直线', '整个平面', '一个点', '一条射线'], correct: 1, explanation: '不共线的两个向量能沿两个独立方向张成整个二维平面。' },
          { id: 'q2', type: 'numeric', prompt: '若 v=(2,0)，w=(0,3)，求使 cv+dw=(4,6) 的 c 值。', correct: 2, explanation: '4=2c，所以 c=2。' },
          { id: 'q3', type: 'judge', prompt: '两个共线向量张成的仍然是平面。', correct: 'false', explanation: '共线向量只能沿同一方向，张成的是过原点的一条直线。' }
        ],
        keyTakeaway: '线性组合 cv+dw 是线性代数的第一语言：解方程组就是寻找生成目标向量的系数。'
      },
      {
        id: '1-2',
        slug: 'dot-product-length-angle',
        number: '1.2',
        title: '点积、长度和角度',
        minutes: 32,
        difficulty: '入门',
        objectives: ['计算向量点积和长度', '用点积判断垂直与夹角', '理解三维平面与法向量关系'],
        prerequisites: '1.1 向量及其线性组合',
        concepts: [
          { title: '点积', body: '两个同维向量的对应分量相乘再求和。', formula: 'v\\cdot w=v_1w_1+v_2w_2+\\cdots+v_nw_n' },
          { title: '长度', body: '向量长度的平方等于它与自身的点积。', formula: '\\|v\\|^2=v\\cdot v' },
          { title: '夹角与垂直', body: '点积为 0 等价于向量垂直；夹角的余弦由点积除以长度之积得到。', formula: '\\cos\\theta=\\frac{v\\cdot w}{\\|v\\|\\|w\\|}' }
        ],
        workedExample: {
          title: '求两个三维向量的夹角',
          source: '改编自教材 1.2 节',
          prompt: '设 v=(1,2,3)，w=(4,5,6)，求它们的夹角。',
          steps: [
            { title: '计算点积', body: '对应分量相乘求和。', formula: 'v\\cdot w=1\\cdot4+2\\cdot5+3\\cdot6=32' },
            { title: '计算长度', body: '分别求两个向量的模。', formula: '\\|v\\|=\\sqrt{1^2+2^2+3^2}=\\sqrt{14},\\quad \\|w\\|=\\sqrt{4^2+5^2+6^2}=\\sqrt{77}' },
            { title: '求余弦', body: '点积除以长度乘积。', formula: '\\cos\\theta=\\frac{32}{\\sqrt{14}\\sqrt{77}}' },
            { title: '写出夹角', body: '用反余弦得到角度。', formula: '\\theta=\\cos^{-1}\\!\\left(\\frac{32}{\\sqrt{14}\\sqrt{77}}\\right)' }
          ],
          answer: '夹角约为 9.9°'
        },
        interaction: 'dot-product',
        quiz: [
          { id: 'q1', type: 'single', prompt: '若 v·w=0，则 v 与 w 的关系是？', options: ['平行', '垂直', '相等', '无法判断'], correct: 1, explanation: '点积为零是垂直的定义。' },
          { id: 'q2', type: 'numeric', prompt: '计算 (1,2,3)·(4,5,6)。', correct: 32, explanation: '1×4+2×5+3×6=32。' },
          { id: 'q3', type: 'judge', prompt: '点积可以衡量两个向量方向的一致程度。', correct: 'true', explanation: '夹角越接近 0，余弦越大，方向越一致。' }
        ],
        keyTakeaway: '点积把几何中的长度与夹角变成可以计算的数值，是相似度与投影的基础。'
      },
      {
        id: '1-3',
        slug: 'matrices-column-space',
        number: '1.3',
        title: '矩阵和它们的列空间',
        minutes: 38,
        difficulty: '核心',
        objectives: ['把矩阵乘法 Ax 理解为列的线性组合', '描述矩阵的列空间', '识别秩 1 矩阵'],
        prerequisites: '1.1 向量及其线性组合',
        concepts: [
          { title: 'Ax 是列的线性组合', body: '矩阵乘向量时，结果等于 A 的各列按 x 的分量加权求和。', formula: 'Ax=x_1\\,a_1+x_2\\,a_2+\\cdots+x_n\\,a_n' },
          { title: '列空间', body: 'A 的所有可能输出 Ax 构成列空间 C(A)，它是列向量的所有线性组合。', formula: 'C(A)=\\{Ax:x\\in\\mathbb{R}^n\\}' },
          { title: '秩', body: '秩是列空间中独立方向的个数，等于主元列个数。秩 1 矩阵是列乘行的外积。', formula: 'A=uv^T' }
        ],
        workedExample: {
          title: '识别秩 1 矩阵',
          source: '改编自教材 1.3 节',
          prompt: '判断矩阵 A=[[1,2],[3,6]] 的列空间和秩。',
          steps: [
            { title: '观察列向量', body: '第二列是第一列的 2 倍。', formula: 'a_2=\\begin{bmatrix}2\\\\6\\end{bmatrix}=2\\begin{bmatrix}1\\\\3\\end{bmatrix}=2a_1' },
            { title: '写列空间', body: '列空间由第一列方向上的所有向量组成。', formula: 'C(A)=\\{c\\begin{bmatrix}1\\\\3\\end{bmatrix}:c\\in\\mathbb{R}\\}' },
            { title: '判断秩', body: '只有一个独立方向，秩为 1。' }
          ],
          answer: 'C(A) 是过原点沿 (1,3) 方向的直线，rank A = 1'
        },
        interaction: 'column-space',
        quiz: [
          { id: 'q1', type: 'single', prompt: '矩阵 A 的列空间是指？', options: ['A 的所有行', 'A 的所有列的线性组合', 'A 的所有元素', 'A 的行列式'], correct: 1, explanation: '列空间由列的线性组合生成。' },
          { id: 'q2', type: 'numeric', prompt: '矩阵 [[1,2],[3,6]] 的秩是多少？', correct: 1, explanation: '两列共线，只有一个独立方向。' },
          { id: 'q3', type: 'judge', prompt: '秩 1 矩阵可以写成列向量乘行向量。', correct: 'true', explanation: '秩 1 矩阵都可写为 A=uv^T。' }
        ],
        keyTakeaway: '矩阵乘法的本质是列的线性组合；列空间概括了矩阵输出能到达的范围。'
      },
      {
        id: '1-4',
        slug: 'matrix-multiplication-cr',
        number: '1.4',
        title: '矩阵乘法 AB 和 CR',
        minutes: 44,
        difficulty: '核心',
        objectives: ['掌握四种理解矩阵乘法的方式', '用 A=CR 表示列的依赖关系'],
        prerequisites: '1.3 矩阵和它们的列空间',
        concepts: [
          { title: '四种视角', body: 'AB 可以按行×列点积、列组合、行组合、列×行外积理解。' },
          { title: 'A=CR', body: 'C 取 A 的独立列，R 记录每列如何用 C 的列表示。', formula: 'A=CR' },
          { title: '秩的桥梁', body: 'C 有 r 列，R 有 r 行，中间维 r 就是 A 的秩。' }
        ],
        workedExample: {
          title: '对矩阵做 CR 分解',
          source: '改编自教材 1.4 节',
          prompt: '设 A=[[1,2,3],[4,5,6]]，找出独立列 C 和系数矩阵 R，使 A=CR。',
          steps: [
            { title: '选独立列', body: '前两列不共线，是独立列。', formula: 'C=\\begin{bmatrix}1&2\\\\4&5\\end{bmatrix}' },
            { title: '表示第三列', body: '第三列等于第二列的 2 倍减去第一列。', formula: 'a_3=2a_2-a_1' },
            { title: '写出 R', body: '每列对应的系数依次排列。', formula: 'R=\\begin{bmatrix}1&0&-1\\\\0&1&2\\end{bmatrix}' },
            { title: '验证', body: 'C 乘 R 恢复 A。', formula: 'CR=A' }
          ],
          answer: 'C=[[1,2],[4,5]]，R=[[1,0,-1],[0,1,2]]'
        },
        interaction: 'matrix-multiply',
        quiz: [
          { id: 'q1', type: 'single', prompt: '矩阵乘积 AB 中，AB 的第 j 列等于？', options: ['A 的各行的组合', 'A 的各列按 B 第 j 列系数组合', 'B 的各列按 A 第 j 行系数组合', 'A 与 B 的点积'], correct: 1, explanation: '列视角：AB 的第 j 列是 A 的列以 B 第 j 列为系数做线性组合。' },
          { id: 'q2', type: 'numeric', prompt: '矩阵 A 的秩为 r，A=CR 中 R 的行数是？', correct: 2, explanation: '对 A=[[1,2,3],[4,5,6]]，秩为 2，故 R 有 2 行。' },
          { id: 'q3', type: 'judge', prompt: '矩阵乘法通常满足交换律 AB=BA。', correct: 'false', explanation: '矩阵乘法一般不满足交换律。' }
        ],
        keyTakeaway: 'A=CR 把矩阵分解成“独立列 × 依赖关系”，直接揭示列空间的维度。'
      }
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: '解线性方程组 Ax=b',
    subtitle: '消元、逆矩阵与 LU 分解',
    minutes: 210,
    difficulty: '核心',
    description: '系统求解线性方程组，理解消元、初等矩阵、逆矩阵、LU 分解与置换。',
    sections: [
      {
        id: '2-1',
        slug: 'elimination-back-substitution',
        number: '2.1',
        title: '消元法和回代',
        minutes: 38,
        difficulty: '核心',
        objectives: ['对 Ax=b 执行高斯消元', '回代求解上三角方程组', '识别无解与无穷多解'],
        prerequisites: '第 1 章矩阵运算基础',
        concepts: [
          { title: '消元', body: '用主元消去下方同列元素，把 A 变成上三角矩阵 U，同时把 b 变成 c。', formula: '\\left[A\\;b\\right]\\rightarrow\\left[U\\;c\\right]' },
          { title: '回代', body: '从最后一个方程开始逐个求解未知数。', formula: 'Ux=c' },
          { title: '主元', body: '主元是每步消元所用的对角元素；主元为 0 时消元可能失效或需要行交换。' }
        ],
        workedExample: {
          title: '消元并回代求解',
          source: '改编自教材 2.1 节',
          prompt: '解方程组：2x+4y-2z=2，4x+9y-3z=8，-2x-3y+7z=10。',
          steps: [
            { title: '写增广矩阵', body: '系数矩阵与右端向量并排。', formula: '\\begin{bmatrix}2&4&-2&2\\\\4&9&-3&8\\\\-2&-3&7&10\\end{bmatrix}' },
            { title: '第一列消元', body: '第 2 行减 2 倍第 1 行；第 3 行加 1 倍第 1 行。', formula: '\\begin{bmatrix}2&4&-2&2\\\\0&1&1&4\\\\0&1&5&12\\end{bmatrix}' },
            { title: '第二列消元', body: '第 3 行减第 2 行。', formula: '\\begin{bmatrix}2&4&-2&2\\\\0&1&1&4\\\\0&0&4&8\\end{bmatrix}' },
            { title: '回代', body: '依次解得 z=2，y=2，x=-1。', formula: 'x=-1,\\ y=2,\\ z=2' }
          ],
          answer: 'x=(-1,2,2)'
        },
        interaction: 'elimination',
        quiz: [
          { id: 'q1', type: 'single', prompt: '高斯消元把 A 变换成什么形状的矩阵？', options: ['下三角矩阵', '上三角矩阵', '对角矩阵', '对称矩阵'], correct: 1, explanation: '消元得到上三角矩阵 U。' },
          { id: 'q2', type: 'numeric', prompt: '上三角方程组 2z=4 中，z 等于多少？', correct: 2, explanation: 'z=4/2=2。' },
          { id: 'q3', type: 'judge', prompt: '消元过程中出现 0 主元时，方程组一定无解。', correct: 'false', explanation: '0 主元可能只是需要行交换，也可能对应无解或无穷多解。' }
        ],
        keyTakeaway: '消元法把复杂方程组逐步变成容易回代的上三角系统。'
      },
      {
        id: '2-2',
        slug: 'elementary-matrices-inverse',
        number: '2.2',
        title: '初等矩阵和逆矩阵',
        minutes: 40,
        difficulty: '核心',
        objectives: ['把消元步骤写成初等矩阵', '用高斯-若尔当法求逆矩阵', '验证 AA⁻¹=I'],
        prerequisites: '2.1 消元法和回代',
        concepts: [
          { title: '初等矩阵', body: '对单位矩阵做一次行变换得到的矩阵；左乘它就是对目标矩阵做同样的行变换。', formula: 'EA' },
          { title: '逆矩阵', body: '若存在 B 使 AB=BA=I，则 B 是 A 的逆矩阵，记为 A⁻¹。', formula: 'AA^{-1}=I' },
          { title: '高斯-若尔当', body: '同时对 A 和 I 做相同行变换，把 A 变成 I 时，右侧就是 A⁻¹。', formula: '[A\\;I]\\rightarrow[I\\;A^{-1}]' }
        ],
        workedExample: {
          title: '求 2×2 逆矩阵',
          source: '改编自教材 2.2 节',
          prompt: '求 A=[[1,2],[3,4]] 的逆矩阵。',
          steps: [
            { title: '写增广矩阵', body: 'A 与单位矩阵并排。', formula: '\\begin{bmatrix}1&2&1&0\\\\3&4&0&1\\end{bmatrix}' },
            { title: '第一列消元', body: '第 2 行减 3 倍第 1 行。', formula: '\\begin{bmatrix}1&2&1&0\\\\0&-2&-3&1\\end{bmatrix}' },
            { title: '把主元变成 1', body: '第 2 行除以 -2。', formula: '\\begin{bmatrix}1&2&1&0\\\\0&1&1.5&-0.5\\end{bmatrix}' },
            { title: '回消', body: '第 1 行减 2 倍第 2 行，得到逆矩阵。', formula: 'A^{-1}=\\begin{bmatrix}-2&1\\\\1.5&-0.5\\end{bmatrix}' }
          ],
          answer: 'A⁻¹=[[-2,1],[1.5,-0.5]]'
        },
        interaction: 'inverse',
        quiz: [
          { id: 'q1', type: 'single', prompt: '矩阵 A 可逆的充要条件是？', options: ['A 是对称矩阵', 'A 存在非零主元列且满秩', 'A 的行列式等于 1', 'A 是单位矩阵'], correct: 1, explanation: '可逆等价于满秩，所有主元非零。' },
          { id: 'q2', type: 'numeric', prompt: 'A=[[1,2],[3,4]] 的行列式是多少？', correct: -2, explanation: '1×4-2×3=-2。' },
          { id: 'q3', type: 'judge', prompt: '若 AB=I，则 B 一定是 A 的逆矩阵。', correct: 'true', explanation: '对于方阵，右逆即逆矩阵，AB=I 时 B=A⁻¹。' }
        ],
        keyTakeaway: '初等矩阵记录消元动作，逆矩阵把消元结果“撤销”回原系统。'
      },
      {
        id: '2-3',
        slug: 'matrix-operations-lu',
        number: '2.3',
        title: '矩阵运算和 LU 分解',
        minutes: 42,
        difficulty: '核心',
        objectives: ['把消元乘子组装成 L', '验证 A=LU', '理解消元的计算量'],
        prerequisites: '2.2 初等矩阵和逆矩阵',
        concepts: [
          { title: 'A=LU', body: '消元等价于 A 左乘一个下三角矩阵的逆，即 A=L U。', formula: 'A=LU' },
          { title: 'L 的含义', body: 'L 是单位下三角矩阵，对角线为 1，下方存放每一步的消元乘子。', formula: 'L=\\begin{bmatrix}1&0&0\\\\\\ell_{21}&1&0\\\\\\ell_{31}&\\ell_{32}&1\\end{bmatrix}' },
          { title: '计算量', body: '对 n×n 矩阵做消元约需 n³/3 次乘除。' }
        ],
        workedExample: {
          title: '写出 LU 分解',
          source: '改编自教材 2.3 节',
          prompt: '对 A=[[2,1,1],[4,3,3],[8,7,9]] 做 LU 分解。',
          steps: [
            { title: '第一列消元', body: '乘子 l21=2，l31=4。', formula: '\\begin{bmatrix}2&1&1\\\\0&1&1\\\\0&3&5\\end{bmatrix}' },
            { title: '第二列消元', body: '乘子 l32=3。', formula: 'U=\\begin{bmatrix}2&1&1\\\\0&1&1\\\\0&0&2\\end{bmatrix}' },
            { title: '组装 L', body: '把乘子放入单位下三角矩阵。', formula: 'L=\\begin{bmatrix}1&0&0\\\\2&1&0\\\\4&3&1\\end{bmatrix}' },
            { title: '验证', body: 'L 乘 U 恢复 A。', formula: 'A=LU' }
          ],
          answer: 'L=[[1,0,0],[2,1,0],[4,3,1]]，U=[[2,1,1],[0,1,1],[0,0,2]]'
        },
        interaction: 'lu',
        quiz: [
          { id: 'q1', type: 'single', prompt: 'LU 分解中，U 是什么矩阵？', options: ['下三角矩阵', '上三角矩阵', '置换矩阵', '逆矩阵'], correct: 1, explanation: 'U 是消元后的上三角矩阵。' },
          { id: 'q2', type: 'numeric', prompt: '对 3×3 矩阵 A=LU，若 L=[[1,0,0],[2,1,0],[4,3,1]]，L 的 (3,1) 元素是多少？', correct: 4, explanation: '第 3 行第 1 列的乘子是 4。' },
          { id: 'q3', type: 'judge', prompt: 'LU 分解中的 L 对角线元素都是 1。', correct: 'true', explanation: 'L 是单位下三角矩阵。' }
        ],
        keyTakeaway: 'LU 分解把消元“记录”下来，之后可对任意右端 b 快速求解。'
      },
      {
        id: '2-4',
        slug: 'permutation-transpose',
        number: '2.4',
        title: '置换与转置',
        minutes: 42,
        difficulty: '核心',
        objectives: ['理解置换矩阵的行交换作用', '写出 PA=LU 分解', '应用转置与对称矩阵'],
        prerequisites: '2.3 矩阵运算和 LU 分解',
        concepts: [
          { title: '置换矩阵', body: 'P 每行每列恰有一个 1，左乘矩阵会交换它的行。', formula: 'PA' },
          { title: 'PA=LU', body: '需要行交换时，先选主元并记录置换，再写 LU。', formula: 'PA=LU' },
          { title: '转置', body: '把矩阵的行和列互换；对称矩阵满足 A^T=A。', formula: '(A^T)_{ij}=A_{ji}' },
          { title: '内积恒等式', body: '转置把矩阵从一个点积侧移到另一侧。', formula: '\\langle Ax,y\\rangle=\\langle x,A^Ty\\rangle' }
        ],
        workedExample: {
          title: '需要行交换的 PA=LU',
          source: '改编自教材 2.4 节',
          prompt: '对 A=[[0,1,1],[1,1,1],[1,2,3]] 写出 PA=LU。',
          steps: [
            { title: '识别零主元', body: '首列首元素为 0，需要交换前两行。', formula: 'P=\\begin{bmatrix}0&1&0\\\\1&0&0\\\\0&0&1\\end{bmatrix}' },
            { title: '交换行', body: '得到 PA，首主元为 1。', formula: 'PA=\\begin{bmatrix}1&1&1\\\\0&1&1\\\\1&2&3\\end{bmatrix}' },
            { title: '继续消元', body: '第 3 行减第 1 行，再消去第二列。', formula: '\\begin{bmatrix}1&1&1\\\\0&1&1\\\\0&1&2\\end{bmatrix}\\rightarrow\\begin{bmatrix}1&1&1\\\\0&1&1\\\\0&0&1\\end{bmatrix}' },
            { title: '写出分解', body: 'L 包含消元乘子。', formula: 'PA=LU,\\quad L=\\begin{bmatrix}1&0&0\\\\0&1&0\\\\1&1&1\\end{bmatrix}' }
          ],
          answer: 'P 交换前两行；PA=LU 中 L 如步骤所示'
        },
        interaction: 'permutation',
        quiz: [
          { id: 'q1', type: 'single', prompt: '左乘置换矩阵 P 会对矩阵做什么操作？', options: ['交换列', '交换行', '求转置', '求逆'], correct: 1, explanation: '左乘 P 交换 A 的行，右乘 P 交换 A 的列。' },
          { id: 'q2', type: 'numeric', prompt: '3×3 矩阵有多少个置换矩阵？', correct: 6, explanation: '3! = 6 种行排列。' },
          { id: 'q3', type: 'judge', prompt: '对称矩阵满足 A^T=A。', correct: 'true', explanation: '对称矩阵的定义就是转置等于自身。' }
        ],
        keyTakeaway: '置换负责行交换，转置负责交换行与列的角色；PA=LU 覆盖一般可逆情形。'
      }
    ]
  }
]
