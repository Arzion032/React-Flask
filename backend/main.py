from flask import redirect, url_for, request, jsonify
from config import app, db
from models import Contact


@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = map(lambda x: x.to_json(), contacts)
    return jsonify({"contacts": list(json_contacts)})

@app.route('/create_contact', methods=['POST'])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    existing_emails = [email[0] for email in db.session.query(Contact.email).all()]
   
    if not first_name or not last_name or not email:
        return (
            jsonify({"error": "All fields are required"}), 
            400,
            )
    if email in existing_emails:
        return jsonify({"error": "Email already exists"}), 400
    
    else:
        contact = Contact(first_name=first_name, last_name=last_name, email=email)
        try:
            db.session.add(contact)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": "gago"}), 400
        
        return jsonify({"message": "Contact created successfully"}), 201

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    data = request.json

    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.first_name)
    contact.email = data.get("email", contact.email)
    
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    

    
    return jsonify({"message": "Contact updated successfully"}), 200
    
@app.route("/delete_contact/<int:user_id>", methods=["DELETE","OPTIONS"])
def delete_contact(user_id):
    if request.method == 'OPTIONS':
        return '', 200
    contact = Contact.query.get(user_id)
    if not contact:
        return (jsonify({"error": "User not found"}), 404)
    
    
    db.session.delete(contact)
    db.session.commit()
    return (
        jsonify(
            {
                "message": "Contact Successfully deleted"
            }
        ), 200
    )
    
    
        

if __name__ == "__main__":
    
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)