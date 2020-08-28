import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { Select } from 'antd';
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import { GoogleOutlined } from '@ant-design/icons';

@inject('environment', 'auth')
@observer
class Login extends HydrateComponent {
  constructor(props) {
    super(props);
  }

  changeLanguage = (language) => {
    const { environment } = this.props;
    environment.set('language', language);
  }

  render() {
    const { i18n } = this.props;

    return (
      <div style={LoginPageStyle}>
        <div style={LanguageSelectboxStyle}>
          <Select value={i18n.language} onChange={this.changeLanguage}>
            <Select.Option value='ko'>{i18n.t('korean')}</Select.Option>
            <Select.Option value='en'>{i18n.t('english')}</Select.Option>
          </Select>
        </div>

        <div style={TitleSectionStyle}>
          <p style={TitleStyle}>
            {i18n.t('pageTitle')}
          </p>

          <p style={SubTitleStyle}>
            {i18n.t('pageDescription')}
          </p>

          <div style={LoginFormStyle}>
            <a className='ant-btn ant-btn-lg ant-btn-primary ant-btn-block ss-login' href={`/connect/google`}>
              <GoogleOutlined />
              <span>{i18n.t('googleLogin')}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

/* Styles */
const LoginPageStyle = {
  display: 'flex',
  height: '100%',
  width: '100%'
}

const TitleSectionStyle = {
  padding: '0 2rem',
  margin: 'auto',
  textAlign: 'center',
}

const TitleStyle = {
  fontSize: '3rem',
  fontWeight: 700,
  marginBottom: '0.25rem',
  lineHeight: '48px'
}

const SubTitleStyle = {
  fontSize: '1.7rem',
  fontWeight: 400
}

const LoginFormStyle = {
  width: '220px',
  margin: 'auto'
}

const LanguageSelectboxStyle = {
  position: 'absolute',
  right: '15px',
  top: '15px',
  display: 'flex'
}

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: false });

  return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Login')(Login);