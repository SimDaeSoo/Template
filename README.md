# Template
기초적인 서비스를 만들어 보기 위한 Template 이다.

80 Port : NginX로 웹서버를 구성 상황에 맞춰서 Front / Back에 요청 변환 해준다.  
1337 Port : StrAPI Back-End Server로 / Admin Page, Model 관리 등을 한다.  
3000 Port : Next.js Front-End Server로 / 사용자가 사용하게 될 서버.  
27017 Port : MongoDB  

위와 같이 총 4개의 서비스를 한번에 돌릴 수 있도록 Docker가 구성되어 있다.  

```shell
# service running
$ docker-compose up
```
