import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { grade, target, interest, question } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
당신은 고등학생을 위한 진로 및 학업 컨설팅 AI 전문가입니다.
다음 학생의 정보를 바탕으로 맞춤형 진로/학업 로드맵을 작성하고, 학생이 작성한 추가 질문 및 의견에 대해 친절하고 구체적으로 답변해 주세요.

[학생 정보]
- 학년: ${grade || '미선택'}
- 희망 진로 / 목표 학과: ${target || '미선택'}
- 관심 분야 / 과목: ${interest || '미선택'}

[학생의 추가 질문 / 의견]
${question || '특별한 질문 없음'}

[응답 작성 형식]
1. 🎯 **맞춤형 학업 및 진로 로드맵**
   - 추천 탐구 활동 / 교과 연계 추천
   - 시기별 준비 전략 (수시/정시/생기부 등)
2. 💡 **질문 및 의견에 대한 답변**
   - 학생이 작성한 질문에 대한 명확하고 실질적인 조언과 제안

반드시 읽기 쉽고 친절하게 마크다운 형식으로 작성해 주세요.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'AI 응답을 생성하는 중 오류가 발생했습니다.' });
  }
}