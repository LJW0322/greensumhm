# 그린섬미술학원 화명캠퍼스

HTML, CSS, JavaScript로 만든 반응형 학원 소개 사이트입니다. 별도 빌드나 패키지 설치 없이 정적 호스팅에 올릴 수 있습니다.

## 로컬 실행

이 폴더에서 아래 명령을 실행한 뒤 <http://localhost:8000>에 접속합니다.

```sh
python3 -m http.server 8000
```

카카오맵은 외부 스크립트와 데이터를 불러오므로 인터넷 연결이 필요합니다. `index.html`을 직접 여는 대신 로컬 서버로 실행하세요.

## 파일 구조

```text
.
├── index.html                 # 페이지 내용, 내비게이션, 인라인 아이콘
├── assets/
│   ├── css/style.css           # 레이아웃, 반응형 스타일, 모션
│   ├── js/main.js             # 탭, FAQ, 메뉴, 스크롤, 갤러리
│   ├── js/kakao-map.js        # 카카오맵 퍼가기 초기화
│   ├── art/                   # 히어로 배경 및 갤러리 작품 10장
│   ├── brands/                # 네이버·인스타그램 로고
│   └── logo-*.png             # 학원 로고
├── favicon*                   # 브라우저 아이콘
├── apple-touch-icon.png       # 모바일 홈 화면 아이콘
└── docs/                      # 이미지 제작 기록, 브랜드 출처, 아이콘 라이선스
```

## GitHub 업로드

이 폴더의 **내용 전체**를 저장소 루트에 올리세요. `.gitignore`, `.gitattributes`, `.editorconfig`, `.nojekyll`도 포함합니다. 기존 Sites 배포용 Git 기록과 `.openai` 설정은 이 폴더에 포함되어 있지 않습니다.

```sh
git init
git add .
git commit -m "Add Greensum Hwamyeong website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

`YOUR_GITHUB_REPOSITORY_URL`을 생성한 저장소 주소로 바꾸세요.

## GitHub Pages

저장소 **Settings → Pages → Deploy from a branch**에서 `main` 브랜치와 `/ (root)`를 선택합니다. 모든 로컬 리소스 경로를 상대 경로로 두어 저장소 이름이 붙는 Pages 주소에서도 사용할 수 있습니다.

## 수정 위치

- 소개 문구·연락처·블로그·인스타그램 주소: `index.html`
- 교육과정 데이터: `assets/js/main.js`의 `courses`
- 색상·크기·반응형 스타일: `assets/css/style.css`
- 갤러리 이미지: `assets/art/` 및 `index.html`의 두 갤러리 목록
- 카카오맵: `assets/js/kakao-map.js`와 `index.html`의 지도 컨테이너

갤러리의 두 번째 이미지 목록은 무한 이동을 위한 복제본입니다. 작품을 바꾸면 원본 목록과 복제 목록을 함께 수정하세요.

## 외부 리소스와 제작 기록

- 카카오맵은 제공받은 공개 퍼가기 코드로 표시합니다. 퍼가기 키는 서버 비밀 API 키가 아닙니다.
- 학원 로고와 파비콘은 제공된 이미지입니다.
- 히어로·갤러리 이미지는 생성한 예시 이미지이며 프롬프트는 [제작 기록](docs/ARTWORK-PROMPTS.md)에 있습니다.
- 네이버·인스타그램 로고 출처: [브랜드 출처](docs/BRAND-SOURCES.md)
- 인라인 아이콘 출처 및 라이선스: [Lucide 라이선스](docs/licenses/LUCIDE-LICENSE.txt)

## 검증

정리 범위와 실제 수행한 검사는 [검증 기록](docs/VALIDATION.md)에 있습니다.
