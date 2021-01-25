import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios'
import {Link} from 'react-router-dom'


class User extends Component {
    state = {
        isVisible: false
    }
    static defaultProps = {
        name: "Bilgi yok",
        salary: "Bilgi yok",
        department: "Bilgi yok"
    }
    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    onDeleteUser = async(dispatch, e) => {
        // Delete User
        const {id} = this.props;
        // Delete Request
        await axios.delete(`http://localhost:3004/users/${id}`);

        // Consumer Dispatch
        dispatch({type: "DELETE_USER", payload:id});
        
    }
    render() {
        //Destruction
        const {id, name, department, salary} = this.props;
        const {isVisible} = this.state;

        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className = "mb-4 col-md-8">
                                <div className = "card" style = {isVisible ? null : {backgroundColor : "#62848d"}}>
                                    <div className = "card-header d-flex justify-content-between align-items-center">
                                        <h4 className ="d-inline" onClick = {this.onClickEvent} style = {{cursor:"pointer"}}>{name}</h4>
                                        <i className= "far fa-trash-alt" onClick = {this.onDeleteUser.bind(this, dispatch)} style = {{cursor:"pointer", color:"red"}}></i>
                                    </div>
                                    {
                                        isVisible ? 
                                        <div className = "card-body">
                                            <p className = "card-text">Department: {department}</p>
                                            <p className = "card-text">Salary: {salary}$</p>
                                            <Link to = {`edit/${id}`} className = "btn btn-dark btn-block">Update User</Link>
                                        </div>
                                         : null
                                    }
                                    
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
        
    }
}
User.propTypes = {
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default User;