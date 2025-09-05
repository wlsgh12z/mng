# 프로젝트/패키지 설치
mkdir mng
cd mng
# package.json 생성
npm init -y
# package.json type 셋팅
npm pkg set type="module"

# 런타임 의존성
npm i react react-dom react-router @react-router/node @react-router/serve isbot

# 개발 의존성
npm i -D vite @react-router/dev

# Vite 설정 (플러그인 교체)
vite.config.js

# npm 스크립트
package.json에 추가
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "react-router-serve build/server/index.js"
  }
}

# 실행
# 개발(HMR)
npm run dev
# 프로덕션 빌드
npm run build
# SSR 서버 실행
npm run start

# 추가
1) 시작
./view/index.jsx
./css/
./features/login/components/page.jsx

2) 데이터 추가( postgres 대신 )
./doc/table/tbl_admin.sql
./doc/table/tbl_adminmenu.sql
./doc/table/tbl_mngmenu.sql
./doc/tbl_admin.yaml
./doc/tbl_adminmenu.yaml
./doc/tbl_mngmenu.yaml
./doc/yamlGuide.txt

3) 로그인 기능 추가
./api/login.js
./lib/yamlDb.js
ex) ./features/login/components/page.jsx (onsubmit) -> ./api/login.js -> ./lib/yamlDb.js -> ./view/main.jsx

4) 기능 모우기 시작
./utils/cookies.js
./utils/crypto-lite.js
./utils/datetime.js
./utils/mask.js
./utils/response.js
./utils/validators.js
./utils/yaml.js

5) 로그인 후 페이지
./view/main.jsx
ex) main.jsx 안에 ./features/left/components/page.jsx(좌측 메뉴), ./features/right/components/page.jsx(선택 한 메뉴 페이지),

6) 로그인 토큰 추가
./utils/grpc.js
./utils/http.js