import { observable, action } from 'mobx';

class TestStore {
    @observable
    testString = '';

    constructor(initializeData) {
        this.testString = initializeData.testString;
    }

    @action
    setTestString(value) {
        this.testString = value;
    }

    async fetch(data) {
        const getString = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        });

        this.setTestString(getString);
    }
}

export default TestStore;