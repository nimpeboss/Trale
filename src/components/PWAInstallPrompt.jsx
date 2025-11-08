import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PWAInstallPrompt({ onInstall, onDismiss }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setInstallPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      // Hide the prompt when app is installed
      setShowPrompt(false);
      setInstallPrompt(null);
      if (onInstall) onInstall();
    };

    globalThis.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    globalThis.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      globalThis.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      globalThis.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onInstall]);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    const result = await installPrompt.prompt();
    console.log('PWA install prompt result:', result);

    // Clear the saved prompt since it can only be used once
    setInstallPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (onDismiss) onDismiss();
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-install-prompt">
      <div className="pwa-install-content">
        <div className="pwa-install-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="#667eea" stroke="#764ba2" strokeWidth="2"/>
            <path d="M20 8 A 12 12 0 0 1 20 32 Z" fill="#ffffff"/>
            <rect x="8" y="18" width="24" height="4" fill="#333"/>
            <circle cx="20" cy="20" r="4" fill="#ffffff" stroke="#333" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="1.5" fill="#333"/>
          </svg>
        </div>
        
        <div className="pwa-install-text">
          <h3>Install Pokemon Battle</h3>
          <p>Add this game to your home screen for quick access and offline play!</p>
        </div>
        
        <div className="pwa-install-actions">
          <button 
            className="pwa-install-button install"
            onClick={handleInstallClick}
            aria-label="Install Pokemon Battle app"
          >
            Install App
          </button>
          <button 
            className="pwa-install-button dismiss"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

PWAInstallPrompt.propTypes = {
  onInstall: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default PWAInstallPrompt;