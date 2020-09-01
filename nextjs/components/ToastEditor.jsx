import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Editor } from '@toast-ui/react-editor';
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

@inject('environment')
@observer
class ToastEditor extends React.Component {
    constructor(props) {
        super(props);

        const { article } = this.props;
        this.state = {
            article: (article || {
                title: '',
                category: {},
                created_at: new Date(),
                thumbnail: '',
                content: ``,
                author: {},
                comments: []
            }),
            loading: false
        };
        this.editorRef = React.createRef();
    }

    save = async () => {
        const { onSave } = this.props;
        const editor = this.editorRef.current.getInstance();
        const content = editor.getMarkdown();

        this.setState({ loading: true });
        await onSave(content);
        this.setState({ loading: false });
    }

    render() {
        const { i18n, environment, onUpload, article } = this.props;
        const { loading } = this.state;

        return (
            <div style={EditorStyle}>
                <Editor
                    ref={this.editorRef}
                    initialValue={article.content}
                    previewStyle="vertical"
                    width='100%'
                    height='100%'
                    initialEditType={environment.size === 'small' ? "wysiwyg" : 'markdown'}
                    useCommandShortcut={true}
                    usageStatistics={false}
                    previewHighlight={false}
                    plugins={[[codeSyntaxHighlight, { hljs }], colorSyntaxPlugin]}
                    hooks={{ addImageBlobHook: onUpload }}
                />
                <div style={ButtonStyle}>
                    <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={this.save}>
                        {article.id !== undefined && i18n.t('save')}
                        {article.id === undefined && i18n.t('create')}
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

export default withTranslation('ToastEditor')(ToastEditor);