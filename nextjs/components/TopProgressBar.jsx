import Router from "next/router";
import NProgress from "nprogress";

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
    NProgress.done();
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

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

export default function () {
    return null;
}