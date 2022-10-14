const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Page By NodeJS</title></head>");
    res.write("<body>HELOO To You</body>");
    res.write("</html>");
    res.end();
});
server.listen(3000);