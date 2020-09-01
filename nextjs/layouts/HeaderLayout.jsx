import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';

import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

@inject('environment', 'auth')
@observer
class HeaderLayout extends React.Component {
    render() {
        const { auth, environment, i18n, style } = this.props;

        return (
            <div style={style}>
                <Button icon={<HomeOutlined />} type='link' style={{ left: '0', position: 'absolute' }} >{i18n.t('goToHome')}</Button>
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

export default withTranslation('HeaderLayout')(HeaderLayout);