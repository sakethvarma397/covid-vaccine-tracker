import React from "react";

const Results = ({ results }) => {
  return results.every((res) => res === null) ? (
    <div className="no-centers">No centers</div>
  ) : (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Center name</th>
          <th>Availablity</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{results}</tbody>
    </table>
  );
};

export default Results;
