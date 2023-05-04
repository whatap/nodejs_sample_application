[![WhaTap Logo](https://www.whatap.io/img/common/whatap_logo_re.svg)](https://www.whatap.io/)
# WhaTap for nodejs


# 환경 : nodejs / docker

Docker 환경에서 Sample Application에 간편하게 와탭 NodeJS 모니터링 Agent 설치후 실행하실 수 있습니다.


NodeJS Agent 샘플 구성 : NodeJS 샘플 어플리케이션 + Docker + whatap apm

# 디렉토리 구성

```
simple_http
- Dockerfile # 도커 이미지 빌드용
- http.js  # 샘플 어플리케이션
- package.json # dependency
- whatap.conf # 모니터링 옵션 설정
- paramkey.txt # 파라미터 암호화 키
```

## 1. whatap 설치
package.json 에 와탭 NodeJS 에이전트를 추가할 수 있습니다.
```
"dependencies": {
    "whatap": "^0.4.72"
  }
```
혹은 
```
npm install --save whatap
```

# 컨테이너 이미지 빌드

## Dockerfile
```
FROM node:latest

WORKDIR /app
ADD . .

RUN npm install

CMD ["node","http.js"]
```
## 2. 빌드

```
$ docker build -t sampleapp/nodejs:0503 .
```
## 3. 실행
환경변수에 수집서버 ip및 액세스키를 지정하여 컨테이너를 시작하면
와탭 NODEJS APM에이전트가 탑재된 상태로 어플리케이션이 작동합니다. 

```
export WHATAP_LICENSE={와탭 액세스키}
export WHATAP_SERVER_HOST={와탭 수집서버 아이피}

$ docker run --rm -p 3500:3500 \
    -e whatap_server_host=$WHATAP_SERVER_HOST \
    -e license=$WHATAP_LICENSE \
    sampleapp/nodejs:0503
```
