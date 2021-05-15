import axios from "axios";

// const fetchData = () => {
const fetchDataByPin = async (pincode, dates) => {
  try {
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[0]}`;
    var p1 = axios.get(url);
    url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[1]}`;
    var p2 = axios.get(url);
    url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[2]}`;
    var p3 = axios.get(url);

    return await Promise.all([p1, p2, p3]);
  } catch (err) {
    console.log(err);
  }
};

//   const fetchDataByDistrict = () => {};
// };

export default fetchDataByPin;
