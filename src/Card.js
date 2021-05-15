import React from "react";

const Card = ({ centers, addToNotify, notifyList, date }) => {
  const selectCenter = (id) => {
    console.log(id, "has been selected");
    addToNotify(id);
  };
  const data = centers.map((center) => (
    <CenterInfo
      {...center}
      tracked={notifyList.find((center_id) => center_id === center.center_id)}
      name={center.name}
      key={center.center_id}
      selectCenter={selectCenter}
      date={date}
    />
  ));
  return <div>{data}</div>;
};

const CenterInfo = ({
  date,
  center_id,
  name,
  sessions,
  selectCenter,
  tracked,
}) => {
  var className = tracked ? "tracked" : "not-tracked";
  return (
    <div className={`centers ${className}`}>
      <div className="centre-name">{name}</div>
      <div>{`Available slots : ${sessions[0].available_capacity}`}</div>
      <div>{date}</div>
      <button
        onClick={() => {
          selectCenter(center_id);
        }}
      >
        Track
      </button>
    </div>
  );
};
export default Card;
