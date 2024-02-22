import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { CiSearch } from "react-icons/ci";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdate from './components/AddAndUpdate';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  // states
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();


  useEffect(() => {
    const getContacts = async () => {
      try {

        const contsctsRef = collection(db, "contacts");

        onSnapshot(contsctsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          });
          setContacts(contactList);
          return contactList;
        })

      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);


  const filterContacts = (e) => {
    const value = e.target.value;

    const contsctsRef = collection(db, "contacts");

    onSnapshot(contsctsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };


  return (
    <>
      <div className='max-w-[370px] mx-auto py-4'>
        <NavBar />
        <div className='flex gap-2'>
          <div className='flex-grow flex relative items-center '>
            <CiSearch className='text-white text-2xl absolute  ml-2 ' />
            <input onChange={filterContacts} type="text" className='flex-grow border bg-transparent border-white rounded-md rounded-mg h-10 text-white pl-9' />
          </div>
          <BsFillPlusCircleFill onClick={onOpen} className='text-4xl text-white cursor-pointer' />
        </div>
        <div className='mt-4'>
          {contacts.map(contacts => (
            <ContactCard key={contacts.id} contacts={contacts} />
          ))}
        </div>
      </div>
      <AddAndUpdate
        onClose={onClose}
        isOpen={isOpen}
      />
      <ToastContainer
        position='bottom-center'
       
      />
    </>
  )
}

export default App
