# CodeGarden 코드가든

#### Dev. 김현정, 이예원


## 1. 프로젝트 개요

---

소프트웨어 개발 문화에서 코드 리뷰는 코드 품질 향상, 개발자 역량 강화에 중요한 역할을 한다.

보다 원활하고 체계적인 리뷰 환경을 제공함으로써 개발자들이 서로의 코드를 쉽게 공유하고 리뷰할 수 있도록 돕기 위해 코드 리뷰 커뮤니티를 기획하였다.

### 주요기능

   - 로그인 및 회원가입
        
        이메일 인증 방식으로 구현하여 안전하고 편리한 사용자 인증을 제공한다
        
   - 코드 공유 및 리뷰
        
        개발자들이 자신의 코드를 업로드하고, 다른 개발자들로부터 즉각적인 피드백을 받을 수 있다
        
   - 채팅 시스템
        
        리뷰어와 코드 작성자 간의 실시간 소통을 통해 심도 있는 리뷰가 가능하다
        
   - 프로필 수정 및 피드 관리
        
        마이페이지에서 자신의 정보를 수정하고 피드를 관리 할 수 있다
        
   - 사용자 맞춤형 알림
        
        새로운 리뷰 요청이나 댓글이 도착하면 즉시 알림을 받을 수 있다
        
###### 본 프로젝트는 위의 기능들을 구현함으로써 개발자들이 효율적으로 코드 리뷰를 수행할 수 있는 웹 플랫폼 '코드가든'을 개발하는 것을 목표로 한다.


## 2. 기술 스택 + SW아키텍처

---

### 2.1 프론트엔드

- React
  
- HTML/CSS/JavaScript

### 2.2 데이터베이스

- Firebase

### 2.3 시스템 설계 방식

![코드가든 최종 발표 (1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/caed6fc0-4a8b-4c3a-8cda-28fb456c4321/%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%E1%84%80%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AB_%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC_%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%AD_(1).png)



## 3. 요구사항

---

### 3.1 사용자 인증

- 사용자는 이메일과 비밀번호로 로그인 및 회원가입을 할 수 있어야 한다.

### 3.2 피드 기능

- 사용자는 코드를 업로드하고, 해당 코드에 대해 리뷰를 요청할 수 있어야 한다.

- 사용자는 다른 사용자가 업로드한 코드에 대해 코멘트를 남길 수 있어야 한다.

- 사용자는 피드 및 리뷰에 대한 알림을 받을 수 있어야 한다.

- 사용자는 모든 피드를 조회할 수 있어야 한다.

### 3.3 리뷰 기능

- 사용자는 자신이 요청한 리뷰에 대해 피드백을 받을 수 있어야 한다.

### 3.4 채팅 기능

- 사용자는 리뷰어 또는 리뷰 요청자와 실시간으로 채팅을 할 수 있어야 한다.

- 사용자는 채팅을 통해 코드에 대한 추가적인 피드백을 받을 수 있어야 한다.

### 3.5 마이페이지 기능

- 사용자는 마이페이지에서 본인의 프로필(기술 스택, 개발 분야, 소개글)을 수정할 수 있어야 한다.

- 사용자는 마이페이지에서 자신이 작성한 피드를 조회하고 삭제할 수 있어야 한다.

- 사용자는 자신의 피드를 통해 다른 사용자에게 리뷰를 요청할 수 있어야 한다.

### 3.6 검색 기능

- 사용자는 마이페이지에서 본인의 프로필(기술 스택, 개발 분야, 소개글)을 수정할 수 있어야 한다.

- 사용자는 마이페이지에서 자신이 작성한 피드를 조회하고 삭제할 수 있어야 한다.

- 사용자는 자신의 피드를 통해 다른 사용자에게 리뷰를 요청할 수 있어야 한다.

### 3.7 알림 기능

- 사용자는 특정 키워드로 피드나 사용자를 검색할 수 있어야 한다.



## 4. 화면 설계

---

### 4.1  UI 디자인 - Figma

![스크린샷 2024-10-01 오전 10.37.07.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/1b2d0fc0-4258-433a-978c-2c190dc546bd/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-01_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.37.07.png)

### 4.2  화면 흐름도

![코드가든 최종 발표 (7).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/45180e67-3356-4359-98cb-d70b0ea7de8e/86b7a228-bd29-40cc-8aa5-5139e06eb8e2.png)

## 5. 데이터베이스 구조

---

- Firebase의 데이터베이스는 JSON 객체로 저장되는 NoSQL 데이터베이스
- ERD와 비슷한 형식으로 다이어그램을 그려서 데이터 구조를 시각화하였음

### 5.1  ER다이어그램

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/6f95e2c9-c7c3-4f4a-afe9-c4c6ceafcd12/image.png)

### 5.2 JSON 구조

- 실제 Firebase에 저장된 JSON 데이터

