import axios from 'axios';
import { stringify } from 'querystring';

export async function _gerServerConfig() {
    try {
        const response = await axios.get(`${process.env.SSR_API_URL}/config`);
        return response.data;
    } catch (e) {
        return {};
    }
}

export async function _verifing(provider, access_token, id_token) {
    try {
        const response = await axios.get(`${process.env.SSR_API_URL}/auth/${provider}/callback?${stringify({ access_token, id_token })}`);
        const { jwt, user } = response.data;
        return { jwt, user };
    } catch (e) {
        return { jwt: '', user: {} };
    }
}

export function _seperateAuthQuery(base) {
    const { provider, access_token, id_token, ...query } = base;
    delete query['raw[access_token]'];
    delete query['raw[expires_in]'];
    delete query['raw[scope]'];
    delete query['raw[token_type]'];
    delete query['raw[id_token]'];
    return { provider, access_token, id_token, query };
}

export function _setCookieSSR(ctx, cname, cvalue, exdays) {
    const expireDate = new Date(Date.now() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${expireDate.toUTCString()}`;
    ctx.res.setHeader('Set-Cookie', cname + '=' + cvalue + ';' + expires + ';path=/;');
}

export function _getCookieSSR(ctx, cname) {
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

export function _getCookieCSR(name) {
    name = new RegExp(name + '=([^;]*)');
    return name.test(document.cookie) ? unescape(RegExp.$1) : '';
}

export function _setCookieCSR(name, value, d) {
    document.cookie = name + '=' + escape(value) + '; path=/' + (d ? '; expires=' + (function (t) { t.setDate(t.getDate() + d); return t })(new Date).toGMTString() : '');
}