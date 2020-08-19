import { useStaticRendering } from 'mobx-react';
import Environment from './Environment';
import Auth from './Auth';

useStaticRendering(!process.browser);

let store = null;

export function getStore() {
    if (store === null) {
        store = {
            environment: new Environment(),
            auth: new Auth(),
        };
    }

    return store;
}

export function hydrate(initialData = { environment: { query: {} }, auth: { jwt: '', user: {} } }) {
    store.environment.hydrate(initialData.environment);
    store.auth.hydrate(initialData.auth);
}