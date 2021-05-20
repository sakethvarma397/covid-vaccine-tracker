import React from "react";

const Card = ({ centers, sessions, addToNotify, notifyList, date }) => {
  centers = centers ? centers : sessions;
  const selectCenter = (id, name) => {
    addToNotify({ id: id, name: name });
  };
  const data = centers.map((center) => (
    <CenterInfo
      {...center}
      tracked={notifyList.find((item) => item.id === center.center_id)}
      name={center.name}
      key={center.center_id}
      selectCenter={selectCenter}
      date={date}
    />
  ));
  return date ? <>{data}</> : null;
};

const CenterInfo = ({
  date,
  center_id,
  name,
  sessions,
  available_capacity,
  selectCenter,
  tracked,
}) => {
  let className = tracked ? "tracked" : "not-tracked";
  let btnClassname = tracked ? "btn-success" : "btn-info";
  available_capacity = sessions
    ? sessions[0].available_capacity
    : available_capacity;
  var availablity = available_capacity > 0 ? "available" : "not-available";
  return (
    <tr className={` ${className} ${availablity}`}>
      <td className="centre-name">{name}</td>
      <td className="available-slots">{available_capacity}</td>
      <td>{date}</td>
      <td>
        {available_capacity > 0 ? (
          <div>Available</div>
        ) : (
          <button
            className={`btn ${btnClassname}`}
            onClick={() => {
              selectCenter(center_id, name);
            }}
          >
            {tracked ? "Tracking" : "Track"}
          </button>
        )}
      </td>
    </tr>
  );
};
export default Card;
