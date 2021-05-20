import React, { useState } from "react";

const Notify = ({ notifyList, toggleModal }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trackingConfirmed, setTrackingConfirmed] = useState(false);
  const selectedCenters = notifyList.map((e) => e.name);

  /*
   * Add the Backend tracking and Notifying logic here
   * notifyLit - has the center information
   * phoneNumber - has the user's phone number
   */
  const startTracking = () => {
    setTrackingConfirmed(true);
  };

  return (
    <div className="modal-content">
      <h2>Enter your details</h2>
      <div className="selected-center-details">
        <h5>Selected centers</h5>
        <div className="selected-centers">
          {selectedCenters.map((center) => {
            return <div key={center.toLowerCase()}>{center}</div>;
          })}
        </div>
      </div>
      {trackingConfirmed ? (
        <>
          <h1>You will be notified! Take Care!</h1>
          <button className="btn btn-danger" onClick={toggleModal}>
            Go back
          </button>
        </>
      ) : (
        <div>
          <form
            className="phonenumber-form"
            onSubmit={(e) => {
              e.preventDefault();
              setPhoneNumber(phoneNumber);
            }}
          >
            Phone number :
            <input
              type="tel"
              pattern="[0-9]{10}"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <div className="modal-buttons">
            <button className="btn btn-danger" onClick={toggleModal}>
              Go back
            </button>
            <button className="btn btn-success" onClick={startTracking}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notify;
