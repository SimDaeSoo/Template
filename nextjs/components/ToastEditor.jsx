import React from 'react';
import { Editor } from '@toast-ui/react-editor';

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
                // hooks={{
                //     addImageBlobHook: (blob, callback) => {
                //     }
                // }}
            />
        )
    }
}

export default ToastEditor;