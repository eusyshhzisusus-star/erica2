import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { grade, targetMajor, userGoals, question } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key_here')) {
      console.error('API Key Error: GEMINI_API_KEY is not set in environment variables.');
      return res.status(400).json({ 
        error: 'Vercel 환경변수에 GEMINI_API_KEY가 설정되지 않았거나 올바르지 않습니다. Vercel Settings > Environment Variables에서 키를 등록 후 Redeploy 해주세요.' 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
    console.error('Gemini API Exception Details:', error);
    return res.status(500).json({ 
      error: `Gemini API 호출 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}` 
    });
  }
}
