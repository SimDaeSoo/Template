import axios from 'axios';
import { stringify } from 'querystring';

export async function initialize(context) {
    const { query } = _seperateAuthQuery(context.query || {});
    const { jwt, user } = await _auth(context);
    return { environment: { query }, auth: { jwt, user } };
}

async function _auth(context) {
    const { provider, access_token, id_token } = _seperateAuthQuery(context.query || {});
    const _hasAuthOption = provider && access_token && id_token;
    const _requestJWT = _getCookie(context, 'jwt');
    let [jwt, user] = ['', {}];

    if (_hasAuthOption) {
        try {
            const response = await _verifing(provider, access_token, id_token);
            [jwt, user] = [response.jwt, response.user];
            _setCookie(context, 'jwt', response.jwt);
        } catch (e) {
            _setCookie(context, 'jwt', '', 0);
            console.log(e);
        }
    } else if (_requestJWT) {
        try {
            const headers = { Authorization: `bearer ${_requestJWT}` };
            const response = await axios.get(`${process.env.SSR_API_URL}/users/me`, { headers });
            [jwt, user] = [_requestJWT, response.data];
        } catch (e) {
            _setCookie(context, 'jwt', '', 0);
            console.log(e);
        }
    }

    return { jwt, user };
}

async function _verifing(provider, access_token, id_token) {
    try {
        const response = await axios.get(`${process.env.SSR_API_URL}/auth/${provider}/callback?${stringify({ access_token, id_token })}`);
        const { jwt, user } = response.data;
        return { jwt, user };
    } catch (e) {
        return { jwt: '', user: {} };
    }
}

function _seperateAuthQuery(base) {
    const { provider, access_token, id_token, ...query } = base;
    delete query['raw[access_token]'];
    delete query['raw[expires_in]'];
    delete query['raw[scope]'];
    delete query['raw[token_type]'];
    delete query['raw[id_token]'];
    return { provider, access_token, id_token, query };
}

function _setCookie(ctx, cname, cvalue, exdays) {
    const expireDate = new Date(Date.now() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${expireDate.toUTCString()}`;
    ctx.res.setHeader('Set-Cookie', cname + '=' + cvalue + ';' + expires + ';path=/');
}

function _getCookie(ctx, cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(ctx.req.headers.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}