# 스밈 · SMEEM PERFUME STUDIO

“향이 기억에 스미는 시간, 스밈”을 담은 한국어 반응형 브랜드 홈페이지입니다.

## 실행

Node.js 22.12 이상 또는 Node.js 24에서 실행합니다.

```sh
npm ci --cache /tmp/smeem-npm-cache
npm run dev
```

```sh
npm run build
npm run preview
```

빌드는 TypeScript 검사 후 `dist/`에 정적 사이트를 만듭니다. 정적 호스팅에 배포할 수 있으며 서버·데이터베이스·비밀 키는 필요하지 않습니다.

## 구성

- 브랜드 이야기, 향을 만나는 과정, 감정별 향 탐색, 자주 묻는 질문, 인스타그램 문의
- 평온·설렘·위로·그리움·자유·자신감, 여섯 가지 감정에 맞춘 사진과 향의 이야기
- 오늘의 향은 3초 간격으로 넘어가는 슬라이드이며, 이전·다음·재생 제어와 키보드로 직접 선택할 수 있습니다. 향 노트를 열거나 내용을 조작하는 동안에는 자동 전환을 멈춥니다.
- PC 주요 섹션은 헤더를 제외한 화면 높이를 기준으로 구성하고, 작은 화면에서는 콘텐츠 길이에 맞춰 늘어납니다. 메뉴 이동 위치와 화면별 여백은 `src/layout.css`에서 관리합니다.
- 향 노트는 브라우저에서 UTF-8 텍스트 파일로 만듭니다. 내용은 서버로 전송하거나 저장하지 않습니다.
- 판매, 가격 안내, 장바구니, 주문, 결제 및 유료 예약 기능은 포함하지 않습니다.
- 사업장 주소·운영 시간·인증·효능·고객 후기 등 제공되지 않은 정보는 추가하지 않았습니다.

## 브랜드 자료

- 로고: 사용자가 첨부한 PDF에서 원본 이미지와 마스크를 추출한 `public/images/smeem-monogram.png`.
- 문의: 첨부 PDF의 공식 계정 `https://www.instagram.com/official_smeem/`.
- 메인 이미지: 스밈의 분위기를 표현하기 위해 생성한 연출 이미지입니다. 실제 공간이나 판매 제품의 사진을 뜻하지 않습니다.
- 감정별 사진: Pexels 라이선스로 제공되는 사진을 WebP로 최적화해 로컬에서 제공합니다. 작가·원본·라이선스는 `public/licenses/mood-images.md`에 기록했습니다. 향의 분위기를 위한 이미지이며 실제 판매 제품 사진을 뜻하지 않습니다.
- 글꼴은 npm 패키지로 함께 제공하므로 외부 폰트 서비스 요청 없이 동작합니다. 해당 패키지의 OFL 라이선스가 적용됩니다.

주요 화면·문구는 `src/App.tsx`, 감정별 문구·이미지는 `src/moods.ts`, 스타일은 `src/styles.css`, 검색엔진 메타데이터는 `index.html`에서 관리합니다.

향 슬라이드는 `src/ScentCarousel.tsx`와 `src/carousel.css`에서 관리합니다. ‘오늘의 향 카드 뽑기’ 기획은 독립 후속 프로젝트로 보류하고 [`docs/future-projects/daily-scent-cards.md`](docs/future-projects/daily-scent-cards.md)에 정리했습니다.

## 인터넷 공개 배포

공개 주소는 https://smeem-atelier.com 입니다. 도메인은 Porkbun에서 관리하고, 호스팅은 GitHub Pages입니다.

```sh
npm run build
npm run preview
```

- `site-source` 브랜치에 편집 가능한 React 소스를 보관합니다.
- `main` 브랜치에는 `npm run build`로 만든 `dist/`의 내용과 `.nojekyll`을 보관합니다. GitHub Pages는 현재 `main`의 루트에서 배포합니다.
- `public/CNAME`에 적힌 `smeem-atelier.com`이 빌드 결과에 포함되어 GitHub Pages의 커스텀 도메인 설정을 유지합니다. 이 파일을 지우면 커스텀 도메인 연결이 풀립니다.
- 수정 후에는 빌드를 확인하고 소스를 `site-source`에 푸시한 다음, 별도 `main` 작업 트리에 빌드 결과를 반영해 푸시합니다. 공개 페이지와 주요 자산이 새 버전으로 제공되는지 확인해야 배포가 완료됩니다.

### Porkbun DNS 레코드

| 종류 | 호스트 | 값 |
|---|---|---|
| A | (비움, 루트) | 185.199.108.153 |
| A | (비움, 루트) | 185.199.109.153 |
| A | (비움, 루트) | 185.199.110.153 |
| A | (비움, 루트) | 185.199.111.153 |
| CNAME | www | answlsn1.github.io |

`.github/workflows/deploy-pages.yml`은 향후 GitHub Actions 방식으로 전환할 때 사용할 설정이며, 현재 배포에는 사용하지 않습니다. 전환하려면 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경하고, 소스가 있는 배포 브랜치에 맞춰 워크플로의 `push.branches`를 수정해야 합니다.
