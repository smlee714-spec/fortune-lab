# 사주팔자 (Next.js 15)

생년월일, 태어난 시간, 성별을 입력하면 사주팔자를 보여주는 모바일 웹앱입니다.

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- 모바일 최적화 (최대 430px)

---

## 시작하기 (초보자용 단계별 가이드)

### 0단계: Node.js 설치 확인

터미널(PowerShell)을 열고 아래 명령어를 입력합니다.

```bash
node -v
```

`v18` 이상 숫자가 나오면 OK입니다.  
나오지 않으면 [https://nodejs.org](https://nodejs.org) 에서 **LTS** 버전을 설치한 뒤 터미널을 다시 엽니다.

---

### 1단계: 프로젝트 폴더로 이동

```bash
cd D:\Projects\SajuApp
```

> `cd` = **c**hange **d**irectory. 원하는 폴더로 이동하는 명령어입니다.

---

### 2단계: 패키지 설치

```bash
npm install
```

> `npm install` = `package.json`에 적힌 Next.js, React, Tailwind 등 필요한 라이브러리를 `node_modules` 폴더에 다운로드합니다.  
> 처음 한 번만 실행하면 됩니다. (시간이 1~2분 걸릴 수 있습니다)

---

### 3단계: 개발 서버 실행

```bash
npm run dev
```

> `npm run dev` = 개발용 서버를 켭니다. 코드를 수정하면 브라우저에 자동 반영됩니다.

터미널에 아래와 비슷한 메시지가 나오면 성공입니다.

```
▲ Next.js 15.x.x
- Local: http://localhost:3000
```

---

### 4단계: 브라우저에서 열기

Chrome 또는 Edge 주소창에 입력합니다.

```
http://localhost:3000
```

모바일 화면처럼 보려면 브라우저 개발자 도구(F12) → 📱 아이콘 → iPhone 등 기기 선택.

---

### 5단계: 서버 끄기

터미널에서 `Ctrl + C` 를 누릅니다.

---

## 프로젝트 구조

```
SajuApp/
├── app/
│   ├── layout.tsx      # 전체 레이아웃, 폰트 설정
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # Tailwind + 전역 스타일
├── components/
│   ├── SajuApp.tsx     # 입력/결과 화면 (메인 UI)
│   ├── PillarCard.tsx  # 사주 기둥 카드
│   ├── ElementChart.tsx# 오행 차트
│   └── LogoMark.tsx    # 로고
├── lib/
│   ├── saju.ts         # 사주 계산 로직
│   └── types.ts        # TypeScript 타입
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 자주 쓰는 명령어

| 명령어 | 설명 |
|--------|------|
| `npm install` | 패키지 설치 (처음 1회) |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 배포용 빌드 |
| `npm run start` | 빌드 후 프로덕션 서버 실행 |
| `npm run lint` | 코드 검사 |

---

## 사용 방법

1. 생년월일 선택
2. 태어난 시간 입력 (모르면 12:00)
3. 성별 선택
4. **사주 보기** 버튼 클릭
5. 결과 화면에서 년·월·일·시주 확인
6. ← 버튼으로 입력 화면 복귀

---

## 참고

- 양력 기준, 입춘(2월 4일) 전후로 년·월주가 바뀝니다.
- 자시(23:00~01:00) 기준으로 시주를 계산합니다.
- 교육·오락 목적의 간단한 사주이며, 전문 만세력과 차이가 있을 수 있습니다.
