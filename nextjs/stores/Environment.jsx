import { observable, action, computed } from 'mobx';
import { stringify } from 'querystring';
import Router from 'next/router';
import i18n from '../locales/i18n';

class Environment {
    @observable query = {};

    hydrate(initializeData) {
        this.query = initializeData.query;
        i18n.changeLanguage(this.language);
    }

    @action set(key, value) {
        if (this.query[key] !== value) {
            this.query[key] = value;

            if (this.query.language === 'en') delete this.query.language;
            i18n.changeLanguage(this.language);

            Router.push(`${Router.route}${this.queryString}`);
        }
    }

    @computed get language() {
        return this.query.language || 'en';
    }

    @computed get queryString() {
        const query = stringify(this.query);
        return query ? `?${query}` : '';
    }
}

export default Environment;