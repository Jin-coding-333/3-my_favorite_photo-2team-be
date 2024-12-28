# 3-my_favorite_photo-2team-be

Codeit FS3기 중급 프로젝트 "최애의포토"

## env 설정

- $\color{#96F2D7}\ DATABASEURL$ <br />
  본인 DATABASE에 맞춰서 설정해주시면 됩니다. <br />

  ```env
  DATABASE_URL =
    "postgresql://{PostgreID}:{PostgrePW}@localhost:5432/{DB_NAME}";

  ```

- $\color{#96F2D7}\ PORT$
  자유롭게 설정 <br />

  ```env
  PORT = 0000;

  ```

- $\color{#96F2D7}\ {JWT\_SECRET}$
  자유롭게 설정 <br />
  ```env
  JWT_SECRET={"full_stack_2team"}
  ```

## Prettier 설정

> .prettierrc 파일 수정 해주세요.

- $\color{#96F2D7}\ prettier 실행$ <br />

  ```bash
  npm run prettier
  ```

- $\color{#96F2D7}\ prettier 체크$ <br />

  ```bash
  npm run prettier-check
  ```

## Prisma

- $\color{#96F2D7}\ migrate$ <br />

  ```bash
  npm run prisma

  ```

- $\color{#96F2D7}\ studio$ <br />
  bash
  npm run studio

## Mock Data

- $\color{#96F2D7}\ 데이터 입력$ <br />
  ```bash
  npm run seed
  ```
