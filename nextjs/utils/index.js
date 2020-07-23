import axios from 'axios';
import { stringify } from 'querystring';
import Router from 'next/router';

export function redirect(context, target) {
    if (context.res) {
        context.res.writeHead(303, { Location: target })
        context.res.end()
    } else {
        Router.replace(target);
    }
}

export async function initialize(context) {
    const { provider, access_token, id_token, query } = getAuthQuery(context.query || {});
    const cookieJWT = getCookie(context, 'jwt');
    let [jwt, user] = ['', {}];

    if (provider && access_token && id_token) {
        try {
            const response = await auth(provider, access_token, id_token);
            [jwt, user] = [response.jwt, response.user];
            setCookie(context, 'jwt', response.jwt);
            redirect(context, '/');
        } catch (e) {
            setCookie(context, 'jwt', '', 0);
            console.log(e);
        }
    } else if (cookieJWT) {
        try {
            const headers = { Authorization: `bearer ${cookieJWT}` };
            const response = await axios.get(`${process.env.SSR_API_URL}/users/me`, { headers });
            [jwt, user] = [cookieJWT, response.data];
        } catch (e) {
            setCookie(context, 'jwt', '', 0);
            console.log(e);
        }
    }

    const initializeData = { environment: { query }, auth: { jwt, user } };
    context.store = initializeData;
    return initializeData;
}

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
        const response = await axios.get(`${process.env.SSR_API_URL}/auth/${provider}/callback?${stringify({ access_token, id_token })}`);
        const { jwt, user } = response.data;
        return { jwt, user };
    } catch (e) {
        return { jwt: '', user: {} };
    }
}

export function setCookie(ctx, cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    ctx.res.setHeader('Set-Cookie', cname + "=" + cvalue + ";" + expires + ";path=/");
}

export function getCookie(ctx, cname) {
    const name = cname + "=";
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
    return "";
}