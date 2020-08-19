import axios from 'axios';

class Network {
    static get instance() {
        if (!Network._instance) {
            Network._instance = new Network();
        }
        return Network._instance;
    }

    async graphql(query, variables) {
        const jwt = this.jwt || '';
        const API_ADDRESS = process.browser ? '/api' : process.env.SSR_API_URL;
        const headers = jwt ? { Authorization: `bearer ${jwt}` } : {};
        const { data } = await axios.post(`${API_ADDRESS}/graphql`, { query, variables }, { headers });
        return data;
    }
}

export default Network.instance;