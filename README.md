# 3-my_favorite_photo-2team-be

Codeit FS3기 중급 프로젝트 "최애의포토"

## 시작하기 전 세팅 및 npm cli

  ## env 설정

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
    자유롭게 설정 <br />

    ```javascript
    JWT_SECRET={"full_stack_2team"}
    ```

  - $\color{#96F2D7}\ ORIGIN$ <br />
    front_end 주소를 적어주세요. <br />

    ```javascript
    ORIGIN = "http://localhost:3000";
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
    ```bash
    npm run studio
    ```

  ## Mock Data

  - $\color{#96F2D7}\ 데이터 입력$ <br />
    ```bash
    npm run seed
    ```
