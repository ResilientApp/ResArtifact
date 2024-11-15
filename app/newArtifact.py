from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/pages/auth/new-artifact', methods=['POST'])
def create_transaction():
    # Get the data from the frontend
    data = request.json

    # Extract transaction data
    name = data.get('name')
    description = data.get('description')
    image = data.get('image')
    year = data.get('year')

    # Here you can create the transaction logic (e.g., store in the database, process it, etc.)
    # For now, just print the received data
    print(f"Transaction created: {name}, {description}, {image}, {year}")

    # Respond back with a success message
    return jsonify({"status": "success", "message": "Transaction created successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
