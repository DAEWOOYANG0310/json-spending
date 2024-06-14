# 프로젝트 소개

### 프로젝트

- 프로젝트 명 : 씀씀이
- 소개
  - 한 줄 정리 : 가계부 처럼 자신이 쓴 지출 내역을 저장하는 사이트
  - 내용 :
  - 로그인,회원가입을 해야 페이지를 들어올 수 있다.
  - 지출내역을 저장할수있다

#### 개발기간

24.06.10~ 24.06.14

#### 개발환경

- React
- json-server
- tanstack-query
- axios

  <br>

## 개발자

| 개발자 | GITHUB                            |
| ------ | --------------------------------- |
| 양대우 | https://github.com/DAEWOOYANG0310 |

<br>

## ✅ 필수구현사항

- [✅] 지출 관리 시스템에 회원가입 / 로그인 기능 구현
  - 반드시, 강의에서 제공하는 jwt 인증서버를 사용하도록 합니다.
  - 인증이 되지 않는다면 서비스를 이용 할 수 없도록 해주세요.
- [✅] json-server 를 이용해 지출 데이터에 대한 CRUD 를 구현해 주세요.
  - 지출 데이터에 누가 해당 지출을 생성 했는지가 포함시켜 봅시다.
- [✅] API 호출 시, fetch 대신 axios 를 필수적으로 사용하도록 합니다.
- [✅] 지출데이터 관련 API 통신 시 response 를 페이지에서 바로 사용하지 않도록 합니다. 꼭 Tanstack Query (ReactQuery) 를 이용해서 다뤄주세요.
  - 지출데이터의 상태 관리는 Props-drilling, Context API, Redux 사용대신 Tanstack Query 를 사용해야 합니다.
  - 로그인, 회원가입 등 인증/인가 에 사용되는 API 는 자유로운 방식 구현하셔도 무방합니다.

<br>

## Github Rules

| 작업 타입   | 작업내용                       |
| ----------- | ------------------------------ |
| ✨ update   | 해당 파일에 새로운 기능이 생김 |
| 🎉 add      | 없던 파일을 생성함, 초기 세팅  |
| 🐛 bugfix   | 버그 수정                      |
| ♻️ refactor | 코드 리팩토링                  |
| 🩹 fix      | 코드 수정                      |
| 🚚 move     | 파일 옮김/정리                 |
| 🔥 del      | 기능/파일을 삭제               |
| 🍻 test     | 테스트 코드를 작성             |
| 💄 style    | css                            |
| 🙈 gitfix   | gitignore 수정                 |
| 🔨script    | package.json 변경(npm 설치 등) |

<br>

### 주요 기능 소개

#### 1. 회원가입/로그인

<img src= "https://github.com/DAEWOOYANG0310/json-spending-project/assets/161686758/6909cccd-8a65-4bfe-84f1-f7c07a3d1270" width="680" height="350">

#### 2. 홈페이지/네비게이션바

<img src= "https://github.com/DAEWOOYANG0310/json-spending-project/assets/161686758/6f0df2a8-7411-46a7-873f-cbf4563b578b" width="680" height="350">

#### 3. 상세페이지/수정,삭제,뒤로가기

<img src= "https://github.com/DAEWOOYANG0310/json-spending-project/assets/161686758/98610058-9d43-47d8-90c2-6ab5e2100085" width="680" height="350">
