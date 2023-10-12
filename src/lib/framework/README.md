TODO: document your WebApp implementation here. Include the general idea, technical details, problems encountered and any possible improvements you'd consider in future development.

The WebApp provides a structure for processing incoming HTTP requests and generating appropriate responses.
The constructor initializes a WebApp instance, creating an empty array to store middleware functions and prepares the server for incoming HTTP requests.

The use() method registers middleware functions for processing incoming HTTP requests. Middleware functions can modify the request (req) or response (res) objects and can call the next() function to pass control to the next middleware.
middleware: A function that receives three parameters: req (request), res (response), and next (a callback to proceed to the next middleware).

The start method creates an HTTP server using Node.js's http.createServer and listens on the specified port and host.
The handleRequest(req, res)  method is responsible for handling incoming HTTP requests. It processes the request and response objects by extending them with body properties.
req: An instance of Node's http.IncomingMessage representing the HTTP request.
res: An instance of Node's http.ServerResponse representing the HTTP response.
If an error occurs within a middleware function, it sets the response status code based on the error's statusCode property, or it defaults to 500 (Internal Server Error).
