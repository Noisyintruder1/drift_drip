from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.chat.util import Chat, reflections

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Chatbot response pairs
pairs = [
    (r"hi|hello|hey", ["Hello! How can I assist you today?", "Hi there! How can I help?"]),
    
    # Existing pairs...
    
    # Add new pairs below:
    (r"what is your name|who are you", 
     ["I'm your friendly chatbot assistant!", "You can call me ChatBot!"]),
     
    (r"how are you|how's it going", 
     ["I'm doing great, thanks for asking! how may i assist you today",]),
     
    (r"thank you|thanks", 
     [ "Happy to help!"]),
     
    (r"bye|goodbye|see you", 
     ["Goodbye! Have a nice day!"]),
     
    (r"help|support", 
     [" What do you need?",]),
     
    (r"(.*)(buy|purchase)(.*)", 
     ["Would you like to purchase one item or more than one"]),
     
    (r"one", 
     ["Click The purchase button on Getproduct,Enter you Phone Number,Receive an Mpesa Message,then enter Mpesa pin to complete Payment "]),

      (r"More than one", 
     [" select the prodect by clicking The Cart button on Getproduct once clicked,click the cart icon on the Navbar,click procced to cheakout ,Enter you phone number,Receive an Mpesa Message,then enter Mpesa pin to complete Payment "]),

      (r"(.*)(human|customercare)(.*)", 
     ["Contact your front desk manager on 0792827049"]),
     
    (r"()", 
     [
      "I'm still learning. Could you ask me something else?"])
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