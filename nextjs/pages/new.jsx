import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';
import DefaultLayout from '../layouts/DefaultLayout';
import Comment from '../components/Comment';
const ToastViewer = dynamic(() => import('../components/ToastViewer'), { ssr: false });

@inject('environment', 'auth')
@observer
class New extends HydrateComponent {
    render() {
        return (
            <DefaultLayout>
                <div style={{ position: 'relative', width: '100%', margin: 'auto' }}>
                    <ToastViewer />
                    <div style={CommentsStyle}>
                        <Comment />
                        <Comment />
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

const CommentsStyle = {
    backgroundColor: '#202020',
    padding: '8px'
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('New')(New);