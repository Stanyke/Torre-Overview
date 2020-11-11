import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

class home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             currentUsername: "Stanyke"
        }
    }
    
    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-sm">
                    <Link className="navbar-brand" to="/">Torre APIs Overview</Link>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="btn nav-link p-2" to="/jobs">Find Jobs</Link>
                        </li>
                    </ul>
                </nav>

                <div className="container">
                    <form onSubmit={this.searchUsername}>
                        <input type="text" class="form-control userInput p-3 mb-2" id="userInput" value={this.state.currentUsername} onChange={(e) => this.setState({ currentUsername: e.target.value})} placeholder="Search Username" />

                        <button type="button" class="form-control usernameButton">Search</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default home
