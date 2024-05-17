import Cookies from 'js-cookie';

export default class BaseService {
  constructor(axios, prefix) {
    this.api = axios;
    this.prefix = prefix;
  }

  processResponse(response) {
    let data = response.data;
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('data')) {
      return data.data;
    }

    return data;
  }

  logError(e, error) {
    if (error != undefined && e.response != undefined) {
      // eslint-disable-next-line no-prototype-builtins
      if (e.response.hasOwnProperty('status')) {
        if (e.response.status == 401) {
          Cookies.remove('access_token');
          Cookies.remove('role');
          const previousUserId = Cookies.get('user_id') || '';
          const queryString = `${window.location.pathname}${window.location.search}`;
          Cookies.set('previous_user_id', previousUserId, {
            expires: 90,
          });
          Cookies.set('redirectPath', queryString, {
            expires: 90,
          });
          window.location.href = '/login';
          return;
        }

        let errors = [];
        if (e.response.data.errors) {
          errors = Object.fromEntries(
            Object.entries(e.response.data.errors).map(([key, value]) => [key, value[0]])
          );
        }
        error({
          code: e.response.status,
          error: errors,
          responseCode: e.response.data.responseCode,
        });

      }
    }
  }

  async get(endpoint, success, error, params = {}) {
    await this.api
      .get(this.prefix + endpoint, {
        params,
      })
      .then(response => this.processResponse(response))
      .then(json => success(json))
      .catch(e => this.logError(e, error));
  }

  async post(endpoint, params = {}, success, error) {
    await this.api
      .post(this.prefix + endpoint, params)
      .then(response => this.processResponse(response))
      .then(json => success(json))
      .catch(e => this.logError(e, error));
  }

  async put(endpoint, params = {}, success, error) {
    await this.api
      .put(this.prefix + endpoint, params)
      .then(response => this.processResponse(response))
      .then(json => success(json))
      .catch(e => this.logError(e, error));
  }

  async delete(endpoint, data = {}, success, error) {
    await this.api
      .delete(this.prefix + endpoint, { data })
      .then(response => this.processResponse(response))
      .then(json => success(json))
      .catch(e => this.logError(e, error));
  }

  async patch(endpoint, params = {}, success, error) {
    await this.api
      .patch(this.prefix + endpoint, params)
      .then(response => this.processResponse(response))
      .then(json => success(json))
      .catch(e => this.logError(e, error));
  }

  urlParse(obj, query = false) {
    let str = [];
    // eslint-disable-next-line no-prototype-builtins
    for (let p in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(p) && obj[p] !== null && obj[p] !== undefined && obj[p] !== '') {
        if (obj[p] === true) obj[p] = 1;
        if (obj[p] === false) obj[p] = 0;
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }

    if (query) return '?' + str.join('&') + '&' + query;
    return '?' + str.join('&');
  }
}
