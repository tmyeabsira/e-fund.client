import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp, FaClipboard } from 'react-icons/fa';

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
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Share this page</h2>
                    <button onClick={onClose} className="text-black">✖</button>
                </div>
                <div className="flex justify-around">
                    <a href="https://facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={32} />
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=YOUR_URL&text=YOUR_TEXT" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={32} />
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url={YOUR_URL}" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={32} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={32} />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={32} />
                    </a>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={copyToClipboard} className="flex items-center space-x-2 bg-gray-200 p-2 rounded text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        <FaClipboard size={24} />
                        <span>{isCopied ? "Copied!" : "Copy URL"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SharePopup;
