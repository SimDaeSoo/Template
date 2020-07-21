import { observable } from 'mobx';

class Auth {
    @observable jwt = '';
    @observable user = {};

    constructor(initializeData) {
        this.jwt = initializeData.jwt;
        this.user = initializeData.user;
    }
}

export default Auth;