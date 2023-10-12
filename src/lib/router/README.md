TODO: document your Router implementation here. Include the general idea, technical details, problems encountered and any possible improvements you'd consider in future development.

General Idea:
The Router implementation is a class that provides routing functionality for HTTP methods (GET, POST, PUT, DELETE) and helps to match routes based on path and HTTP method.  

Technical Details:
Constructor (Router class): The constructor initializes the router with an optional prefix. 
Route Registration Methods (Router class): Four methods (get, post, put, and delete) allow to register routes for specific HTTP methods. 
This middleware iterates through the registered routes and matches the request's HTTP method and URL against the registered routes. If a match is found, it extracts route parameters and invokes the handler.
To match a request's URL to a registered route, the router uses the path-to-regexp library. It compiles the registered route's path into a regular expression and then checks if the request URL matches this regular expression. If there's a match, it extracts route parameters.

Problems Encountered: 
One potential issue is related to route parameter extraction. The current implementation assumes that route parameters are placed in the URL in a specific order. This might not cover all use cases. A more robust approach for handling route parameters could be implemented.

Possible Improvements:
Robust Parameter Handling: A more flexible approach for handling route parameters could be implemented. This might involve using named route parameters or a more sophisticated route parameter parsing mechanism.
