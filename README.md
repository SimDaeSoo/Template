# Template
- Last Updated : 2020.07.23  
Default template of creating basic web service.  
(if you wanna use socket server than please checking dependencies version your self)  
-----

## Dependecies Version
- Docker Compose (v3.8)  
- Base Node.js Image (LTS v12.x.x)
- Next.js (v9.4.4)  
(Update when 0.0.1 version update)  
- Strapi (v3.1.0)  
(Update when 0.1.0 version update)  

## Service Port Info
- 80 Port - NginX Server  
- 1337 Port - StrAPI Server  
- 3000 Port - Next.js Server  
- 3030 Port - Socket Server
- 3306 Port - MySQL Server  

## How To Run
### Mac OSX & Linux
```shell
# just typping docker-compose up! then service be running
$ docker-compose up
```  

### Windows
```shell
# please change shell file type 'CRLF' to 'LF'
# show this - https://blog.thecraftingstrider.net/posts/tech/2019.09/vscode-line-endings-and-bash-script/ 
$ docker-compose up
```

## Development Documents
- Docker - <https://www.docker.com/>  
- NginX - <https://www.nginx.com/>  
- StrAPI - <https://strapi.io/>  
- Next.js - <https://nextjs.org/>  
