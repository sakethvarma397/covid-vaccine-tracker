import axios from "axios";

const fetchIteratively = async (pincodes, dates) => {
  var data = [];
  var promises = [];
  for (let i = 0; i < pincodes.length; i++) {
    promises.push(fetchDataByPin(pincodes[i], dates));
  }
  var response = await Promise.all(promises);
  for (let i = 0; i < response.length; i++) {
    data = [...data, ...response[i]];
  }
  return data;
};

const fetchDataByPin = async (pincode, dates) => {
  try {
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[0]}`;
    let p1 = axios.get(url);
    url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[1]}`;
    let p2 = axios.get(url);

    let responses = await Promise.all([p1, p2]);
    return responses.filter((resp) => resp.data.centers.length !== 0);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchDataByDistrict = async (district_id, dates) => {
  try {
    let url1 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${dates[0]}`;
    let p1 = axios.get(url1);
    let url2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${dates[1]}`;
    let p2 = axios.get(url2);

    let responses = await Promise.all([p1, p2]);
    return responses.filter((resp) => resp.data.sessions.length !== 0);
  } catch (e) {
    console.log(e);
    return [];
  }
};
export { fetchIteratively, fetchDataByDistrict };
