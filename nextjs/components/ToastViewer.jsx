import React from 'react';
import { withTranslation } from "react-i18next";
import { Button, Popconfirm } from 'antd';
import { observer, inject } from 'mobx-react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Viewer } from '@toast-ui/react-editor';
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

@inject('auth')
@observer
class ToastViewer extends React.Component {
    delete = async () => {

    }

    render() {
        const { auth, i18n, article } = this.props;

        return (
            <div style={ViewerStyle} className='tui-viewer'>
                <Viewer
                    initialValue={article.content}
                    plugins={[[codeSyntaxHighlight, { hljs }]]}
                />

                {
                    auth.user.id === article.author.id &&
                    <div style={ButtonStyle}>
                        <Button type="primary" style={editButtonStyle} icon={<EditOutlined />} loading={false}>{i18n.t('edit')}</Button>
                        <Popconfirm
                            title={i18n.t('areYouSureDeleteThisArticle')}
                            onConfirm={this.delete}
                            okText={i18n.t('yes')}
                            cancelText={i18n.t('no')}
                        >
                            <Button type="danger" icon={<DeleteOutlined />} loading={false}>{i18n.t('delete')}</Button>
                        </Popconfirm>
                    </div>
                }
            </div>
        )
    }
}

const ViewerStyle = { width: '100%', minHeight: '100%', height: 'auto', position: 'relative' };

const ButtonStyle = {
    position: 'absolute',
    bottom: '12px',
    right: '12px'
};

const editButtonStyle = {
    marginRight: '4px'
};

export default withTranslation('ToastViewer')(ToastViewer);