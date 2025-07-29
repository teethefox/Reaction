import React, { useEffect } from 'react';
import './ShareModal.css'; // optional if you want to style it separately

const ShareModal = ({ isOpen, onClose, shareUrl }) => {
  // Close on background click
  useEffect(() => {
    const handleClickOutside = (e) => {
        const modal= '';
        if (document.getElementById('share-nmodal')){
      const modal = document.getElementById('share-modal');
    } 
      if (modal && e.target === modal) {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      alert('Link copied!');
    } catch (err) {
      alert('Failed to copy link.');
    }
  };

  if (!isOpen) return null;

  return (
    <div id="share-modal" className="modal-backdrop">
      <div className="modal-content">
        <h2>Share this product</h2>
        <p>{shareUrl || window.location.href}</p>
        <button onClick={handleCopy}>Copy Link</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareModal;
