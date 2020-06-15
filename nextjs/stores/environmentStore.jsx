import { observable, action } from 'mobx';

class EnvironmentStore {
    @observable
    language = 'en';

    constructor(initializeData) {
        this.language = initializeData.language;
    }

    @action
    setLanguage(language) {
        this.language = language;
    }

    async changeLanguage(language) {
        this.setLanguage(language);
    }
}

export default EnvironmentStore;