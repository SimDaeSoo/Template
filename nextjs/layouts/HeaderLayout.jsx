import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';

@inject('environment', 'auth')
@observer
class HeaderLayout extends React.Component {
    render() {
        const { auth, environment, i18n, style } = this.props;

        return (
            <div style={style}>
                {auth.hasPermission && <MyProfile showName={true} />}
                <Button icon={<HomeFilled />} style={MarginRightStyle} />
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