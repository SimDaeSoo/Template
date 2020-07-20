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
        const { jwt } = response.data;
        return jwt;
    } catch (e) {
        return;
    }
}