import { useStaticRendering } from 'mobx-react';
import TestStore from './testStore';

let store = null;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default function initializeStore(initialData = { testStore: { testString: '' } }) {
    if (isServer) {
        return {
            testStore: new TestStore(initialData.testStore),
            // ... another Store
        };
    }
    console.log(store);
    if (store === null) {
        store = {
            testStore: new TestStore(initialData.testStore),
            // ... another Store
        };
    }

    return store;
}