import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json() 
    setContacts(data.contacts);
    console.log(data.contacts)

  };


  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true)
  };
    
  const deleteUser = async (id) => {
    console.log("Attempting to delete user with ID:", id);
    const options = {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json'
      }
  };
    const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
    const data = await response.json();
    console.log("Response status:", response.status);
    if (response.status === 200) {
    alert(data.message)
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
    }
    else {
      alert(data.error)
    }
  };

  const openCreateModal = () => {
  setIsModalOpen(true)
  }

  return (
  <> 
    <ContactList contacts={contacts} handleUpdate={handleUpdate} deleteUser={deleteUser} setContacts={setContacts}/>
    <button onClick={openCreateModal}>Create New Contact</button>
    {isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm contacts={contacts}selectedContact={selectedContact} closeModal={closeModal} setContacts={setContacts}/>
        
      </div>
    </div>

    }
  </>
  );
}

export default App
