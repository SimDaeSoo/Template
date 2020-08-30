import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';
import DefaultLayout from '../layouts/DefaultLayout';
const ToastEditor = dynamic(() => import('../components/Toasteditor'), { ssr: false });

@inject('environment', 'auth')
@observer
class Home extends HydrateComponent {
    render() {
        const { auth, environment, i18n } = this.props;

        return (
            <DefaultLayout>
                <>
                    <div style={{ height: '32px', zIndex: 2, textAlign: 'right', backgroundColor: '#101010' }}>
                        {/* <RoutingButton label={`${i18n.t('new')} ${i18n.t('page')}`} link={`/new${environment.queryString}`} /> */}
                        {!auth.hasPermission && <RoutingButton label={`${i18n.t('login')}`} link={`/login${environment.queryString}`} />}
                        {auth.hasPermission && <MyProfile />}
                        <SelectLanguage />
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 32px)', maxWidth: '1280px', margin: 'auto' }}>
                        <ToastEditor />
                    </div>
                </>
            </DefaultLayout>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);