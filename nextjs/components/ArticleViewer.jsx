import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Tag, Tooltip } from 'antd';
import { UserOutlined, TagOutlined, ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Viewer } from '@toast-ui/react-editor';
import Comment from '../components/Comment';
import ToastViewer from '../components/ToastViewer';
import moment from 'moment';
import CreateComment from './CreateComment';
import i18n from '../locales/i18n';

@inject('auth')
@observer
class ArticleViewer extends React.Component {
  render() {
    const { auth, article } = this.props;

    return (
      <div style={ViewerStyle}>
        <div style={HeaderWrapperStyle}>
          <img src={article.thumbnail} style={ThumbnailStyle} />

          <div style={TitleWrapperStyle}>
            <div style={TitleBlockStyle}>
              <div className='article_title'>{article.title}</div>
            </div>
          </div>

          <div style={TagsWrapperStyle}>
            <Tag color='blue' icon={<UserOutlined />} style={UserTagStyle}>
              {article.author.username}
            </Tag>
            <Tag color='magenta' icon={<TagOutlined />}>
              {article.category.title}
            </Tag>
            <div>
              <Tooltip title={moment(article.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                <Tag color='volcano' icon={<ClockCircleOutlined />} style={UserTagStyle}>
                  {i18n.t('created')}: {moment(article.created_at).fromNow()}
                </Tag>
              </Tooltip>
              <Tooltip title={moment(article.updated_at).format('YYYY-MM-DD HH:mm:ss')}>
                <Tag color='orange' icon={<EditOutlined />}>
                  {i18n.t('updated')}: {moment(article.updated_at).fromNow()}
                </Tag>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className='article_description'><Viewer initialValue={`><span style="color:#cccccc; font-size:1.1em">${article.description}</span>`} /></div>
        <ToastViewer article={article} />

        <div style={CommentsStyle}>
          {auth.hasPermission && <CreateComment article={article} />}
          {article.comments.map((comment, index) => <Comment comment={comment} article={article} key={index} depth={1} />)}
        </div>
      </div>
    )
  }
}

const CommentsStyle = {
  backgroundColor: '#202020',
  padding: '8px'
};

const ViewerStyle = {
  width: '100%',
  height: '100%'
};

const HeaderWrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '300px'
};

const TitleWrapperStyle = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex'
};

const TitleBlockStyle = {
  display: 'inline-block',
  textAlign: 'center',
  margin: 'auto'
};

const TagsWrapperStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  width: '100%'
};

const UserTagStyle = {
  marginRight: '2px'
};

const ThumbnailStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover'
};

export default withTranslation('ArticleViewer')(ArticleViewer);