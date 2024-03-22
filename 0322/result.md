## youtube project 실행 결과

### GET /users/:id

- 회원 개별 조회
  ![message](./img/사용자%20개별%20조회.png)
- 일치하는 회원 없음
  ![message](./img/일치하는%20회원%20없음.png)

### POST /join

- 회원 가입
  ![message](./img/회원%20가입.png)
- 중복 회원 가입
  ![message](./img/중복%20가입%20확인.png)

### POST /login

- 로그인
  ![message](./img/로그인.png)
- 로그인 아이디 틀림
  ![message](./img/로그인%20아이디%20틀림.png)
- 로그인 비번 틀림
  ![message](./img/로그인%20비번%20틀림.png)
- 로그인 아이디 비번 둘다 틀림
  ![message](./img/로그인%20아이디%20비번%20둘다%20틀림.png)

### DELETE /users/:id

- 회원 탈퇴
  ![message](./img/회원%20탈퇴.png)
- 없는 회원 탈퇴
  ![message](./img/없는%20회원%20탈퇴.png)

## expeption-demo 실행 결과

- 과일 전체 조회
  ![message](./img/exception-demo-get.png)
- id 일치하는 과일 조회
  ![message](./img/exception-demo-get-id.png)
- 존재하지 않는 id 과일 조회
  ![message](./img/exception-demo-get-id-404.png)
