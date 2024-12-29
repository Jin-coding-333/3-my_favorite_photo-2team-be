# 3-my_favorite_photo-2team-be

Codeit FS3기 중급 프로젝트 "최애의포토"

## 초기설정 및 npm cli

### env 설정

- $\color{#96F2D7}\ DATABASE\ URL$ <br />
  본인 DATABASE에 맞춰서 설정해주시면 됩니다. <br />

  ```javascript
  DATABASE_URL =
    "postgresql://{PostgreID}:{PostgrePW}@localhost:5432/{DB_NAME}";
  ```

- $\color{#96F2D7}\ PORT$ <br />
  자유롭게 설정 <br />

  ```javascript
  PORT = 8000;
  ```

- $\color{#96F2D7}\ JWT\ SECRET$ <br />
  dev 환경에선 자유롭게 설정, 추후 논의 <br />

  ```javascript
  JWT_SECRET = "full_stack_2team";
  ```

- $\color{#96F2D7}\ ORIGIN$ <br />
  front_end 주소를 적어주세요. <br />

  ```javascript
  ORIGIN = "http://localhost:3000";
  ```

### Prettier 설정

> .prettierrc 파일 수정 해주세요.

- $\color{#96F2D7}\ prettier 실행$ <br />

  ```bash
  npm run prettier
  ```

- $\color{#96F2D7}\ prettier 체크$ <br />

  ```bash
  npm run prettier-check
  ```

### Prisma

- $\color{#96F2D7}\ migrate$ <br />

  ```bash
  npm run prisma
  ```

- $\color{#96F2D7}\ studio$ <br />
  ```bash
  npm run studio
  ```

### Mock Data

- $\color{#96F2D7}\ 데이터 입력$ <br />
  ```bash
  npm run seed
  ```

## 구조

### prisma

prisma 스키마 작성 하는 부분

### mock

mock data를 가지고 있는 곳

### config

config.js에 설정 값들을 작성 하는 곳

### app

1. middlewares <br />
   express 미들웨어 코드
2. repositories <br />
   databse와 상호작용 코드
3. routes <br />
   express router 코드
4. utils <br/>
   모듈화된 코드
