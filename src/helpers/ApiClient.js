import Config from '../constants/Config';

export default class ApiClient {

  static async requestAllDeps() {
      const success = await ApiClient.fetch(Config.api.getPath('/auth/allDependencies'), 'GET');
      return success;
  }

  static async fetch(path, method = 'GET', params = {}) {
      let response;
      let json;

      const finalUrl = path + '?' + (Math.random() + new Date().getTime());
      
      const requestParams = {
          method: method,
          headers: ApiClient.getHeaders(),
          cache: 'no-cache' //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
      };
      if (method === 'POST' || method === 'PUT') {
          requestParams.body = JSON.stringify(params);
      }
      response = await fetch(finalUrl, requestParams);

      json = await response.json();
      if (Config.api.SUCCESS_STATUS.includes(response.status) && response.ok) {
          console.log('JSON', json);
          return json;
      }
      throw new Error(json.message);

  }

  static getHeaders() {
      return {
          'Cache-Control': 'no-cache',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
  }
}
