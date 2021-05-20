import axios from "axios";
const getDateReprestation = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "-" + mm + "-" + yyyy;
};

const getStates = async () => {
  let url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  let resp = await axios.get(url);
  return resp.data.states;
};

const getDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() - 1);
  const date = [getDateReprestation(today), getDateReprestation(tomorrow)];
  return date;
};

const getDistricts = async (state_id) => {
  let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`;
  let resp = await axios.get(url);
  return resp.data.districts;
};

const parsePincodes = (pincodes) => {
  var pincodesArray = pincodes.split(",");
  return pincodesArray.map((str) => {
    return parseInt(str.trim());
  });
};

const notifyMe = () => {};
export { getDates, notifyMe, getStates, getDistricts, parsePincodes };
