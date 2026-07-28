import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { grade, targetMajor, userGoals, question } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    const prompt = `
[사용자 기본 정보]
- 학년: ${grade || '미지정'}
- 희망 전공: ${targetMajor || '미지정'}
- 목표/관심사: ${userGoals || '미지정'}

[사용자 질문 및 요청]
${question || '기본 정보에 맞는 고등학교 활동 및 학업 로드맵 가이드를 제공해 주세요.'}

[안내사항]
- 주간/일간 시간표 형태는 작성하지 마세요.
- 입력된 기본 정보와 질문에 대해 친절하고 구체적으로 답변 및 조언을 제공해 주세요.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({ answer: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: '답변을 생성하는 도중 오류가 발생했습니다.' });
  }
}
