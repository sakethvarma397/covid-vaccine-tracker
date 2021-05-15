import React from "react";

const Notify = ({ notifyList, phoneNumbers }) => {
  return (
    <div>
      {phoneNumbers.length ? (
        <div>Will be notified</div>
      ) : (
        <div>No phone numbers</div>
      )}
    </div>
  );
};

export default Notify;
