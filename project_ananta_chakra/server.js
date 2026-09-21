const http = require('http');

const PORT = 3000;
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/5d5496f6-d7b7-4ad4-84b4-ecbcb4c91713';

const server = http.createServer((req, res) => {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle proxy payload
    if (req.method === 'POST' && req.url === '/chat') {
        let bodyTokens = [];
        req.on('data', chunk => bodyTokens.push(chunk));

        req.on('end', async () => {
            const bodyStr = Buffer.concat(bodyTokens).toString();
            try {
                // Determine if we should parse and what to send
                // This uses native Node fetch available in Node.js 18+
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyStr
                });

                const data = await response.text();

                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(data);
            } catch (error) {
                console.error("Error connecting to n8n:", error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    reply: "> ERROR: Failed to reach n8n webhook. Is n8n running and listening on port 5678?"
                }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🚀 CORS Proxy Server running at http://localhost:${PORT}`);
    console.log(`📡 Forwarding POST requests from /chat to:`);
    console.log(`   ${N8N_WEBHOOK_URL}`);
    console.log("-----------------------------------------");
});
