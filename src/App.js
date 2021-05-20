import React, { useEffect, useState } from "react";
import { fetchIteratively, fetchDataByDistrict } from "./fetchData";
import Card from "./Card";
import { getDates, parsePincodes, getStates, getDistricts } from "./utils";
import Modal from "./Modal";
import Notify from "./Notify";
import Results from "./Results";

function App() {
  const [pincodes, setPincodes] = useState("500037,500032, 500085");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [notifyList, setNotifyList] = useState([]);
  const dates = getDates();

  // Get all states
  useEffect(() => {
    getStates().then((states) => setStates(states));
  }, []);

  // Get all districts of the selected state
  useEffect(() => {
    let selectedState = states.find((obj) => obj.state_name === state);
    if (selectedState) {
      getDistricts(selectedState.state_id).then((districts) =>
        setDistricts(districts)
      );
    }
  }, [state]);

  const getDataByPincode = (e) => {
    e.preventDefault();
    fetchIteratively(parsePincodes(pincodes), dates).then((data) =>
      setData(data)
    );
  };

  const getDataByDistrict = () => {
    if (district) {
      let selectedDistrict = districts.find(
        (obj) => obj.district_name === district
      );
      fetchDataByDistrict(selectedDistrict.district_id, dates).then((data) =>
        setData(data)
      );
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addToNotifyList = (item) => {
    if (!notifyList.find((center) => item.id === center.center_id)) {
      setNotifyList([...notifyList, item]);
    }
  };

  var results = data.map((e, i) => {
    return (
      <Card
        date={dates[i]}
        key={i}
        addToNotify={addToNotifyList}
        notifyList={notifyList}
        {...e.data}
      />
    );
  });

  return (
    <div className="container">
      <h1>Track Covid-19 vaccine</h1>
      <div>
        <form className="pincode-form" onSubmit={getDataByPincode}>
          Enter pincode/s
          <input
            value={pincodes}
            onChange={(e) => setPincodes(e.target.value)}
          />
          <button>Search</button>
        </form>
        <div className="state-district">
          Enter state
          <select
            value={state}
            placeholder="Select state"
            onChange={(e) => setState(e.target.value)}
            disabled={!states}
          >
            <option />
            {states.map((obj) => {
              return (
                <option key={obj.state_id} value={obj.state_name}>
                  {obj.state_name}
                </option>
              );
            })}
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!districts}
          >
            <option></option>
            {districts.map((obj) => {
              return (
                <option key={obj.district_id} value={obj.district_name}>
                  {obj.district_name}
                </option>
              );
            })}
          </select>
          <button onClick={getDataByDistrict}>Search</button>
        </div>
      </div>
      {showModal ? (
        <Modal>
          <Notify toggleModal={toggleModal} notifyList={notifyList}></Notify>
        </Modal>
      ) : null}
      <div className="results">
        <Results results={results} />
      </div>
      {notifyList.length ? (
        <button
          className="notify btn btn-danger"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Notify me!
        </button>
      ) : null}
    </div>
  );
}

export default App;
