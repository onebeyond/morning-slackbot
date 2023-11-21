import axios from 'axios';

interface ClientOptions {
  baseURL?: string;
  withCredentials?: boolean;
}

export const createClient = ({ baseURL = `${process.env.API_URL}`, withCredentials = false }: ClientOptions) => {
  const buildUrl = (path: string) => baseURL + (path.startsWith('/') ? path : `/${path}`);

  const get = async (path: string, { params = {}, headers = {} } = {}) => {
    const url = buildUrl(path);
    try {
      const { data } = await axios.get(url, {
        params,
        headers,
        withCredentials,
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    get,
  };
};

export default createClient;
