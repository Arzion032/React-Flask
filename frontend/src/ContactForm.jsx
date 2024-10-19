import { useEffect, useState} from "react"

const ContactForm = ({selectedContact, closeModal}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (selectedContact) {
            setFirstName(selectedContact.firstName);
            setLastName(selectedContact.lastName);  
            setEmail(selectedContact.email);
        } else {
           
            setFirstName("");
            setLastName("");
            setEmail("");
        }
    }, [selectedContact]);

    

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        };
        const method = selectedContact ? "PATCH" : "POST";
        const url = selectedContact 
            ? `http://127.0.0.1:5000/update_contact/${selectedContact.id}` 
            : "http://127.0.0.1:5000/create_contact";
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const errordata = await response.json()
            alert(errordata.error)
            
        } else {
            closeModal();
        }
        
    };
    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input 
                type="text" 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input 
                type="text" 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input 
                type="text" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type="submit">
                {selectedContact ? "Update Contact" : "Create Contact"}
            </button>
    </form>
    );
};

export default ContactForm;