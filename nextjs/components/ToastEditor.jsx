import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

class ToastEditor extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Editor
                    initialValue=""
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
                <div style={{ position: 'absolute', bottom: '32px', right: '12px' }}>
                    <Button type="primary" icon={<SaveOutlined />}>
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}

export default ToastEditor;