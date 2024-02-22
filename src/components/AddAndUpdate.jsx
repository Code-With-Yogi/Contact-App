import { collection, doc, updateDoc } from "firebase/firestore";
import Model from "./Model"
import { Form, Formik, Field } from 'formik';
import { db } from "../config/firebase"
import { addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contacts }) => {

    const addCoantact = async (contacts) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contacts);
            toast.success("Contact Added Successfully...!")
            onClose();
        } catch (error) {
            console.log(error)
        }
    }

    const updateContact = async (contacts, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contacts)
            toast.success("Contact Updated Successfully...!")
            onClose();
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div >
            <Model
                isOpen={isOpen}
                onClose={onClose}
            >
                <Formik
                    initialValues={isUpdate ? {
                        name: contacts.name,
                        email: contacts.email,
                        phone: contacts.phone,
                    } : {
                        name: "",
                        email: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contacts.id) : addCoantact(values);

                    }}
                >
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <Field name="name" className="border h-10 rounded-md pl-2" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="border h-10 rounded-md pl-2" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone">Mobile Number</label>
                            <Field type="number" name="phone" className="border h-10 rounded-md pl-2" required />
                        </div>

                        <button type="submit" className="bg-orange px-3 py-1.5  rounded-md text-white">{isUpdate ? "Update" : "Add Contact"}</button>

                    </Form>
                </Formik>
            </Model>
        </div>
    )
}

export default AddAndUpdate
