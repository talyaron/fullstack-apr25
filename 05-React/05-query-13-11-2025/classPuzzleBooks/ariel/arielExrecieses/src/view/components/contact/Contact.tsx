import React, { useState } from 'react';
import styles from './Contact.module.scss';
import type { Contact } from './types/Contact';

const ContactList: React.FC = () => {
  // State
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'David Cohen', phone: '050-1234567', email: 'david@example.com' },
    { id: 2, name: 'Sarah Levi', phone: '052-7654321', email: 'sarah@example.com' },
    { id: 3, name: 'Michael Israeli', phone: '054-9876543', email: 'michael@example.com' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'index'>('name');

  // טופס - State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // הוספת איש קשר
  const addContact = () => {
    if (newName.trim() === '' || newPhone.trim() === '' || newEmail.trim() === '') {
      alert('Please fill all fields!');
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: newName,
      phone: newPhone,
      email: newEmail
    };

    setContacts([...contacts, newContact]);
    
    // נקה את הטופס
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  // מחיקת איש קשר
  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // חיפוש
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // מיון
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      // מיון לפי אינדקס מקורי (סדר הוספה)
      return contacts.indexOf(a) - contacts.indexOf(b);
    }
  });

  return (
    <div className={styles.contactList}>
      <h1 className={styles.contactList__title}>📞 Contact List</h1>

      {/* טופס הוספה */}
      <div className={styles.contactList__form}>
        <h2 className={styles.contactList__formTitle}>Add New Contact</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
          className={styles.contactList__input}
        />
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Phone"
          className={styles.contactList__input}
        />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email"
          className={styles.contactList__input}
        />
        <button onClick={addContact} className={styles.contactList__addButton}>
          Add Contact
        </button>
      </div>

      {/* חיפוש */}
      <div className={styles.contactList__search}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search by name..."
          className={styles.contactList__searchInput}
        />
      </div>

      {/* מיון */}
      <div className={styles.contactList__controls}>
        <button 
          onClick={() => setSortBy('name')}
          className={`${styles.contactList__sortButton} ${sortBy === 'name' ? styles['contactList__sortButton--active'] : ''}`}
        >
          Sort by Name
        </button>
        <button 
          onClick={() => setSortBy('index')}
          className={`${styles.contactList__sortButton} ${sortBy === 'index' ? styles['contactList__sortButton--active'] : ''}`}
        >
          Original Order
        </button>
      </div>

      {/* הרשימה */}
      <div className={styles.contactList__items}>
        {sortedContacts.length === 0 ? (
          <p className={styles.contactList__empty}>No contacts found</p>
        ) : (
          sortedContacts.map((contact) => (
            <div key={contact.id} className={styles.contactList__card}>
              <div className={styles.contactList__info}>
                <h3 className={styles.contactList__name}>{contact.name}</h3>
                <p className={styles.contactList__phone}>📱 {contact.phone}</p>
                <p className={styles.contactList__email}>📧 {contact.email}</p>
              </div>
              <button 
                onClick={() => deleteContact(contact.id)}
                className={styles.contactList__deleteButton}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;