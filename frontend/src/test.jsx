import React, { useState } from 'react';

const ContactsComponent = () => {
  // State to manage contact details and selected contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);  // Track the selected contact for updating

  // Sample contacts array
  const contacts = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com" }
  ];

  // Function to handle the update button click
  const handleUpdate = (contact) => {
    // Set the state with the selected contact's information
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setEmail(contact.email);
    setSelectedContact(contact.id);  // Save the contact ID
  };

  // Function to handle the form submission (Update Contact)
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Updated contact:", { firstName, lastName, email });
    // You would typically send this updated contact data to your server here
  };

  return (
    <div>
      <h1>Contact List</h1>
      <table>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                {/* When "Update" is clicked, pass the contact data to handleUpdate */}
                <button onClick={() => handleUpdate(contact)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditional rendering: Show form only when a contact is selected for updating */}
      {selectedContact && (
        <div>
          <h2>Update Contact</h2>
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
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactsComponent;
