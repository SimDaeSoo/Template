import { observable, action, computed } from 'mobx';
import axios from 'axios';
import Network from '../utils/network';
import { _seperateAuthQuery, _getCookieSSR, _setCookieCSR, _setCookieSSR, _verifing } from '../utils';

class Auth {
    @observable jwt = '';
    @observable user = {};

    hydrate(initializeData) {
        this.jwt = initializeData.jwt;
        this.user = initializeData.user;
    }

    @action logout = () => {
        this.jwt = '';
        this.user = {};
        if (process.browser) _setCookieCSR('jwt', '');
    }

    @computed get role() {
        return ((this.user || {}).role || {}).name || '';
    }

    @computed get hasPermission() {
        return (this.jwt && this.user);
    }
}

export async function getInitializeAuthData(context) {
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

    // if (!jwt) {
    //     context.res.writeHead(303, { Location: '/login' });
    //     context.res.end();
    // }

    Network.jwt = jwt;
    return { jwt, user };
}

export default Auth;