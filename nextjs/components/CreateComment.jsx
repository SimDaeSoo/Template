import React from 'react';
import { observer, inject } from 'mobx-react';
import { Comment, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import MyProfile from './MyProfile';

@inject('auth')
@observer
class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, content: '' };
  }

  send = async () => {
    const { article, comment } = this.props;
    this.setState({ loading: true });
    // Save
    this.setState({ loading: false, content: '' });
  }

  changeContent = (e) => {
    this.setState({ content: e.target.value });
  }

  render() {
    const { auth, article } = this.props;
    const { loading, content } = this.state;

    return (
      <div style={FullWidthStyle}>
        <Comment
          author={<a>{auth.user.username} {auth.user.email}</a>}
          avatar={<MyProfile />}
          className={article.author.id === auth.user.id ? 'owner' : ''}
          content={
            <div style={AlignRightStyle}>
              <Input.TextArea bordered={false} autoSize style={InputCommentStyle} value={content} onChange={this.changeContent} />
              <Button type='link' onClick={this.save} icon={<SendOutlined />} style={SubmitCommentStyle} loading={loading} onClick={this.send} disabled={content.length < 1} />
            </div>
          }
        >
        </Comment>
      </div>
    )
  }
}

const FullWidthStyle = {
  width: '100%'
};

const AlignRightStyle = {
  textAlign: 'right'
};

const InputCommentStyle = {
  textAlign: 'left',
  backgroundColor: 'rgba(255,255,255,0.1)'
};

const SubmitCommentStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  backgroundColor: 'transparent'
};

export default CreateComment;