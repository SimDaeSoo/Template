import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import DefaultLayout from '../layouts/DefaultLayout';
const ToastEditor = dynamic(() => import('../components/Toasteditor'), { ssr: false });

@inject('environment', 'auth')
@observer
class Home extends HydrateComponent {
    render() {
        return (
            <DefaultLayout>
                <div style={{ position: 'relative', width: '100%', height: '100%', margin: 'auto' }}>
                    <ToastEditor />
                </div>
            </DefaultLayout>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);