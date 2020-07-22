import { useStaticRendering } from 'mobx-react';
import Environment from './Environment';
import Auth from './Auth';

useStaticRendering(!process.browser);

export default function initializeStore(initialData = { environment: { query: {} }, auth: { jwt: '', user: {} } }) {
    return {
        environment: new Environment(initialData.environment),
        auth: new Auth(initialData.auth),
    };
}