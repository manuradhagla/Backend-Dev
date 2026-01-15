const http = require("http");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    const pathname = myUrl.pathname;
    const query = myUrl.query;
    if (pathname === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("<h2>Welcome to Home page</h2>");
    }
    else if (pathname === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("<h1>This is about page</h1>");
    }
    else if (pathname === "/user") {
        res.writeHead(200, { "content-type": "application/json" });
        let userInfo = {
            name: "manuradha",
            email: "manu@gmail.com",
            password: "manu@123"
        };
        res.end(JSON.stringify(userInfo));
    }
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("404 Page Not Found");
    }
});
server.listen(3000, () => console.log("Server started on port 3000"));