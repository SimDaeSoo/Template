import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';

@inject('environment', 'auth')
@observer
class Home extends HydrateComponent {
    render() {
        const { auth, environment, i18n } = this.props;

        return (
            <div style={{ textAlign: 'right' }}>
                <RoutingButton label={`${i18n.t('new')} ${i18n.t('page')}`} link={`/new${environment.queryString}`} />
                {!auth.hasPermission && <RoutingButton label={`${i18n.t('login')}`} link={`/login${environment.queryString}`} />}
                {auth.hasPermission && <MyProfile />}
                <SelectLanguage />
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);