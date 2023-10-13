/**
 * Router plugin implementation - write your code here
 *
 * This module should export your implementation of Router class.
 */
const { pathToRegexp } = require("path-to-regexp");

class Router {
  #routes = [];
  #prefix = '';

  constructor(_prefix) {
    this.#routes = [];
    this.#prefix = _prefix ? undefined : '';
  }
  get(path, handler) {
    this.#routes.push({ method: 'GET', path: this.#prefix + path, handler });
    return this;
  }
 
  post(path, handler) {
    this.#routes.push({ method: 'POST', path: this.#prefix + path, handler });
    return this;
  }

  put(path, handler) {
    this.#routes.push({ method: 'PUT', path: this.#prefix + path, handler });
    return this;
  }

  delete(path, handler) {
    this.#routes.push({ method: 'DELETE', path: this.#prefix + path, handler });
    return this;
  }
  routes(_prefix) {  
    if (_prefix) {
      const routesAux = this.#routes; 
      this.#routes = []; 
      this.#prefix = _prefix.prefix;
      for (const route of routesAux) {
        this.#routes.push({
          method: route.method,
          path: this.#prefix + route.path,
          handler: route.handler,
        });
      }
    }    
    return (req, res) => {
      const route = this.#routes.find((route) => {
        return route.method === req.method && this.matchPath(route.path, req.url);
      });

      if (route) {
        try {
          req.params = this.extractParams(route.path, req.url);
          route.handler(req, res);        
          res.end();
        } catch (error) {     
          res.statusCode = error.statusCode;
          res.end(error.message);           
        }
      } else {
        res.statusCode = 404;
        res.end('Check the route');
      }    
    };
  }

  matchPath(routePath, requestUrl) {
    const keys = [];
    const re = pathToRegexp(routePath, keys);
    const match = re.exec(requestUrl);
    return match !== null;
  }

  extractParams(routePath, requestUrl) {
    const keys = [];
    const re = pathToRegexp(routePath, keys);
    const match = re.exec(requestUrl);

    if (!match) return {};

    const params = {};
    for (let i = 1; i < match.length; i++) {
      const key = keys[i - 1].name;
      const value = match[i];
      params[key] = value;
    }

    return params;
  }
}

module.exports = Router;