# 3-my_favorite_photo-2team-be

Codeit FS3기 중급 프로젝트 "최애의포토"

## env 설정

>  $\color{#5ab7b7}{}\ 값을\ 수정해주세요$

- DATABASE_URL
  본인 DATABASE에 맞춰서 설정해주시면 됩니다. <br />
  `DATABASE_URL="postgresql://{PostgreID}:{PostgrePW}@localhost:5432/{DB_NAME}"`

- PORT
  자유롭게 설정 <br />
  `PORT=0000`

- JWT_SECRET
  자유롭게 설정 <br />
  `JWT_SECRET={"full_stack_2team"}`

## Prettier 설정

> .prettierrc 파일 수정 해주세요.

- prettier 실행 <br />
  `npm run prettier`

- prettier 체크 <br />
  `npm run prettier-check`

  ## Prisma

  - migrate
    `npm run prisma`

  - studio
    `npm run studio`

## Mock Data

- 데이터 입력 <br />
  `npm run seed`
