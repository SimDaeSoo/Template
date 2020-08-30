import React from 'react';
import App from 'next/app';
import 'moment/locale/ko';

/* MobX */
import { Provider } from 'mobx-react';
import { hydrate } from '../stores';

/* I18N */
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

/* Styles */
import 'nprogress/nprogress.css';
import 'codemirror/lib/codemirror.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import '../public/styles/editor.css';
import '../public/styles/init.css';

/* Components */
import Head from '../components/Head';

/* N-Progress */
import dynamic from 'next/dynamic';
import Network from '../utils/network';
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

class _App extends App {
    constructor(props) {
        super(props);
        const { initializeData } = this.props.pageProps;
        this.store = hydrate(initializeData || {});
    }

    hydrate = () => {
        const { initializeData } = this.props.pageProps;

        if (initializeData.auth.updatedAt !== this.store.auth.updatedAt) {
            this.store = hydrate(initializeData || {});
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
                        <Head title={i18n.t('pageTitle')} description={i18n.t('pageDescription')} />
                        <Component {...pageProps} hydrate={this.hydrate} />
                    </Provider>
                </I18nextProvider>
            </>
        );
    }
}

export default _App;