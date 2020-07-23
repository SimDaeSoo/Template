import { observable, action } from 'mobx';

class Auth {
    @observable jwt = '';
    @observable user = {};

    constructor(initializeData) {
        this.jwt = initializeData.jwt;
        this.user = initializeData.user;
    }

    @action logout() {
        this.jwt = '';
        this.user = {};
    }

    get hasPermission() {
        return (this.jwt && this.user);
    }
}

export default Auth;