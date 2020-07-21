import { observable, action } from 'mobx';
import { stringify } from 'querystring';
import i18n from '../locales/i18n';

class EnvironmentStore {
    @observable query = {};

    constructor(initializeData) {
        this.query = initializeData.query;
    }

    @action setLanguage(language) {
        this.query.language = language;
        i18n.changeLanguage(language);
    }

    get language() {
        return this.query.language || 'en';
    }

    get queryString() {
        return stringify(this.query);
    }
}

export default EnvironmentStore;