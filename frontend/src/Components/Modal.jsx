
import React from 'react';
import { motion } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-5vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: { delay: 0.1 },
  },
};

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 sm:w-auto w-full mx-4 md:mx-0 border-4 border-zinc-500" 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {children}
            {/* <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <p className="mb-4">This is a modal body.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
