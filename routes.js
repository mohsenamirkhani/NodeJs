const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);
  // this line would hard exit the server but we don't want this
  // process.exit();

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>FIrst Page</title></head>");
    res.write(
      "<body><form action='/messages' method='POST'><input type='text' name='message'/><button>action</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/messages" && req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    return req.on("end", () => {
      const buffer = Buffer.concat(chunks).toString();
      const message = buffer.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Page By NodeJS</title></head>");
  res.write("<body>HELOO</body>");
  res.write("</html>");
  res.end();
  // can not write after calling end (it would throw an error)
  // res.write("</html>");
};

module.exports = requestHandler;
