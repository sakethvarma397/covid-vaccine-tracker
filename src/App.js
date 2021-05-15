import React, { useState } from "react";
import fetchDataByPin from "./fetchData";
import Card from "./Card";

function App() {
  const [pincode, setPincode] = useState("500037");
  const [data, setData] = useState([]);
  const [notifyList, setNotifyList] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const dates = ["15-05-2021", "16-05-2021", "17-05-2021"];

  const getData = (event) => {
    event.preventDefault();
    fetchDataByPin(pincode, dates).then((resp) => setData(resp));
  };

  const addToNotifyList = (item) => {
    setNotifyList([...notifyList, item]);
  };

  const notifyMe = () => {
    // can add the async loops here. Keep searching till a center is available
    if (notifyList.length === 0) {
      alert("Please track the centers");
      return;
    }
    if (phoneNumbers.length === 0) {
      alert("Please enter your phone number");
    } else {
      console.log(phoneNumbers, "You will be notified. Take care!");
    }
  };

  var results = data.map((e, i) => {
    if (e.data.centers.length !== 0) {
      return (
        <Card
          date={dates[i]}
          key={i}
          addToNotify={addToNotifyList}
          notifyList={notifyList}
          {...e.data}
        />
      );
    } else {
      return null;
    }
  });
  return (
    <div>
      <header>Covid-19 vaccine Tracking App</header>
      <div className="container">
        <form className="pincode-form" onSubmit={(event) => getData(event)}>
          Enter pincode
          <input
            type="number"
            className="input-pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button>Search</button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPhoneNumbers([...phoneNumbers, phoneNumber]);
            setPhoneNumber("");
            console.log(phoneNumber, " is added");
          }}
        >
          Enter your phone number :
          <input
            type="tel"
            placeholder="9573465572"
            pattern="[0-9]{10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button>{phoneNumbers.length ? "Add another" : "Add"}</button>
        </form>
      </div>
      {results.every((res) => res === null) ? null : (
        <div className="results">{results}</div>
      )}
      {notifyList.length ? (
        <button className="notify" onClick={notifyMe}>
          Notify me!
        </button>
      ) : null}
    </div>
  );
}

export default App;
