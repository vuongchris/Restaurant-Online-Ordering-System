/* eslint-disable react/prop-types */
import React from 'react';
import './Notification.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import notificationController from '../../controllers/notification/notificationController';

function NotificationView({
  sendEmail,
  orderNum,
  randomizeOrderNum,
}) {
  return (
    <div>
      <div className="container">
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input type="text" className="form-control" placeholder="Name" name="name" />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input type="email" className="form-control" placeholder="Email Address" name="email" />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input type="text" className="form-control" placeholder="Subject" name="subject" />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message" />
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input type="submit" onClick={randomizeOrderNum} className="btn btn-info" value="Send Message" />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input type="hidden" className="form-control" value={orderNum} name="contact_number" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotificationView;
