import React, { useState } from "react";
import { connect } from "react-redux";
import { addLog } from "../../actions/logAction";
import M from "materialize-css/dist/js/materialize.min.js";
import TechSelectOptions from "../techs/TechSelectOptions";

const AddLogModel = ({ addLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onsubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      // Adding new Log
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);
      M.toast({ html: `Log Added by ${tech}` });
      // Clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => {
                e.preventDefault();
                setTech(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a Tech
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => {
                    setAttention(!attention);
                  }}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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

const modalStyle = {
  width: "75%",
  height: "75%",
};

// we're not bringing in any state ( unlike logs component because there is a logReducer ) so mapStateToProps is null

export default connect(null, { addLog })(AddLogModel);
