import React from 'react';
import App from 'next/app';
import axios from 'axios';

/* MobX */
import { Provider } from 'mobx-react';
import initializeStore from '../stores';

/* I18N */
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

/* Styles */
import '../public/styles/init.css';
import 'antd/dist/antd.css';

/* Components */
import Head from '../components/head';

/* Utils */
import { getAuthQuery, auth } from '../utils';

export default class BaseApp extends App {
    constructor(props) {
        super(props);
        const { initialState } = this.props;
        const isServer = typeof window === 'undefined';
        this.store = isServer ? initialState : initializeStore(initialState);
        const { environmentStore } = this.store;
        i18n.changeLanguage(environmentStore.language);
        this.checkAuth();
    }

    async checkAuth() {
        const { authStore } = this.store;
        const jwt = process.browser ? sessionStorage.getItem('jwt') : '';
        if (!authStore.jwt && jwt) {
            try {
                const headers = { Authorization: `bearer ${jwt}` };
                const response = await axios.get(`/api/users/me`, { headers });
                const user = response.data;
                authStore.user = user;
                authStore.jwt = jwt;
            } catch (e) {
                sessionStorage.removeItem('jwt');
            }
        }
    }

    static async getInitialProps(appContext) {
        const { provider, access_token, id_token, query } = getAuthQuery(appContext.ctx.query || {});
        const { jwt, user } = (provider && access_token && id_token) ? await auth(provider, access_token, id_token) : { jwt: '', user: {} };
        const store = initializeStore({ environmentStore: { query }, authStore: { jwt, user } });
        appContext.ctx.store = store;
        const appProps = await App.getInitialProps(appContext);
        return { ...appProps, initialState: store };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <I18nextProvider i18n={i18n}>
                <Provider {...this.store}>
                    <Head />
                    <Component {...pageProps} />
                </Provider>
            </I18nextProvider>
        );
    }
}