#!/usr/bin/env python3
"""GDPR AI Analysis — local CORS proxy for Anthropic API.
Usage:  python3 server.py           # reads ANTHROPIC_API_KEY from env
        python3 server.py YOUR_KEY  # or pass key as argument
The HTML page calls POST http://localhost:8765/v1/messages
"""
import http.server, urllib.request, json, os, sys

API_KEY = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("ANTHROPIC_API_KEY", "")
if not API_KEY:
    print("ERROR: Set ANTHROPIC_API_KEY environment variable or pass as argument.")
    print("Usage: python3 server.py YOUR_API_KEY")
    sys.exit(1)

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"

class Proxy(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        try:
            req = urllib.request.Request(ANTHROPIC_URL, data=body, headers={
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "anthropic-version": "2023-06-01",
            })
            resp = urllib.request.urlopen(req, timeout=120)
            self.send_response(resp.status)
            self._cors()
            self.end_headers()
            self.wfile.write(resp.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self._cors()
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            self.send_response(500)
            self._cors()
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, x-api-key, anthropic-version")
        self.send_header("Access-Control-Max-Age", "86400")

    def log_message(self, format, *args):
        print("[%s] %s" % (self.log_date_time_string(), args[0]))

PORT = 8765
print(f"GDPR AI Analysis proxy → http://localhost:{PORT}")
print(f"Using Anthropic API key: {API_KEY[:8]}...{API_KEY[-4:]}")
httpd = http.server.HTTPServer(("127.0.0.1", PORT), Proxy)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down.")
    httpd.server_close()
