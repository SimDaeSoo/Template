import { useStaticRendering } from 'mobx-react';
import EnvironmentStore from './environmentStore';

let store = null;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default function initializeStore(initialData = { environmentStore: { query: {} } }) {
    if (isServer) {
        return {
            environmentStore: new EnvironmentStore(initialData.environmentStore),
            // ... another Store
        };
    }

    if (store === null) {
        store = {
            environmentStore: new EnvironmentStore(initialData.environmentStore),
            // ... another Store
        };
    }

    return store;
}