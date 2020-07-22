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
import { getAuthQuery, auth } from '../utils';

/* N-Progress */
import dynamic from 'next/dynamic'
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

export default class BaseApp extends App {
    constructor(props) {
        super(props);
        const { initialState } = this.props;
        const isServer = typeof window === 'undefined';
        this.store = isServer ? initialState : initializeStore(initialState);
        const { environment } = this.store;
        i18n.changeLanguage(environment.language);
    }

    static async getInitialProps(appContext) {
        const { provider, access_token, id_token, query } = getAuthQuery(appContext.ctx.query || {});
        const { jwt, user } = (provider && access_token && id_token) ? await auth(provider, access_token, id_token) : { jwt: '', user: {} };
        const store = initializeStore({ environment: { query }, auth: { jwt, user } });
        appContext.ctx.store = store;
        const appProps = await App.getInitialProps(appContext);
        return { ...appProps, initialState: store };
    }

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