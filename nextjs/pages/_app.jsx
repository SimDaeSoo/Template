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

/* N-Progress */
import dynamic from 'next/dynamic';
import Network from '../utils/network';
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

class _App extends App {
    constructor(props) {
        super(props);
        const { initializeData } = this.props.pageProps;
        Network.jwt = ((initializeData || {}).auth || {}).jwt || '';
    }
    render() {
        const { Component, pageProps } = this.props;
        const store = initializeStore(pageProps.initializeData || {});

        return (
            <>
                <TopProgressBar />
                <I18nextProvider i18n={i18n}>
                    <Provider {...store}>
                        <Head />
                        <Component {...pageProps} />
                    </Provider>
                </I18nextProvider>
            </>
        );
    }
}

export default _App;