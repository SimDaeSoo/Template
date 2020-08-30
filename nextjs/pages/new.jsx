import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';
import RoutingButton from '../components/RoutingButton';
import DefaultLayout from '../layouts/DefaultLayout';
const ToastViewer = dynamic(() => import('../components/ToastViewer'), { ssr: false });

@inject('environment', 'auth')
@observer
class New extends HydrateComponent {
    render() {
        const { auth, environment, i18n } = this.props;

        return (
            <DefaultLayout>
                <>
                    <div style={{ height: '100%' }}>
                        <div style={{ height: '32px', zIndex: 2, textAlign: 'right', backgroundColor: '#101010' }}>
                            {/* <RoutingButton label={`${i18n.t('home')} ${i18n.t('page')}`} link={`/${environment.queryString}`} /> */}
                            {!auth.hasPermission && <RoutingButton label={`${i18n.t('login')}`} link={`/login${environment.queryString}`} />}
                            {auth.hasPermission && <MyProfile />}
                            <SelectLanguage />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 32px)', maxWidth: '1280px', margin: 'auto' }}>
                            <ToastViewer />
                        </div>
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

export default withTranslation('New')(New);