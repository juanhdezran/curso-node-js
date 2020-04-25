const http = require("http");
const url = require("url");
const querystring = require('querystring');
const { info, error } = require("./modules/my-log");
const { countries } = require("countries-list");

const server = http.createServer(function (request, response) {
    const parsed = url.parse(request.url);    
    const pathname = parsed.pathname;
    const queryParams = querystring.parse(parsed.query);
    console.log("queryParams", queryParams.code);

    if (pathname === "/") {
        response.writeHead(200, { ContentType: "text/html" });
        response.write("<html><body><p>HELLO</p></body></html>");
        response.end();
    } else if (pathname === "/exit") {
        response.writeHead(200, { ContentType: "text/html" });
        response.write("<html><body><p>EXIT</p></body></html>");
        response.end();
    } else if (pathname === "/country") {
        response.writeHead(200, { ContentType: "application/json" });
        response.write(JSON.stringify(countries[queryParams.code]));
        response.end();
    } else if (pathname === "/info") {
        const result = info(pathname);
        response.writeHead(200, { ContentType: "text/html" });
        response.write(result);
        response.end();
    } else if (pathname === "/error") {
        const result = error(pathname);
        response.writeHead(200, { ContentType: "text/html" });
        response.write(result);
        response.end();
    } else {
        response.writeHead(404, { ContentType: "text/html" });
        response.write("<html><body><p>NOT FOUND</p></body></html>");
        response.end();
    }
});

server.listen(4000);
console.log("running on 4000");
