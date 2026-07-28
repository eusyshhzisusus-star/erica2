# 고교 진로/학업 로드맵 AI (highschool-roadmap-ai)

Vercel 배포용 고등학생 맞춤형 로드맵 & Q&A 웹 앱 프로젝트입니다.

## 📁 프로젝트 구조
```
highschool-roadmap-ai/
├── index.html            # 프론트엔드 UI (시간표 제거, 마지막 질문 칸 반영)
├── api/
│   └── generate.js       # Vercel Serverless Function (GEMINI_API_KEY 사용)
├── package.json
├── vercel.json
└── .env.local.example    # 로컬 환경변수 샘플
```

## 🚀 사용 및 배포 방법

### 1. 로컬 실행
1. 압축을 해제한 후 해당 폴더로 이동합니다.
2. `.env.local.example` 파일을 `.env.local`로 복사하고, 본인의 Gemini API 키를 작성합니다.
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Vercel CLI로 로컬 개발 서버를 실행합니다:
   ```bash
   vercel dev
   ```

### 2. Vercel 배포
1. GitHub 리포지토리에 푸시합니다.
2. Vercel 대시보드에서 프로젝트를 불러옵니다.
3. **Environment Variables** 메뉴에서 `GEMINI_API_KEY` 환경변수를 등록합니다.
4. **Deploy**를 눌러 배포합니다.
