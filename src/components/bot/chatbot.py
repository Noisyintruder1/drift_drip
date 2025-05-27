from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.chat.util import Chat, reflections

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Chatbot response pairs
pairs = [
    (r"hi|hello|hey", ["Hello! How can I assist you today?", "Hi there! How can I help?"]),
    # ... (keep your existing pairs)
]

chatbot = Chat(pairs, reflections)

@app.route('/')
def home():
    return jsonify({
        'message': 'Chatbot API is running',
        'status': 'success'
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({
                'status': 'error',
                'message': 'Invalid request format. Please provide a "message" field.'
            }), 400

        user_input = data['message'].strip()
        
        if not user_input:
            return jsonify({
                'status': 'error',
                'message': 'Message cannot be empty'
            }), 400

        if user_input.lower() in ['quit', 'bye', 'goodbye']:
            return jsonify({
                'status': 'end',
                'message': "Goodbye! Have a nice day.",
                'suggestions': []
            })

        response = chatbot.respond(user_input)
        
        suggestions = []
        if 'android' in user_input.lower():
            suggestions = ["What languages do you teach for Android?", "How long is the Android course?"]
        elif 'full stack' in user_input.lower():
            suggestions = ["What frontend technologies do you cover?", "Do you teach databases in Full Stack?"]
        
        return jsonify({
            'status': 'success',
            'message': response,
            'suggestions': suggestions
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'An error occurred: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)