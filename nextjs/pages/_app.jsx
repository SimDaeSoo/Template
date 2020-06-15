import React from 'react';
import App from 'next/app';
import { Provider } from 'mobx-react';
import initializeStore from '../stores';
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

export default class BaseApp extends App {
    constructor(props) {
        super(props);
        const { initialState } = this.props;
        const isServer = typeof window === 'undefined';
        this.store = isServer ? initialState : initializeStore(initialState);
        const { environmentStore } = this.store;
        i18n.changeLanguage(environmentStore.language);
    }

    static async getInitialProps(appContext) {
        const language = appContext.ctx.query.language || 'en';
        const store = initializeStore({ environmentStore: { language } });
        appContext.ctx.store = store;
        const appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
            initialState: store
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <I18nextProvider i18n={i18n}>
                <Provider {...this.store}>
                    <Component {...pageProps} />
                </Provider>
            </I18nextProvider>
        );
    }
}