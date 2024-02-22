import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddAndUpdate from './AddAndUpdate';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';


const ContactCard = ({contacts}) => {

    const { isOpen, onClose, onOpen} = useDisclouse();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db,"contacts", id));
            toast.error("Contact Deleted Successfully..!")
            // console.log("deleted");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
        <div key={contacts.id} className= ' mt-4 bg-[#9000ff] justify-between flex items-center p-2 rounded-lg '>
            <div className='flex gap-2 '>
                <HiOutlineUserCircle className='text-orange text-4xl' />
                <div className="text-green  ">
                    <h2 className='text-[20px] font-medium text-white'>{contacts.name}</h2>
                    <p className='text-sm text-white'>{contacts.email}</p>
                    
                </div>
            </div>
            <div className="flex text-3xl gap-2">
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer text-[#34f013]' />
                <IoMdTrash onClick={() => deleteContact(contacts.id)} className='text-white cursor-pointer' />
            </div>
        </div>
        <AddAndUpdate contacts={contacts} isUpdate isOpen={isOpen} onClose={onClose}/>
        </>
    )
}

export default ContactCard
