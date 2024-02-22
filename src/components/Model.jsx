import { AiOutlineClose } from 'react-icons/ai'
import { createPortal } from 'react-dom'


const Model = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            {isOpen && (
                <>
                    <div className='  z-50   min-h-[200px] m-auto  max-w-[370px] top-[180px] right-0  left-0 bg-white fixed p-4 rounded-lg'>
                        <div className="flex justify-end">
                            <AiOutlineClose onClick={onClose} className='text-2xl self-end' />
                        </div>
                        {children}
                    </div>
                    <div onClick={onClose} className=' absolute z-40 top-0 h-screen w-screen backdrop-blur ' />
                </>
            )}
        </>
    ,document.getElementById("model-root"));
};



export default Model
