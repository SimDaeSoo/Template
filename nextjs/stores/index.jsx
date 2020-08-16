import { useStaticRendering } from 'mobx-react';
import Environment from './Environment';
import Auth from './Auth';

useStaticRendering(!process.browser);

let store = null;

export default function initializeStore(initialData = { environment: { query: {} }, auth: { jwt: '', user: {} } }) {
    if (store === null) {
        store = {
            environment: new Environment(initialData.environment),
            auth: new Auth(initialData.auth),
        };
    } else {
        store.environment.hydrate(initialData.environment);
        store.auth.hydrate(initialData.auth);
    }
    return store;
}