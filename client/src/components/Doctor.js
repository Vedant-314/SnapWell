import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
    const navigate = useNavigate();
  return (
    <div className="card p-2" onClick={()=>navigate(`/book-appointment/${doctor._id}`)}>
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr/>
      <p>
        <b>Specialization: </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Phone No: </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per visit (Rs): </b>
        {doctor.feePerConsultation}
      </p>
      <p>
        <b>Experience (Yrs): </b>
        {doctor.experience}
      </p>
      <p>
        <b>Timings: </b>
        {doctor.timings[0]} {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
