import React from 'react';
import App from 'next/app';

/* MobX */
import { Provider } from 'mobx-react';
import initializeStore from '../stores';

/* I18N */
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

/* Styles */
import 'nprogress/nprogress.css';
import '../public/styles/init.css';
import 'antd/dist/antd.css';

/* Components */
import Head from '../components/Head';

/* Utils */
import { getAuthQuery, auth, getCookie } from '../utils';
import axios from 'axios';

/* N-Progress */
import dynamic from 'next/dynamic'
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

class _App extends App {
    constructor(props) {
        super(props);
        const { initialState } = this.props.pageProps;
        this.store = initializeStore(initialState);

        const { environment } = this.store;
        i18n.changeLanguage(environment.language);
    }

    // TODO : 정리해야한다.
    // static async getInitialProps({ Component, ctx }) {
    //     const { provider, access_token, id_token, query } = getAuthQuery(ctx.query || {});
    //     let jwt = '';
    //     let user = {};

    //     const cookieJWT = getCookie('jwt', !process.browser ? ctx.req.headers.cookie || '' : '');
    //     if (cookieJWT) {
    //         try {
    //             const BASE_URL = !process.browser ? process.env.SSR_API_URL : '';
    //             const headers = { Authorization: `bearer ${cookieJWT}` };
    //             const response = await axios.get(`${BASE_URL}/users/me`, { headers });
    //             jwt = cookieJWT;
    //             user = response.data;
    //             console.log(jwt, user);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }

    //     if (provider && access_token && id_token) {
    //         const response = await auth(provider, access_token, id_token);
    //         jwt = response.jwt;
    //         user = response.user;
    //     }
    //     const initialState = initializeStore({ environment: { query }, auth: { jwt, user } });

    //     ctx.store = initialState;

    //     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) || {} : {};

    //     return { pageProps, initialState };
    // }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <TopProgressBar />
                <I18nextProvider i18n={i18n}>
                    <Provider {...this.store}>
                        <Head />
                        <Component {...pageProps} />
                    </Provider>
                </I18nextProvider>
            </>
        );
    }
}

export default _App;