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
  dev 환경에선 자유롭게 설정,추후 논의 <br />

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

## 폴더 구조

### prisma

- prisma 스키마 작성 하는 부분

### mock

- mock data를 가지고 있는 곳

### config

- config.js에 설정 값들을 작성 하는 곳

### app

1. $\color{#96F2D7}\ middlewares$ <br />
   express 미들웨어 코드
2. $\color{#96F2D7}\ repositories$ <br />
   databse와 상호작용 코드
3. $\color{#96F2D7}\ routes$ <br />
   express router 코드 <br />
   routes tree
   <br />
   <img width="188" alt="image" src="https://github.com/user-attachments/assets/e29c2246-65ba-4bca-91b7-961994dc7e73" />
   <br />
   <br />
   $\color{#96F2D7}\ controller.js$

   ```javascript
   import express from "express";
   import service from "./service.js";
   import { httpState } from "../../../config/config.js";

   const users = express.Router();
   users.get("/data", async (req, res) => {
     const { email } = req.user;
     const user = await service.getUser({ email });

     res.status(httpState.success).json({ ...user });
   });
   ```

   $\color{#96F2D7}\ service.js$

   ```javascript
   async function getUser({ email }) {
     try {
       const findUser = await userRepo.findByEmail(email);
       return userRepo.userDataFilter(findUser);
     } catch (err) {
       console.error(err);
     }
   }
   const service = { getUser };
   export default service;
   ```

4. $\color{#96F2D7}\ utils$ <br/>
   모듈화된 코드
   예시
   ```javascript
   import { PrismaClient } from "@prisma/client";
   const prisma = new PrismaClient();
   export default prisma;
   ```
