/**
 * Web framework implementation - write your code here
 *
 * This module should export your implementation of WebApp class.
 */
const http = require('http');

class WebApp {
  middlewares = [];
  server;

  constructor() {
    this.middlewares = [];
  }
 
  use(middleware) {
    this.middlewares.push(middleware);
    return this; 
  }

  start(port, host) {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.server.listen(port, host, () => {
      console.log(`Server is listening on ${host}:${port}`);
    });
    return this.server;
  }

  handleRequest(req, res) {
    req.body = '';
    res.body = '';

    let rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(rawData);
      } catch (error) {
        console.error('Error JSON parsing request body:', error);
      }

      let currentIndex = 0;

      const next = (err) => {
        if (err) {
          res.statusCode = err.statusCode || 500;
          console.error(err);
          return;
        }

        currentIndex++;
        if (currentIndex < this.middlewares.length) {
          this.middlewares[currentIndex](req, res, next);
        }
      };

      if (this.middlewares.length > 0) {
        this.middlewares[0](req, res, next);
      }
    });
  }
}

module.exports = WebApp;