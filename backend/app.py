from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('''
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            rating INTEGER NOT NULL,
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    return conn

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')

    # In a real app, you would send an email or save to a database here
    print(f"New contact request: {name} ({email}) - {phone}")
    print(f"Message: {message}")

    return jsonify({"status": "success", "message": "Thank you! Your message has been received."}), 200

@app.route('/api/ratings', methods=['GET'])
def get_ratings():
    conn = get_db_connection()
    ratings = conn.execute('SELECT * FROM ratings ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return jsonify([dict(ix) for ix in ratings])

@app.route('/api/ratings', methods=['POST'])
def add_rating():
    data = request.json
    name = data.get('name')
    rating = data.get('rating')
    comment = data.get('comment')
    
    if not name or not rating:
        return jsonify({"status": "error", "message": "Name and rating are required"}), 400
        
    conn = get_db_connection()
    conn.execute('INSERT INTO ratings (name, rating, comment) VALUES (?, ?, ?)',
                 (name, rating, comment))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "message": "Rating submitted successfully"}), 201

# Serving the React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