```json
"users": {
    "{userId}": {
      "developmentField": "{개발 분야}",
      "introduce": "{사용자 소개}",
      "nickname": "{닉네임}",
      "profileImg": "{프로필 이미지 URL}",
      "techStacks": [
        {
          "color": "{기술 스택 색상 코드}",
          "name": "{기술 스택 이름}"
        }
      ]
    }
  },
  "feeds": {
    "{feedId}": {
      "authorUid": "{유저ID}",
      "content": "{피드 내용}",
      "createdAt": "{피드 작성 시간}",
      "imageUrl": "{이미지 URL}",
      "language": "{프로그래밍 언어}",
      "title": "{피드 제목}"
      "comments": {
	      "{commentId}": {
		      "createdAt": "{리뷰 작성 시간}",
		      "nickname": "{리뷰 작성자 닉네임}",
		      "profileImg": "{리뷰 작성자 프로필 이미지}",
		      "text": "{리뷰 내용}",
		      "userId": "{리뷰 작성자ID}"
		    }
		  }
	  }
  },
  "notifications": {
    "{userId}": {
      "feedReview": {
        "{notificationId}": {
          "contents": "{알림 내용}",
          "feedId": "{피드ID}"
        }
      },
      "reviewReq": {
        "{notificationId}": {
          "chatRoomId": "{채팅방ID}",
          "contents": "{알림 내용}"
        }
      }
    }
  },
  "chatrooms": {
    "{chatroomId}": {
      "createdAt": {채팅방 생성 시간},
      "lastMessage": "",
      "users": {
        "{userId1}": true,
        "{userId2}": true
      },
      "messages": {
        "{timestamp}": {
          "image": "{메시지 이미지}",
          "senderId": "{유저ID}",
          "text": "{메시지 텍스트}",
          "timestamp": {메시지 생성 시간}
        }
      }
    }
  }
```

## 6. 주요 구현 사항

---

### 6.1 회원가입 / 로그인

- Firebase Authentication
  
    - 이메일 인증을 통한 회원가입
   
    - 인증된 이메일로 로그인

### 6.2 피드 작성 및 조회

- 마크 다운 문법을 사용한 코드 작성

- 이미지 업로드

- React 라이브러리 ( react-markdown, rehype-highlight )
    - 마크 다운으로 작성된 코드
    
    - 언어별 하이라이트 스타일 적용
    
    - 코드 블록 형식으로 조회

### 6.3 채팅

- **Firebase SDK**
    
    - 실시간 데이터 통신

- **Firebase set() 메서드**
    
    - 메세지를 채팅방 데이터에 추가

- **Firebase onValue() 메서드**
    
    - Firebase Realtime Database의 데이터를 실시간으로 수신
    
    - 변경이 발생할 때마다 메시지 목록을 갱신

## 7. 성과 및 향후 계획

---

### 7.1 주요 성과

- **로그인 및 회원가입 기능 구현**
    
    - Firebase를 활용한 이메일 인증 기반 로그인 및 회원가입 기능을 성공적으로 구현하여 안전하고 편리한 사용자 인증을 제공.

- **코드 공유 및 리뷰 시스템 개발**
    
    - 사용자가 자신의 코드를 업로드하고, 리뷰 요청을 할 수 있는 시스템 완성
    
    - 다른 개발자로부터 즉각적인 피드백을 받을 수 있는 기능을 제공

- **실시간 채팅 기능 구현**
    
    - Firebase 실시간 데이터베이스를 활용하여 리뷰어와 코드 작성자가 실시간으로 소통할 수 있는 채팅 시스템을 구현

- **프로필 수정 및 피드 관리 기능 완성**
    
    - 사용자 마이페이지에서 프로필 정보를 수정하고, 자신이 작성한 피드를 관리할 수 있는 기능을 구현

- **알림 시스템 구축**
    
    - 새로운 리뷰 요청이나 댓글이 도착했을 때 사용자에게 실시간으로 알림을 제공하는 맞춤형 알림 기능을 성공적으로 구현

- **프론트엔드와 Firebase 연동**
    
    - React를 이용하여 프론트엔드에서 Firebase와 연결하여 데이터베이스, 인증, 알림, 실시간 채팅 등의 백엔드 기능을 구현하여 원활한 사용자 경험을 제공

## 8. 실행화면

---

로그인

![로그인.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/1099ae2e-77a1-4266-bd4e-3b13d7c01382/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png)

회원가입

![회원가입.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/6b41c85a-9fea-4b71-bbf1-7130c977c61c/%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8.png)

메인

![메인화면.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/d565bb99-3e09-4b74-bae9-abd84d211c8b/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png)

댓글

![댓글.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/d39c5b9f-b93d-4e43-9c1a-294aec304716/%E1%84%83%E1%85%A2%E1%86%BA%E1%84%80%E1%85%B3%E1%86%AF.png)

채팅방 & 목록

![채팅방 & 목록.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/a2b20d33-bf19-4720-b63e-81b17a27fcfe/%E1%84%8E%E1%85%A2%E1%84%90%E1%85%B5%E1%86%BC%E1%84%87%E1%85%A1%E1%86%BC__%E1%84%86%E1%85%A9%E1%86%A8%E1%84%85%E1%85%A9%E1%86%A8.png)

내 피드

![내 피드 조회.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/0bd181a9-41ec-4134-8f4e-fe1ec6e9b830/%E1%84%82%E1%85%A2_%E1%84%91%E1%85%B5%E1%84%83%E1%85%B3_%E1%84%8C%E1%85%A9%E1%84%92%E1%85%AC.png)

유저 프로필

![유저 프로필.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/2dd844a2-bb62-440f-aa92-f19331892194/%E1%84%8B%E1%85%B2%E1%84%8C%E1%85%A5_%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.png)

프로필 수정

![내 프로필 수정.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/f4751de9-3e37-43bd-9c29-595bb2658e2f/%E1%84%82%E1%85%A2_%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC.png)

피드 작성

![피드작성.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/d49cb076-b738-4a55-a70f-64e19a0f588f/%E1%84%91%E1%85%B5%E1%84%83%E1%85%B3%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC.png)

검색

![검색.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/102a1eef-74c2-4a58-a261-a0fd262c0087/f18409d6-59e1-4dad-8ade-548d87faf87d/%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8.png)


## 팀 정보


This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
