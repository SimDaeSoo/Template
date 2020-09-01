import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import DefaultLayout from '../layouts/DefaultLayout';
import Loading from '../components/Loading';
const ArticleEditor = dynamic(() => import('../components/ArticleEditor'), { ssr: false, loading: () => <Loading /> });

const article = {
    id: 1,
    title: '초보를 위한 도커 안내서 - 도커란 무엇인가?',
    description: `미디어 기능은 주어진 사용자 에이전트, 출력 장치, 주변 환경의 특징을 설명합니다.
예를 들어 어떤 스타일을 와이드스크린 모니터에만, 마우스를 사용하는 컴퓨터에만,
저광도 환경에서 사용 중인 장치에서만 적용할 수 있습니다.
다음의 예제는 사용자의 주 입력 방식(마우스 등)이 요소 위에 호버할 수 있으면 스타일을 적용합니다.`,
    category: {
        id: 1,
        title: '알고리즘',
        thumbnail: ''
    },
    created_at: new Date(),
    updated_at: new Date('2020-08-10'),
    thumbnail: 'https://blog.kakaocdn.net/dn/AhDPS/btqxpzYtfVg/lnv3OjEJ1MRyYCw3OyO1CK/img.png',
    content: `
# Template
- Updated : 2020.07.28  
Default template of creating basic web service.  

## Dependecies Version
- Docker Compose (v3.8)  
- Base Node.js Image (LTS v12.x.x)
- Next.js (v9.5.0)  
(Update when 0.1.0 version changed)  
- StrAPI (v3.1.4)  
(Update when 0.1.0 version changed)  

## Service Port Info
- 80 Port - NginX Server  
- 1337 Port - StrAPI Server  
- 3000 Port - Next.js Server  
- 3306 Port - MySQL Server  

## How To Run
### Mac OSX & Linux
\`\`\`shell
# just typping docker-compose up! then service be running
$ docker-compose up
\`\`\`  

### Windows
\`\`\`shell
# please change shell file type 'CRLF' to 'LF'
# show this - https://blog.thecraftingstrider.net/posts/tech/2019.09/vscode-line-endings-and-bash-script/ 
$ docker-compose up
\`\`\`

## Development Documents
- Docker - <https://www.docker.com/>  
- NginX - <https://www.nginx.com/>  
- StrAPI - <https://strapi.io/>  
- Next.js - <https://nextjs.org/>  
    `,
    author: {
        id: 1,
        thumbnail: 'https://lh4.googleusercontent.com/-wJvrImIGWJw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnIeqbblpLA2rG1HIg3VcZzbkiong/photo.jpg',
        username: '심대수(빅딜)',
        email: 'tlaeotn123@naver.com'
    },
    comments: [
        {
            id: 1,
            created_at: new Date(),
            updated_at: new Date('2020-08-10'),
            user: {
                id: 1,
                thumbnail: 'https://lh4.googleusercontent.com/-wJvrImIGWJw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnIeqbblpLA2rG1HIg3VcZzbkiong/photo.jpg',
                username: '심대수(빅딜)',
                email: 'tlaeotn123@naver.com'
            },
            content: `We supply a series of design principles, practical patterns and high quality design
resources (Sketch and Axure), to help people create their product prototypes beautifully`,
            comments: [
                {
                    id: 2,
                    created_at: new Date(),
                    updated_at: new Date('2020-08-10'),
                    user: {
                        id: 1,
                        thumbnail: 'https://lh4.googleusercontent.com/-wJvrImIGWJw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnIeqbblpLA2rG1HIg3VcZzbkiong/photo.jpg',
                        username: '심대수(빅딜)',
                        email: 'tlaeotn123@gmail.com'
                    },
                    content: `TestTest`,
                    comments: [
                        {
                            id: 3,
                            created_at: new Date(),
                            updated_at: new Date('2020-08-10'),
                            user: {
                                id: 2,
                                thumbnail: 'https://lh4.googleusercontent.com/-wJvrImIGWJw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnIeqbblpLA2rG1HIg3VcZzbkiong/photo.jpg',
                                username: '심대수(빅딜)',
                                email: 'tlaeotn123@gmail.com'
                            },
                            content: `TestTest`,
                            comments: []
                        }
                    ]
                }
            ]
        }
    ]
}

@inject('environment', 'auth')
@observer
class Home extends HydrateComponent {
    render() {
        return (
            <DefaultLayout>
                <div style={ArticleEditorStyle}>
                    <ArticleEditor article={article} />
                </div>
            </DefaultLayout>
        );
    }
}

const ArticleEditorStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto'
};

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);