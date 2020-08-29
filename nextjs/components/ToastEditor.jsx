import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

class ToastEditor extends React.Component {
    render() {
        return (
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
        )
    }
}

export default ToastEditor;