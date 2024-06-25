import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaClipboard,
} from "react-icons/fa";

const SharePopup = ({ isOpen, onClose, url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold">Share this page</h2>
          <button
            type="button"
            className="text-gray-400 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex justify-around pt-5">
          <a
            href="https://facebook.com/sharer/sharer.php?u=YOUR_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href="https://twitter.com/intent/tweet?url=YOUR_URL&text=YOUR_TEXT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url={YOUR_URL}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={32} />
          </a>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <FaClipboard size={24} />
            <span>{isCopied ? "Copied!" : "Copy URL"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
