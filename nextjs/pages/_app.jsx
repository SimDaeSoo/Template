import React from 'react';
import App from 'next/app';

/* MobX */
import { Provider } from 'mobx-react';
import { getStore, hydrate } from '../stores';

/* I18N */
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

/* Styles */
import 'nprogress/nprogress.css';
import '../public/styles/init.css';
import 'antd/dist/antd.css';

/* Components */
import Head from '../components/Head';

/* N-Progress */
import dynamic from 'next/dynamic';
import Network from '../utils/network';
import { computed } from 'mobx';
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

class _App extends App {
    constructor(props) {
        super(props);
        this.store = getStore();
    }

    hydrate = () => {
        const { initializeData } = this.props.pageProps;

        if (initializeData.auth.updatedAt !== this.store.auth.updatedAt) {
            hydrate(initializeData || {});
            Network.jwt = this.store.auth.jwt;
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <TopProgressBar />
                <I18nextProvider i18n={i18n}>
                    <Provider {...this.store}>
                        <Head />
                        <Component {...pageProps} hydrate={this.hydrate} />
                    </Provider>
                </I18nextProvider>
            </>
        );
    }
}

export default _App;