import React from 'react';
import { withTranslation } from "react-i18next";
import { Comment, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserProfile from './UserProfile';

class _Comment extends React.Component {
  render() {
    const user = {
      thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      username: '심대수(빅딜)',
      email: 'tlaeotn123@naver.com'
    };

    const { i18n } = this.props;

    return (
      <Comment
        author={<a>{user.username}</a>}
        actions={[
          <span key="comment-nested-reply-to"><EditOutlined /> {i18n.t('replyTo')}</span>,
          <span key="comment-delete"><DeleteOutlined /> {i18n.t('replyDelete')}</span>
        ]}
        avatar={<UserProfile user={user} />}
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      >
        <Comment
          author={<a>{user.username}</a>}
          actions={[
            <span key="comment-nested-reply-to"><EditOutlined /> {i18n.t('replyTo')}</span>,
            <span key="comment-delete"><DeleteOutlined /> {i18n.t('replyDelete')}</span>
          ]}
          avatar={<UserProfile user={user} />}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully
            </p>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        >
          <Comment
            author={<a>{user.username}</a>}
            actions={[
              <span key="comment-nested-reply-to"><EditOutlined /> {i18n.t('replyTo')}</span>,
              <span key="comment-delete"><DeleteOutlined /> {i18n.t('replyDelete')}</span>
            ]}
            avatar={<UserProfile user={user} />}
            content={
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
            </p>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          >
          </Comment>
        </Comment>
      </Comment >
    )
  }
}

export default withTranslation('_Comment')(_Comment);