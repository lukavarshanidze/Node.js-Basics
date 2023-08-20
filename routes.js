const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title> </head>')
        res.write('<body><form action="/message" method="POST"><input type-"text" name="message"/><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const message = Buffer.concat(body).toString().split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.writeHead(302, {'Location': '/'})
                res.write(`<div>${message}</div>`)
                return res.end();
            })
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>heyuy</title></head>')
    res.write('<body><h1>heiqwjucwecceq</h1></body>')
    res.write('</html>')
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'textii'
};

// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.someText = 'some text';

// exports.handler = requestHandler;
// exports.someText = 'some text';

