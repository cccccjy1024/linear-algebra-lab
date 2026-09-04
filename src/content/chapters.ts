import type { Application, Chapter, Section } from './types'
import { knowledgeChapters } from './chaptersCore'
import { extraChapters } from './chaptersExtra'

const knowledgeDescriptions: Record<string, string> = {
  '1-1': '从线性组合出发，理解向量方程与平面张成。',
  '1-2': '用点积计算长度、夹角、投影与垂直关系。',
  '1-3': '把矩阵乘法 Ax 理解为列的线性组合，认识列空间与秩。',
  '1-4': '掌握矩阵乘法的四种视角与 A=CR 分解。',
  '2-1': '用消元法把 Ax=b 变成上三角并回代求解。',
  '2-2': '用初等矩阵记录消元，并求逆矩阵。',
  '2-3': '把消元乘子组装成 L，理解 A=LU 分解。',
  '2-4': '用置换处理行交换，并理解转置与对称矩阵。'
}

const memoryHooks: Record<string, string> = {
  '1-1': '向量相加就是“把箭头首尾相接”；系数 c、d 决定你从原点走到哪里。',
  '1-2': '点积就是“同方向有多合拍”：同向为正、反向为负、垂直为 0。',
  '1-3': 'Ax 就是让 A 的每一列按 x 的分量排队相加；列空间是它能到达的所有位置。',
  '1-4': 'AB 可以看成“行点乘列”，也可以看成“A 的列按 B 的系数做组合”。',
  '2-1': '消元就是“用上面的方程消掉下面的未知数”，最后从下往上回代。',
  '2-2': '初等矩阵是“只做一步行变换的开关”；逆矩阵是把开关拨回来。',
  '2-3': 'LU 把消元步骤存进 L；以后换右边 b，只需再解两个三角方程组。',
  '2-4': 'P 负责换行，Aᵀ 负责把行变成列；对称矩阵转置后还是自己。'
}

const rigorousNotes: Record<string, string> = {
  '1-1': '线性组合 cv+dw 是向量空间的基本运算；若 v、w 线性无关，则 span{v,w} 为二维平面，否则退化为一条直线。',
  '1-2': '点积 v·w=Σvᵢwᵢ 满足对称性、双线性与正定性；v·w=0 当且仅当 v⊥w；夹角余弦由 Cauchy–Schwarz 不等式保证在 [-1,1] 内。',
  '1-3': '列空间 C(A)=span{a₁,…,aₙ}；秩 r(A) 等于列空间维数，也等于最大线性无关列数；秩1矩阵可分解为 A=uvᵀ。',
  '1-4': 'AB 的第 j 列是 A 的列以 B 第 j 列为系数做线性组合；A=CR 中 C 由 r 个独立列组成，R 是每列在 C 下的坐标，且 r=rank(A)。',
  '2-1': '高斯消元通过行变换把增广矩阵化为行阶梯形；主元非零时可唯一回代；出现 0 主元时需用系数矩阵与增广矩阵的秩判定无解或无穷多解。',
  '2-2': '每次基本行变换对应左乘一个初等矩阵 E；若 A 可逆，则 E_k…E₁A=I，从而 A⁻¹=E_k…E₁；A 可逆当且仅当 rank(A)=n。',
  '2-3': '无行交换消元时 A=LU，L 为单位下三角矩阵，元素为消元乘子；解 Ax=b 等价于依次解 Lc=b、Ux=c 两个三角系统。',
  '2-4': '置换矩阵 P 满足 PPᵀ=I；一般方阵可分解为 PA=LU；转置满足 (AB)ᵀ=BᵀAᵀ 与 ⟨Ax,y⟩=⟨x,Aᵀy⟩；对称矩阵 A=Aᵀ。'
}

const applicationsBySection: Record<string, Application[]> = {
  '1-1': [
    {
      id: 'app-force',
      kind: 'engineering',
      title: '工科应用：力的向量合成',
      description: '工程中的力、速度、位移都能写成向量；求合力就是做向量加法，也就是 c=1、d=1 的线性组合。',
      interaction: 'force',
      keyTakeaway: '平行四边形法则与向量加法是同一件事：合力就是两个力向量的线性组合。'
    }
  ],
  '1-2': [
    {
      id: 'app-embedding',
      kind: 'ai',
      title: 'AI 应用：向量相似度与 Embedding',
      description: 'AI 把词、图、用户表示成向量，再用点积/夹角衡量“语义相近”。',
      interaction: 'embedding',
      keyTakeaway: '点积把“方向有多合拍”变成数值，这正是检索、推荐与注意力机制的基础。'
    }
  ],
  '1-4': [
    {
      id: 'app-layer',
      kind: 'ai',
      title: 'AI 应用：神经网络单层 = Wx+b',
      description: '一层神经网络本质上就是矩阵乘法加偏置；矩阵乘法在这里不再是抽象规则。',
      interaction: 'layer',
      keyTakeaway: '权重矩阵 W 对输入做线性变换，偏置 b 做平移；神经网络的前向传播从矩阵乘法开始。'
    }
  ],
  '2-1': [
    {
      id: 'app-fit',
      kind: 'ai',
      title: 'AI 应用：线性模型拟合',
      description: '把两个数据点代入 y=mx+c，就得到一个 2×2 的 Ax=b；消元法直接解出模型参数。',
      interaction: 'linear-fit',
      keyTakeaway: '监督学习的雏形：数据代入模型 → 得到线性方程组 → 解出参数。'
    }
  ],
  '2-3': [
    {
      id: 'app-circuit',
      kind: 'engineering',
      title: '工科应用：电路网孔电流',
      description: '基尔霍夫电压方程写成 Ax=b；LU 分解把一次消元记录下来，便于更换电压后快速求解。',
      interaction: 'circuit',
      keyTakeaway: '工程守恒方程归结为 Ax=b；A=LU 让“换右边 b”的重复求解更高效。'
    }
  ],
  '2-4': [
    {
      id: 'app-traffic',
      kind: 'engineering',
      title: '工科应用：交通流网络平衡',
      description: '节点“流入=流出”写成线性方程组；解是否唯一取决于矩阵是否满秩。',
      interaction: 'traffic',
      keyTakeaway: '网络平衡问题通过节点方程转化为 Ax=b；秩决定解的存在性与唯一性。'
    }
  ]
}

function enhanceSection(s: any): Section {
  return {
    ...s,
    kind: 'knowledge',
    description: knowledgeDescriptions[s.id] ?? s.title,
    memoryHook: memoryHooks[s.id] ?? `一句话记忆：${s.title}——先抓住“它解决什么问题”，再记公式。`,
    rigorousNote: rigorousNotes[s.id] ?? `对应教材 ${s.number} 节：掌握定义、性质与典型例题；关键结论已在上方给出，严格推导可见原书。`,
    applications: applicationsBySection[s.id] ?? []
  }
}

const allKnowledgeChapters: any[] = [...knowledgeChapters, ...extraChapters]
export const chapters: Chapter[] = allKnowledgeChapters.map((ch: any) => ({
  ...ch,
  sections: ch.sections.map(enhanceSection)
}))

export const allSections = chapters.flatMap((c) => c.sections)

export function getSection(id: string) {
  return allSections.find((s) => s.id === id)
}

export function getChapterBySection(sectionId: string) {
  return chapters.find((c) => c.sections.some((s) => s.id === sectionId))
}
