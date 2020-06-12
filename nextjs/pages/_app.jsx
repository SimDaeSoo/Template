import React from 'react';
import App from 'next/app';
import { Provider } from 'mobx-react';
import initializeStore from '../stores';

export default class BaseApp extends App {
    constructor(props) {
        super(props);
        const isServer = typeof window === 'undefined';
        this.store = isServer ? props.initialState : initializeStore(props.initialState);
    }

    static async getInitialProps(appContext) {
        const store = initializeStore();
        appContext.ctx.store = store;
        const appProps = await App.getInitialProps(appContext);
        return {
            ...appProps,
            initialState: store,
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider {...this.store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}