### workbench 사용

- **회원 테이블 생성**
  ![회원 테이블 생성](./img/회원%20테이블%20생성.png)
- **회원 테이블 데이터 추가**
  ![회원 테이블 데이터 추가](./img/회원%20테이블%20데이터%20추가.png)
- **채널 테이블 생성**
  ![채널 테이블 생성](./img/채널%20테이블%20외래키%20설정.png)
  채널 테이블의 경우 외래키 설정을 해줘야 한다.
  ![채널 테이블 생성](./img/채널%20테이블%20생성.png)
- **채널 테이블 데이터 추가**
  ![채널 테이블 데이터 추가](./img/회원%20테이블%20데이터%20추가.png)

### node.js와 mariaDB 연결 중 발생한 오류 해결

node.js와 DB를 연결하기 위해 `npm i mysql2`를 이용해 설치를 한 후 테스트를 위해 docs의 Quickstart에 있는 코드를 그대로 가져와서 다음과 같이 수정하여 실행하였더니 `console.log()`에 `undefined`가 출력 되었다.

```js
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// A simple SELECT query
connection.query('SELECT * FROM users', (err, results, fields) => {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});
```

원인을 확인하기 위해 `console.log(err)`를 해보니 다음과 같은 에러 메시지가 나타났다.<br>
`Error: Access denied for user 'root'@'localhost' (using password: YES)`<br>
해결방법을 찾기 위해 mariaDB도 다시 설치해보고 권한도 확인해 보고 했지만 해결하지 못했다.<br>
혹시 포트 번호가 문제인가라는 생각이들어 port를 추가해 줬더니 정상적으로 연결되었다.<br>
mariaDB를 설치할때 기존에 mysql이 설치되어 있어서 포트 충돌이 발생하여 포트번호를 변경 했기 때문에 발생한 문제로 생각된다.(아마도..?)

```js
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
});
```

![오류 해결](./img/오류%20해결.png)

### 회원 테이블에 created_at 컬럼을 추가하기

![created_at 추가](./img/회원%20테이블%20created_at%20추가.png)
![created_at 추가](./img/회원%20테이블%20created_at%20확인.png)
⬇ 타임존 변경하기

```sql
SET GLOBAL time_zone = 'Asia/Seoul';
SET time_zone = 'Asia/Seoul';
SELECT @@global.time_zone, @@session.time_zone;
```

![타임존 확인](./img/타임존%20확인.png)
![회원 테이블 변경 확인](./img/타임존%20변경%20후%20확인.png)

node에서는 `createConnection`에 `dateStrings: true`를 추가해주니 정상적으로 변경된 것이 확인되었다.

![node.js 확인](./img/node.js%20확인.png)

찾아보니 일반적으로 UTC 시간대에 날짜와 시간을 저장하고 표시할 사용자 시간대로 변환해주는 형태로 쓴다고 한다.

### 심심해서 해본 users.js에서 mariaDB 사용 결과

![users 테스트](./img/users%20test.png)
