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
- 감정 선택은 클릭과 키보드 방향키로 조작할 수 있습니다.
- 향 노트는 브라우저에서 UTF-8 텍스트 파일로 만듭니다. 내용은 서버로 전송하거나 저장하지 않습니다.
- 판매, 가격 안내, 장바구니, 주문, 결제 및 유료 예약 기능은 포함하지 않습니다.
- 사업장 주소·운영 시간·인증·효능·고객 후기 등 제공되지 않은 정보는 추가하지 않았습니다.

## 브랜드 자료

- 로고: 사용자가 첨부한 PDF에서 원본 이미지와 마스크를 추출한 `public/images/smeem-monogram.png`.
- 문의: 첨부 PDF의 공식 계정 `https://www.instagram.com/official_smeem/`.
- 메인 이미지: 스밈의 분위기를 표현하기 위해 생성한 연출 이미지입니다. 실제 공간이나 판매 제품의 사진을 뜻하지 않습니다.
- 글꼴은 npm 패키지로 함께 제공하므로 외부 폰트 서비스 요청 없이 동작합니다. 해당 패키지의 OFL 라이선스가 적용됩니다.

주요 화면과 문구는 `src/App.tsx`, 스타일은 `src/styles.css`, 검색엔진 메타데이터는 `index.html`에서 관리합니다.

## 인터넷 공개 배포

GitHub Pages용 빌드는 저장소 경로 `/SMEEM/`에 맞춰 이미지·아이콘·글꼴 주소를 생성합니다.

```sh
npm run build:pages
npm run preview -- --base=/SMEEM/
```

공개 주소는 https://answlsn1.github.io/SMEEM/ 입니다.

- `site-source` 브랜치에 편집 가능한 React 소스를 보관합니다.
- `main` 브랜치에는 `npm run build:pages`로 만든 `dist/`의 내용과 `.nojekyll`을 보관합니다. GitHub Pages는 현재 `main`의 루트에서 배포합니다.
- 수정 후에는 빌드를 확인하고 소스를 `site-source`에 푸시한 다음, 별도 `main` 작업 트리에 빌드 결과를 반영해 푸시합니다. 공개 페이지와 주요 자산이 새 버전으로 제공되는지 확인해야 배포가 완료됩니다.

`.github/workflows/deploy-pages.yml`은 향후 GitHub Actions 방식으로 전환할 때 사용할 설정이며, 현재 배포에는 사용하지 않습니다. 전환하려면 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경하고, 소스가 있는 배포 브랜치에 맞춰 워크플로의 `push.branches`를 수정해야 합니다.

일반 도메인의 루트에 배포할 때는 기존 `npm run build`를 사용합니다. 정적 파일은 모두 `dist/`에 생성됩니다. 배포에는 판매·결제 기능이나 별도 데이터 수집 서버가 추가되지 않습니다.
