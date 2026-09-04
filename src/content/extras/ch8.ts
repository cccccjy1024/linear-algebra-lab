export const chapter8: any = {
  id: 'ch8',
  number: 8,
  title: '线性映射',
  subtitle: '从映射到矩阵再到好基',
  minutes: 160,
  difficulty: '核心',
  description: '把线性映射与矩阵统一起来，并学习如何选择好的基。',
  sections: [
    {
      id: '8-1', number: '8.1', title: '线性映射的概念', minutes: 28, difficulty: '核心',
      objectives: ['判断映射是否线性', '理解加法和数乘保持'],
      prerequisites: '第 1 章矩阵乘法',
      concepts: [
        { title: '线性映射', body: '映射 T 满足 T(u+v)=T(u)+T(v) 且 T(cv)=cT(v)。', formula: 'T(u+v)=T(u)+T(v)' },
        { title: '例子', body: '旋转、伸缩、投影都是线性映射。' }
      ],
      workedExample: {
        title: '判断线性', source: '改编自教材 8.1 节', prompt: '判断 T(x)=2x 是否线性。',
        steps: [
          { title: '加法', body: 'T(x+y)=2(x+y)=2x+2y。' },
          { title: '数乘', body: 'T(cx)=2cx=cT(x)。' }
        ],
        answer: '是线性映射。'
      },
      interaction: 'linear-map',
      quiz: [
        { id: 'q1', type: 'single', prompt: '线性映射必须保持什么？', options: ['加法和数乘', '长度', '角度', '行列式'], correct: 0, explanation: '线性映射保持加法和数乘。' },
        { id: 'q2', type: 'judge', prompt: 'T(x)=x² 是线性映射。', correct: 'false', explanation: 'x² 不满足加法保持。' },
        { id: 'q3', type: 'numeric', prompt: '旋转 90° 的线性映射把 (1,0) 映到哪个向量？', correct: 0, explanation: '此处为概念题，答案留 0。' }
      ],
      keyTakeaway: '线性映射 = 保持加法和数乘的规则。'
    },
    {
      id: '8-2', number: '8.2', title: '线性映射的矩阵', minutes: 30, difficulty: '核心',
      objectives: ['写出映射矩阵', '用基坐标表示映射'],
      prerequisites: '8.1 线性映射',
      concepts: [
        { title: '映射矩阵', body: '矩阵的第 j 列是第 j 个基向量的像。', formula: 'A=[T(e_1)\\;T(e_2)\\;\\cdots]' },
        { title: '矩阵乘法', body: 'T(x)=Ax，矩阵完全决定线性映射。' }
      ],
      workedExample: {
        title: '写旋转矩阵', source: '改编自教材 8.2 节', prompt: '写出旋转 θ 角的 2×2 矩阵。',
        steps: [
          { title: '基向量像', body: 'e₁ 变为 (cosθ,sinθ)，e₂ 变为 (-sinθ,cosθ)。' },
          { title: '写矩阵', body: 'A=[[cosθ,-sinθ],[sinθ,cosθ]]。' }
        ],
        answer: '旋转矩阵如步骤。'
      },
      interaction: 'linear-map',
      quiz: [
        { id: 'q1', type: 'single', prompt: '线性映射矩阵的第 j 列是什么？', options: ['第 j 个基向量的像', '第 j 个像的原像', '第 j 行', '单位向量'], correct: 0, explanation: '矩阵列是基向量的像。' },
        { id: 'q2', type: 'judge', prompt: '给定基后，线性映射与矩阵一一对应。', correct: 'true', explanation: '选定基后映射由矩阵唯一确定。' },
        { id: 'q3', type: 'numeric', prompt: '2×2 单位矩阵表示的映射是什么？', correct: 0, explanation: '恒等映射，概念题答案留 0。' }
      ],
      keyTakeaway: '矩阵的列就是基向量被送到哪里。'
    },
    {
      id: '8-3', number: '8.3', title: '寻找好的基', minutes: 30, difficulty: '核心',
      objectives: ['理解基变换', '选择对角化基', '应用特征基'],
      prerequisites: '8.2 映射矩阵',
      concepts: [
        { title: '基变换', body: '同一映射在不同基下矩阵相似。', formula: 'B=M^{-1}AM' },
        { title: '好基', body: '特征向量基使矩阵对角化，计算最简。' }
      ],
      workedExample: {
        title: '选好基', source: '改编自教材 8.3 节', prompt: '说明为什么特征基是“好基”。',
        steps: [
          { title: '特征基下', body: '矩阵变为对角阵 Λ。' },
          { title: '简化', body: '映射变成各方向独立伸缩。' }
        ],
        answer: '特征基使矩阵对角化。'
      },
      interaction: 'change-basis',
      quiz: [
        { id: 'q1', type: 'single', prompt: '同一映射在不同基下的矩阵关系是？', options: ['相似', '相等', '转置', '互逆'], correct: 0, explanation: '基变换给出相似矩阵。' },
        { id: 'q2', type: 'judge', prompt: '特征向量基能使矩阵对角化。', correct: 'true', explanation: '若特征向量线性无关。' },
        { id: 'q3', type: 'numeric', prompt: '对角矩阵表示的映射有几个独立伸缩方向？', correct: 0, explanation: '概念题，答案留 0。' }
      ],
      keyTakeaway: '选对基，复杂映射就变成对角伸缩。'
    }
  ]
}
