import React, { useState } from "react";
import { connect } from "react-redux";
import { addTech } from '../../actions/techActions'

import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onsubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please enter a first & a last name" });
    } else {
      const t = {
        firstName,
        lastName
      };
      addTech(t);
      M.toast({ html: `Tech added successfully` });
      //Clear fields
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
            />
            <label htmlFor="lastName">
              Last Name
            </label>
          </div>
        </div>
        <a
          href="#!"
          onClick={onsubmit}
          className="modal-close waves-effect blue waves-light btn-large pulse"
        >
          Enter <i className="material-icons right">send</i>
        </a>
      </div>
    </div>
  );
};

export default connect(null, { addTech })(AddTechModal);
