import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Contacts from './components/Contacts/Contacts';
import Navbar from './components/Header/Navbar';
import AddContact from './components/Contacts/AddContact'
import EditContact from './components/Contacts/EditContact'
import ShowContact from './components/Contacts/ShowContact'
import PageNotFound from './components/General/PageNotFound'
import { getContacts } from './services/contactService';
import ContactsIndex from './components/Contacts';
import { ContactConext } from './context/ContactContext';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contactQuery, setContactQuery] = useState({ text: '' });

  useEffect(() => {

    const getData = async () => {

      setLoading(true);

      const { data: contactsData } = await getContacts();
      setContacts(contactsData);
      setFilteredContacts(contactsData)

      setTimeout(() => {
        setLoading(false);
      }, 1000);

    }

    getData();

  }, []);

  const contactSearchFn = (event) => {
    const userText = event.target.value;
    setContactQuery({ ...contactQuery, text: userText });
    const items = contacts.filter(x => {
      return (
        x.fullname.toLowerCase().includes(userText.toLowerCase())
        ||
        x.mobile.includes(userText)
      )
    });
    setFilteredContacts(items);
  }


  return (
    <ContactConext.Provider value={{
      loading,
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      contactQuery,
      contactSearch: contactSearchFn
    }}>
      <div className="App mb-5">
        <Navbar />
        {/* <Outlet /> */}
        <Routes>

          <Route path='/' element={<Navigate to='/contacts' />} />

          <Route path='/contacts' element={<ContactsIndex />}>
            <Route index element={<Contacts />} />
            <Route path='add' element={<AddContact />} />
            <Route path=':id/edit' element={<EditContact />} />
            <Route path=':id/show' element={<ShowContact />} />
          </Route>

          <Route path='/404' element={<PageNotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </div>
    </ContactConext.Provider>
  );
}

export default App;
