import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Input, Select, Upload, Button, Tooltip } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import ToastEditor from '../components/ToastEditor';

@inject('auth')
@observer
class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);

    const { article } = this.props;
    this.state = {
      article: (article || {
        id: undefined,
        title: '',
        description: '',
        category: {},
        created_at: new Date(),
        thumbnail: '',
        content: ``,
        author: {},
        comments: []
      })
    };
  }

  beforeUpload = (file) => {
    const IS_PNG_OR_JPG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
    if (!IS_PNG_OR_JPG) {
      console.log('error');
    }
    return IS_PNG_OR_JPG;
  }

  onUpload = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (callback) {
        callback(e.target.result);
      }
    }
    reader.readAsDataURL(file);
  }

  onThumbnailChange = (fileData) => {
    this.onUpload(fileData.file, (url) => {
      const { article } = this.state;
      article.thumbnail = url;
      this.setState({ article });
    });
  }

  onTitleChange = (e) => {
    const { article } = this.state;
    article.title = e.target.value;
    this.setState({ article });
  }

  onDescriptionChange = (e) => {
    const { article } = this.state;
    article.description = e.target.value;
    this.setState({ article });
  }

  onCategoryChange = (id) => {
    const { article } = this.state;
    article.category.id = id;
    this.setState({ article });
  }

  onSave = async (content) => {
    const { article } = this.state;
    article.content = content;
    this.setState({ article });

    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    // Create || Update, Upload
    console.log(this.state.article);
  }

  render() {
    const { i18n } = this.props;
    const { article } = this.state;

    return (
      <div style={FullSizeStyle}>
        <div style={EditorCoverStyle}>
          {article.thumbnail && <img src={article.thumbnail} style={CoverThumbnailStyle} />}
          {!article.thumbnail && <img src='/assets/default.png' style={CoverThumbnailStyle} />}
          <div style={CoverTitleWrapperStyle}>
            <div style={TitleWrapperStyle}>
              <Input placeholder={i18n.t('pleaseEnterArticleTitle')} value={article.title} onChange={this.onTitleChange} style={CoverTitleStyle} />
            </div>
          </div>

          <div style={SelectCategoryWrapperStyle}>
            <Select placeholder={i18n.t('category')} style={CategoryStyle} value={article.category.id} onChange={this.onCategoryChange}>
              {/* 수정 / 생성은 반드시 자신의 것만 가능하기에, Auth쪽에서 Categories 받아오면 될듯하다 */}
              <Select.Option value={1}>Algorithm</Select.Option>
            </Select>
          </div>

          <div style={UploadStyle}>
            <Tooltip title={i18n.t('changeThumbnail')} placement="rightBottom">
              <Upload
                beforeUpload={this.beforeUpload}
                customRequest={this.onThumbnailChange}
                showUploadList={false}
              >
                <Button icon={<CameraOutlined />} style={VerticalBottomStyle}></Button>
              </Upload>
            </Tooltip>
          </div>

          <div style={DescriptionWrapperStyle}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} placeholder={i18n.t('pleaseEnterArticleDescription')} value={article.description} onChange={this.onDescriptionChange} style={DescriptionStyle} />
          </div>
        </div>
        <div style={EditorWrapperStyle}>
          <ToastEditor onUpload={this.onUpload} article={article} onSave={this.onSave} />
        </div>
      </div>
    )
  }
}

const FullSizeStyle = {
  width: '100%',
  height: '100%'
};

const EditorCoverStyle = {
  position: 'relative',
  height: '138px'
};

const CoverThumbnailStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const CoverTitleWrapperStyle = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex'
};

const TitleWrapperStyle = {
  position: 'absolute',
  top: '42px',
  width: '100%'
}

const CoverTitleStyle = {
  width: '100%',
  fontSize: '1.5em',
  textAlign: 'center',
  border: 'none'
};

const SelectCategoryWrapperStyle = {
  position: 'absolute',
  right: '34px',
  top: '2px'
};

const VerticalBottomStyle = {
  verticalAlign: 'bottom'
};

const CategoryStyle = {
  margin: '0 2px',
  backgroundColor: 'rgba(0,0,0,0.3)'
};

const DescriptionWrapperStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '54px',
  display: 'flex'
};

const DescriptionStyle = {
  height: '54px',
  border: 'none',
  textAlign: 'center'
};

const EditorWrapperStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc(100% - 138px)'
};

const UploadStyle = {
  position: 'absolute',
  top: '2px',
  right: '2px',
  backgroundColor: 'rgba(0,0,0,0.3)'
};

export default withTranslation('ArticleEditor')(ArticleEditor);