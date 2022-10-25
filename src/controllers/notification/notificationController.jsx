/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import { React, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router';
import NotificationView from '../../views/notification/notificationView';
import NotificationUpdater from '../../views/notification/notificationUpdater';

function NotificationController({ view }) {
  // const form = useRef();
  const [orderNum, setOrderNum] = useState(0);
  const navigate = useNavigate();

  // generate a five digit number for the contact_number variable
  function randomNumberInRange(min, max) {
    // get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // setOrderNum(randomNumberInRange(1, 10000));
  const randomizeOrderNum = () => {
    setOrderNum(randomNumberInRange(1, 100000));
  };

  const sendOrderEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_m9xlrha', 'contact_form', e.target, 'gxDx8TedOJG-NvjPo')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  const sendAccountEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_m9xlrha', 'account_form', e.target, 'gxDx8TedOJG-NvjPo')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  const changeToUpdateView = () => {
    navigate('/notifierUpdate');
  };

  const NotifierView = {
    order: <NotificationView
      sendOrderEmail={sendOrderEmail}
      orderNum={orderNum}
      randomizeOrderNum={randomizeOrderNum}
      changeToUpdateView={changeToUpdateView}
    />,
    update: <NotificationUpdater
      sendAccountEmail={sendAccountEmail}
    />,
  };

  return (
    NotifierView[view]
  );
}

export default NotificationController;

// Exported Lite Version for use on other pages.
export const sendFullOrderEmail = (e) => {
  e.preventDefault();

  emailjs.send('service_m9xlrha', 'contact_form', e.target, 'gxDx8TedOJG-NvjPo')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  e.target.reset();
};

// Exported Lite version for account notification.
export const sendFullAccountEmail = (e) => {
  e.preventDefault();

  emailjs.send('service_m9xlrha', 'account_form', e.target, 'gxDx8TedOJG-NvjPo')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  e.target.reset();
};
