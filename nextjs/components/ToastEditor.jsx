import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
const text = `
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

`;
class ToastEditor extends React.Component {
    render() {
        return (
            <div style={EditorStyle}>
                <Editor
                    initialValue={text}
                    previewStyle="vertical"
                    width='100%'
                    height='100%'
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    usageStatistics={false}
                    previewHighlight={false}
                    plugins={[[codeSyntaxHighlight, { hljs }], colorSyntaxPlugin]}
                // hooks={{
                //     addImageBlobHook: (blob, callback) => {
                //     }
                // }}
                />
                <div style={ButtonStyle}>
                    <Button type="primary" icon={<SaveOutlined />} loading={true}>
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}

const EditorStyle = {
    width: '100%',
    height: '100%',
    position: 'relative'
};

const ButtonStyle = {
    position: 'absolute',
    bottom: '32px',
    right: '12px'
};

export default ToastEditor;