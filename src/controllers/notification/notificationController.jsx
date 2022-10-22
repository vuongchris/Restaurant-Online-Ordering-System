/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import { React, useState } from 'react';
import emailjs from '@emailjs/browser';
import NotificationView from '../../views/notification/notificationView';

function NotificationController() {
  // const form = useRef();
  const [orderNum, setOrderNum] = useState(0);

  // generate a five digit number for the contact_number variable
  function randomNumberInRange(min, max) {
    // get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // setOrderNum(randomNumberInRange(1, 10000));
  const randomizeOrderNum = () => {
    setOrderNum(randomNumberInRange(1, 100000));
  };

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
      orderNum={orderNum}
      randomizeOrderNum={randomizeOrderNum}
    />
  );
}

export default NotificationController;
