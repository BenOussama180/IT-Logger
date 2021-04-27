import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateLog } from "../../actions/logAction";

import M from "materialize-css/dist/js/materialize.min.js";
import TechSelectOptions from "../techs/TechSelectOptions";

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onsubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const upLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date(),
      };
      updateLog(upLog);
      M.toast({ html: `Log updated by ${tech}` });

      //Clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
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
                Select a new Tech
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

const mapStateToProps = (state) => ({
  current: state.log.current,
});
export default connect(mapStateToProps, { updateLog })(EditLogModal);
