/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React from 'react';
import emailjs from '@emailjs/browser';
import NotificationView from '../../views/notification/notificationView';

function NotificationController() {
  // const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_m9xlrha', 'contact_form', e.target, 'gxDx8TedOJG-NvjPo')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  return (
    <NotificationView
      sendEmail={sendEmail}
    />
  );
}

export default NotificationController;
