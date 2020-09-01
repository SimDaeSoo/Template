import Router from "next/router";
import NProgress from "nprogress";
import axios from 'axios';

const store = { activeRequests: 0 };

const load = () => {
    if (store.state === "loading") return;
    store.state = "loading";
    NProgress.start();
}

const stop = () => {
    if (store.activeRequests > 0) return;
    store.state = "stop";
    clearTimeout(store.timer);
    NProgress.done(true);
}

const originalFetch = window.fetch;
window.fetch = async (...args) => {
    if (store.activeRequests === 0) load();
    store.activeRequests++;
    try {
        const response = await originalFetch(...args);
        return response;
    } catch (error) {
        return Promise.reject(error);
    } finally {
        store.activeRequests -= 1;
        if (store.activeRequests === 0) stop();
    }
};

axios.defaults.onDownloadProgress = e => {
    NProgress.start();
}

axios.interceptors.response.use(response => {
    NProgress.done(true)
    return response
});

NProgress.configure({ showSpinner: false, speed: 300 });
Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

export default function TopProgressBar() {
    return null;
}