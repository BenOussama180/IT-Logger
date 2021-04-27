import React from 'react'
import {connect} from 'react-redux'
import {deleteTech} from '../../actions/techActions'
import M from 'materialize-css/dist/js/materialize.min.js';




const TechItem = ({ tech, deleteTech }) => {

    const onClick = () => {
        deleteTech(tech.id);
        M.toast({ html : 'Technician Deleted' })
        
    };
    return (
        <li className="collection-item">
            <div>
                {tech.firstName} {tech.lastName}
                <a href="#!" className="secondary-content" onClick={onClick}>
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
};

export default connect(null, { deleteTech })(TechItem);
