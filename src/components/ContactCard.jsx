import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddAndUpdate from './AddAndUpdate';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";



const ContactCard = ({ contacts }) => {

    const { isOpen, onClose, onOpen } = useDisclouse();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.error("Contact Deleted Successfully..!")
            // console.log("deleted");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div key={contacts.id} className=' mt-4 bg-[#9000ff] justify-between flex items-center p-2 rounded-lg '>
                <div className='flex gap-2 '>
                    <HiOutlineUserCircle className='text-orange text-4xl' />
                    <div className="text-green flex flex-col">
                        <h2 className='text-[20px] font-medium text-white'>{contacts.name}</h2>
                        <a href={`mailto:${contacts.email}`} className='flex flex-row gap-2 items-center'>
                            <MdEmail className='text-white' />
                            <p className='text-sm text-white'>{contacts.email}</p>
                        </a>
                        <a href={`tel:${contacts.phone}`} className='flex flex-row gap-2 items-center'>
                            <IoCall className='text-white' />
                            <p className='text-sm text-white mt-1'>{contacts.phone}</p>
                        </a>

                    </div>
                </div>
                <div className="flex text-3xl gap-2">
                    <a href={`https://wa.me/+91${contacts.phone}?text=I'm%20texting%20you%20from%20your%20App`}><IoLogoWhatsapp className='cursor-pointer text-[#3acd2c]' /></a>
                    <RiEditCircleLine onClick={onOpen} className='cursor-pointer text-[#f9ff43]' />
                    <IoMdTrash onClick={() => deleteContact(contacts.id)} className='text-white cursor-pointer' />
                </div>
            </div>
            <AddAndUpdate contacts={contacts} isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ContactCard
