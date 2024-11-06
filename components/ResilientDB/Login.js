import React, { useEffect, useRef, useState } from 'react';
import ResVaultSDK from 'resvault-sdk';
import NotificationModal from './NotificationModal';
import { v4 as uuidv4 } from 'uuid';
import lottie from 'lottie-web/build/player/lottie';


const Login = ({ onLogin }) => {
  const sdkRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }
 
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) return;

    const messageHandler = (event) => {
      const message = event.data;
      console.log("Message sent", message)

      if (
        message &&
        message.type === 'FROM_CONTENT_SCRIPT' &&
        message.data &&
        message.data.success !== undefined
      ) {
        if (message.data.success) {
          const token = uuidv4();
          sessionStorage.setItem('token', token);
          onLogin(token);
        }
      } else if (
        message &&
        message.type === 'FROM_CONTENT_SCRIPT' &&
        message.data &&
        message.data === 'error'
      ) {
        setModalTitle('Authentication Failed');
        setModalMessage(
          'Please connect ResVault to this ResilientApp and try again.'
        );
        setShowModal(true);
      }
    };

    console.log("Adding message handler");
    sdk.addMessageListener(messageHandler);

    return () => {
      sdk.removeMessageListener(messageHandler);
    };
  }, [onLogin]);

  

  const handleAuthentication = () => {
    console.log("Trying to login")
    if (sdkRef.current) {
      console.log("Button works")
      sdkRef.current.sendMessage({
        type: 'login',
        direction: 'login',
      });
      console.log("Message sent to SDK");
    } else {
      setModalTitle('Error');
      setModalMessage('SDK is not initialized.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div>
            <button
              type="button"
              className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              onClick={handleAuthentication}
            >
              Login
            </button>
      </div>

      <NotificationModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Login;