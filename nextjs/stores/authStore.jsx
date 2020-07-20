import { observable } from 'mobx';

class AuthStore {
    @observable
    jwt = '';

    constructor(initializeData) {
        this.jwt = initializeData.jwt;
    }
}

export default AuthStore;