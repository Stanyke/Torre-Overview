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
             currentUsername: "Stanyke",
             userDetails: {},
             errorMsg: ""
        }

        toast.configure()
    }

    componentDidMount(){
        var beatLoaders = document.getElementById("beatLoaders");

        axios.get(`https://thingproxy.freeboard.io/fetch/https://torre.bio/api/bios/${this.state.currentUsername}`,{
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(response => {
            beatLoaders.style.display = "none";

            if(response.data.message && response.data.code)
            {
                toast.info(response.data.message, {position: toast.POSITION.TOP_LEFT, autoClose: 2000});
                this.setState({
                    errorMsg: response.data.message
                })
                console.log(response.data.message)
            }
            else
            {
                let responseData = response.data
                this.setState({
                    userDetails: responseData
                })
                console.log(response.data)
            }
        })
        .catch((err) => {
            beatLoaders.style.display = "none";
            
            toast.error("There was a problem while getting user, possibly because user does not exist.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "There was a problem while getting user, possibly because user does not exist."
            })
                
            console.log("There was a problem while getting user, possibly because user does not exist.")
        })
        
      
    }
    
    render() {

        const { userDetails, currentUsername, errorMsg } = this.state;
        const errorColor = {"color": "#cddc39"}
        const imgStyle = {width: '100%', height: '350px'}
        const boldTitle = {"color": "#cddc39"}

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

                <div className="container mb-5">
                    
                    <form onSubmit={this.searchUsername} className="mb-5">
                        <input type="text" class="form-control userInput p-3 mb-2" id="userInput" value={this.state.currentUsername} onChange={(e) => this.setState({ currentUsername: e.target.value})} placeholder="Search Username" />

                        <button type="submit" class="form-control usernameButton">Search</button>
                    </form>

                    

                    
                    <div className="profileCard mt-5" id="profileCard">
                        {
                            userDetails.person ?

                            <div className="row">

                                <div className="col-md-4">
                                    <img src={userDetails.person.picture} style={imgStyle} alt="User Cover" />
                                </div>

                                <div className="col-md-8">
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Name:</b> {userDetails.person.name}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Title:</b> {userDetails.person.professionalHeadline}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Username:</b> {userDetails.person.publicId}</div>


                                    {
                                        userDetails.person.links.length ?
                                        userDetails.person.links.map(link => 
                                            <div className="mb-2"><b style={boldTitle} className="pr-3">Other Link:</b> <a href={link.address} target="_blank" rel="noreferrer">{link.address}</a></div>
                                        ) : null
                                    }
                                    

                                    <br/>
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Bio:</b> {userDetails.person.summaryOfBio}</div>

                                    <br/>
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Location:</b> {userDetails.person.location.name}</div>

                                    {
                                        userDetails.languages.length ?

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Languages:</b>
                                            {
                                                userDetails.languages.map(language => `${language.language}, ` )
                                            }
                                        </div>: null
                                    }

                                    {
                                        userDetails.interests.length ?

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Interested In:</b>
                                            {
                                                userDetails.interests.map(interest => `${interest.name}, ` )
                                            }
                                        </div>:null
                                    }
                                    

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Account Created:</b> {userDetails.person.created}</div>
                                    
                                </div>
                            </div>
                            : null
                        }

                        {
                            errorMsg ? <div align="center" className="col-12" style={errorColor}>{errorMsg}</div>
                            : null
                        }
                    </div>

                </div>

                <div id="beatLoaders" align="center">
                    <BeatLoader size={50} color="#cddc39" loading />
                    <b>Profile Loading...</b>
                </div>
                
            </div>
        )
    }

    searchUsername = (event) => {
        event.preventDefault()

        var beatLoaders = document.getElementById("beatLoaders");
        beatLoaders.style.display = "block"
        
        this.setState({
            userDetails: {},
            errorMsg: ''
        })

        axios.get(`https://thingproxy.freeboard.io/fetch/https://torre.bio/api/bios/${document.getElementById("userInput").value}`,{
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(response => {
            beatLoaders.style.display = "none";

            if(response.data.message && response.data.code)
            {
                toast.info(response.data.message, {position: toast.POSITION.TOP_LEFT, autoClose: 2000});
                this.setState({
                    errorMsg: response.data.message
                })
                console.log(response.data.message)
            }
            else
            {
                let responseData = response.data
                this.setState({
                    userDetails: responseData
                })
                console.log(response.data)
            }
        })
        .catch((err) => {
            beatLoaders.style.display = "none";
            
            toast.error("There was a problem while getting user, possibly because user does not exist.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "There was a problem while getting user, possibly because user does not exist."
            })
                
            console.log("There was a problem while getting user, possibly because user does not exist.")
        })
    }
}

export default home
