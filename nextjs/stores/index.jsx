import { useStaticRendering } from 'mobx-react';
import Environment from './environment';
import Auth from './auth';

let store = null;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default function initializeStore(initialData = { environment: { query: {} }, auth: { jwt: '', user: {} } }) {
    if (isServer) {
        return {
            environment: new Environment(initialData.environment),
            auth: new Auth(initialData.auth),
        };
    }

    if (store === null) {
        store = {
            environment: new Environment(initialData.environment),
            auth: new Auth(initialData.auth),
        };
    }

    return store;
}