import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';

@inject('environment', 'auth')
@observer
class HeaderLayout extends React.Component {
    render() {
        const { auth, environment, i18n, style } = this.props;

        return (
            <div style={style}>
                <div style={{ ...TitleStyle, padding: environment.size === 'small' ? '5px 40px' : '5px 16px' }}>
                    <a style={LinkStyle}>
                        Develop Template
                    </a>
                </div>
                {auth.hasPermission && <MyProfile />}
                {!auth.hasPermission && <RoutingButton label={`${i18n.t('login')}`} link={`/login${environment.queryString}`} style={MarginRightStyle} />}
                <SelectLanguage />
            </div>
        )
    }
}

const MarginRightStyle = {
    marginRight: '2px'
};

const TitleStyle = {
    position: 'absolute',
    left: 0,
    height: '32px',
    fontSize: '1.2em',
    fontFamily: 'fantasy'
}

const LinkStyle = {
    color: 'white'
}

export default withTranslation('HeaderLayout')(HeaderLayout);