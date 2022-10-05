/* eslint-disable no-console */
import React from 'react';
import emailjs from '@emailjs/browser';
import notificationView from '../../views/notification/notificationView';

function notificationController() {
  // const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'contact_form', e.target, 'gxDx8TedOJG-NvjPo')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  return (
    <notificationView
      sendEmail={sendEmail}
    />
  );
}

export default notificationController;
