import { useStaticRendering } from 'mobx-react';
import EnvironmentStore from './environmentStore';
import AuthStore from './authStore';

let store = null;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default function initializeStore(initialData = { environmentStore: { query: {} }, authStore: { jwt: '', user: {} } }) {
    if (isServer) {
        return {
            environmentStore: new EnvironmentStore(initialData.environmentStore),
            authStore: new AuthStore(initialData.authStore),
        };
    }

    if (store === null) {
        store = {
            environmentStore: new EnvironmentStore(initialData.environmentStore),
            authStore: new AuthStore(initialData.authStore),
        };
    }

    return store;
}