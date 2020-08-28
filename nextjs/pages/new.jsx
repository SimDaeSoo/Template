import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';

@inject('environment', 'auth')
@observer
class New extends HydrateComponent {
    render() {
        const { auth, environment, i18n } = this.props;

        return (
            <div>
                <RoutingButton label={`${i18n.t('home')} ${i18n.t('page')}`} link={`/${environment.queryString}`} />
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

export default withTranslation('New')(New);