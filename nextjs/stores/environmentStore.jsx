import { observable, action } from 'mobx';
import i18n from '../locales/i18n';

class EnvironmentStore {
    @observable
    query = {};

    constructor(initializeData) {
        this.query = initializeData.query;
    }

    @action
    setLanguage(language) {
        this.query.language = language;
        i18n.changeLanguage(language);
    }

    get language() {
        return this.query.language || 'en';
    }

    get queryString() {
        let queryString = '';

        for (let key in this.query) {
            queryString += `${queryString === '' ? '?' : '&'}${key}=${this.query[key]}`;
        }

        return queryString;
    }
}

export default EnvironmentStore;