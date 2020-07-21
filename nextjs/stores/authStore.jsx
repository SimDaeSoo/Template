import { observable } from 'mobx';

class AuthStore {
    @observable jwt = '';
    @observable user = {};

    constructor(initializeData) {
        this.jwt = initializeData.jwt;
        this.user = initializeData.user;
    }
}

export default AuthStore;