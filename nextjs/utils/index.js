import axios from 'axios';
import { stringify } from 'querystring';

export function getAuthQuery(base) {
    const { provider, access_token, id_token, ...query } = base;
    delete query['raw[access_token]'];
    delete query['raw[expires_in]'];
    delete query['raw[scope]'];
    delete query['raw[token_type]'];
    delete query['raw[id_token]'];
    return { provider, access_token, id_token, query };
}

export async function auth(provider, access_token, id_token) {
    try {
        const BASE_URL = !process.browser ? process.env.SSR_API_URL : '';
        const response = await axios.get(`${BASE_URL}/auth/${provider}/callback?${stringify({ access_token, id_token })}`);
        const { jwt, user } = response.data;
        return { jwt, user };
    } catch (e) {
        return { jwt: '', user: {} };
    }
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname, cookie) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}