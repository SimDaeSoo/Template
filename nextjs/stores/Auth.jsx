import { observable, action, computed } from 'mobx';
import axios from 'axios';
import Router from 'next/router';
import Network from '../utils/network';
import { _seperateAuthQuery, _getCookieSSR, _setCookieCSR, _setCookieSSR, _verifing, _gerServerConfig } from '../utils';

class Auth {
    @observable updatedAt;
    @observable jwt = '';
    @observable user = {};

    hydrate(initializeData) {
        this.jwt = initializeData.jwt;
        this.user = initializeData.user;
        this.updatedAt = initializeData.updatedAt;
    }

    @action logout = () => {
        this.jwt = '';
        this.user = {};
        if (process.browser) _setCookieCSR('jwt', '');
        Router.reload();
    }

    @computed get role() {
        return ((this.user || {}).role || {}).name || '';
    }

    @computed get hasPermission() {
        return (this.jwt && this.user);
    }
}

export async function getInitializeAuthData(context, options) {
    const { provider, access_token, id_token } = _seperateAuthQuery(context.query || {});
    const _hasAuthOption = provider && access_token && id_token;
    const _requestJWT = _getCookieSSR(context, 'jwt');
    let [jwt, user] = ['', {}];

    try {
        if (_hasAuthOption) {
            const response = await _verifing(provider, access_token, id_token);
            [jwt, user] = [response.jwt, response.user];
            _setCookieSSR(context, 'jwt', response.jwt);
        } else if (_requestJWT) {
            const headers = { Authorization: `bearer ${_requestJWT}` };
            const response = await axios.get(`${process.env.SSR_API_URL}/users/me`, { headers });
            [jwt, user] = [_requestJWT, response.data];
        } else {
            throw ('permission denied');
        }
    } catch (e) {
        _setCookieSSR(context, 'jwt', '', 0);
        console.log(e);
    }

    const serverConfig = await _gerServerConfig();
    if (!jwt && options.routing && serverConfig.loginRequired) {
        context.res.writeHead(303, { Location: '/login' });
        context.res.end();
    }

    Network.jwt = jwt;
    return { jwt, user, updatedAt: Date.now() };
}

export default Auth;