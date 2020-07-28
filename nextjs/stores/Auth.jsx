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
        if (process.browser) this._setCookie('jwt', '');
    }

    get hasPermission() {
        return (this.jwt && this.user);
    }

    get carried() {
        return this.user.carried_orders || [];
    }

    get liked() {
        return this.user.liked_orders || [];
    }

    _getCookie(name) {
        name = new RegExp(name + '=([^;]*)');
        return name.test(document.cookie) ? unescape(RegExp.$1) : '';
    }

    _setCookie(name, value, d) {
        document.cookie = name + '=' + escape(value) + '; path=/' + (d ? '; expires=' + (function (t) { t.setDate(t.getDate() + d); return t })(new Date).toGMTString() : '');
    }
}

export default Auth;