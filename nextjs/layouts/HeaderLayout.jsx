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
        const { auth, environment, i18n } = this.props;

        return (
            <div style={HEADER_STYLE}>
                {!auth.hasPermission && <RoutingButton label={`${i18n.t('login')}`} link={`/login${environment.queryString}`} />}
                {auth.hasPermission && <MyProfile />}
                <SelectLanguage />
            </div>
        )
    }
}

const HEADER_STYLE = {
    height: '32px',
    width: '100%',
    zIndex: 2,
    textAlign: 'right',
    backgroundColor: '#101010',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)'
};

export default withTranslation('HeaderLayout')(HeaderLayout);