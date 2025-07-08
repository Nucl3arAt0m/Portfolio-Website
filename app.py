from flask import Flask, jsonify, send_from_directory, render_template_string, request
import platform
import sys

app = Flask(__name__, static_folder="static", static_url_path="/static")

@app.route("/")
def index():
    return send_from_directory('.', 'index.html')

@app.route("/about.html")
def about():
    return send_from_directory('.', 'about.html')

@app.route("/get_visitor_info")
def get_visitor_info():
    # Get basic visitor info
    ip = request.remote_addr or "Unknown"
    user_agent = request.headers.get('User-Agent', 'Unknown')
    # Simple browser/os detection
    browser = "Unknown"
    os = "Unknown"
    if "Firefox" in user_agent:
        browser = "Firefox"
    elif "Chrome" in user_agent:
        browser = "Chrome"
    elif "Safari" in user_agent:
        browser = "Safari"
    elif "Edge" in user_agent:
        browser = "Edge"
    if "Windows" in user_agent:
        os = "Windows"
    elif "Linux" in user_agent:
        os = "Linux"
    elif "Mac" in user_agent:
        os = "MacOS"
    # For demo, location is not available without a geoip service
    location = "Unknown (demo)"
    return jsonify({
        "ip": ip,
        "location": location,
        "browser": browser,
        "os": os
    })

if __name__ == "__main__":
    app.run(debug=True)