import { observable, action } from 'mobx';
import { stringify } from 'querystring';
import i18n from '../locales/i18n';

class Environment {
    @observable query = {};

    constructor(initializeData) {
        this.query = initializeData.query;
        this.setLanguage(this.language);
    }

    @action setLanguage(language) {
        this.query.language = language;
        if (language === 'en') delete this.query.language;
        i18n.changeLanguage(this.language);
    }

    get language() {
        return this.query.language || 'en';
    }

    get queryString() {
        const query = stringify(this.query);
        return query ? `?${query}` : '';
    }
}

export default Environment;