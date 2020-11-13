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
             errorMsg: "",

             peopleOffset: "",
             peopleSize: "",
             peopleAggregate: "",
             filteredPeopleDetails: {}
        }

        toast.configure()
    }

    componentDidMount(){
        var beatLoaders = document.getElementById("beatLoaders");

        axios.get(`https://cors-anywhere.herokuapp.com/https://torre.bio/api/bios/${this.state.currentUsername}`,{
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
            
            toast.error("There was a problem while getting user, possibly because network issues or user does not exist.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "There was a problem while getting user, possibly because network issues or user does not exist."
            })
                
            console.log("There was a problem while getting user, possibly because network issues or user does not exist.")
        })
        
      
    }
    
    render() {

        const { userDetails, filteredPeopleDetails, errorMsg } = this.state;
        const errorColor = {"color": "#cddc39"}
        const boldTitle = {"color": "#cddc39"}
        const filteredPeopleDesign = {"border": "2px solid whitesmoke"}

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
                        <input type="text" class="form-control userInput p-3 mb-2" id="userInput" value={this.state.currentUsername} onChange={(e) => this.setState({ currentUsername: e.target.value})} placeholder="Search Username" required />

                        <button type="submit" class="form-control usernameButton">Search</button>
                    </form>

                    <div align="center"><u><h3>Filter People</h3></u></div>
                    <form onSubmit={this.filterPeople}>
                        <div className="row">

                            <div className="col-md-4 col-sm-4 col-4">
                                <input type="number" class="form-control userInput p-3 mb-2" value={this.state.peopleOffset} onChange={(e) => this.setState({ peopleOffset: e.target.value})} placeholder="Starting Page" min="1" required />
                            </div>

                            <div className="col-md-4 col-sm-4 col-4">
                                <input type="number" class="form-control userInput p-3 mb-2" value={this.state.peopleSize} onChange={(e) => this.setState({ peopleSize: e.target.value})} placeholder="Number of People" min="1" required />
                            </div>

                            <div className="col-md-4 col-sm-4 col-4">
                                <input type="number" class="form-control userInput p-3 mb-2" value={this.state.peopleAggregate} onChange={(e) => this.setState({ peopleAggregate: e.target.value})} placeholder="People Aggregate" min="1" required />
                            </div>
                        </div>


                        <button type="submit" class="form-control usernameButton">Filter People</button>
                    </form>

                    
                    <div className="profileCard mt-5" id="profileCard">
                        {
                            userDetails.person ?

                            <div className="row">

                                <div className="col-md-4">
                                    <img src={userDetails.person.picture} className="userImage" alt="User Cover" />
                                </div>

                                <div className="col-md-8">
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Name:</b> {userDetails.person.name}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Title:</b> {userDetails.person.professionalHeadline}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Username:</b> {userDetails.person.publicId}</div>


                                    {
                                        userDetails.person.links.length ?
                                        userDetails.person.links.map((link, index) => 
                                            <div key={index} className="mb-2"><b style={boldTitle} className="pr-3">Other Link:</b> <a href={link.address} target="_blank" rel="noreferrer">{link.address}</a></div>
                                        ) : null
                                    }
                                    

                                    <br/>
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Bio:</b> {userDetails.person.summaryOfBio ? userDetails.person.summaryOfBio : "Not Available"}</div>

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

                                    <div className="mb-2">
                                        <a href={`https://bio.torre.co/en/${userDetails.person.publicId}`} target="_blank" rel="noreferrer"><button type="button" class="btn form-control viewProfile">View Profile On Torre</button></a>
                                    </div>
                                    
                                </div>
                            </div>
                            : null
                        }


                        {
                            filteredPeopleDetails.results ?

                            filteredPeopleDetails.results.map((person, index) => 
                            <div key={index} className="mb-5 pt-3 col-12" style={filteredPeopleDesign}>

                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={person.picture} class="userImage" alt="User Cover" />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Name:</b> {person.name}</div>

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Title:</b> {person.professionalHeadline}</div>

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Username:</b> {person.username}</div>

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Location:</b> {person.locationName}</div>

                                        {
                                            person.openTo.length ?

                                            <div className="mb-2"><b style={boldTitle} className="pr-3">Interested In:</b>
                                                {
                                                    person.openTo.map(interest => `${interest}, ` )
                                                }
                                            </div>:null
                                        }
                                        
                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Remoter:</b> {person.remoter === true ? "Yes" : "No"}</div>

                                        <div className="mb-2"><b style={boldTitle} className="pr-3">Verified:</b> {person.verified === true ? "Yes" : "No"}</div>
                                        
                                    </div>

                                    <div className="mb-2 col-12">
                                        <a href={`https://bio.torre.co/en/${person.username}`} target="_blank" rel="noreferrer"><button type="button" class="btn form-control viewProfile">View Profile On Torre</button></a>
                                    </div>
                                </div>
                            </div>) : null
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
            errorMsg: '',
            filteredPeopleDetails: {}
        })

        axios.get(`https://cors-anywhere.herokuapp.com/https://torre.bio/api/bios/${document.getElementById("userInput").value}`,{
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
            
            toast.error("There was a problem while getting user, possibly because network issues or user does not exist.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "There was a problem while getting user, possibly because network issues or user does not exist."
            })
                
            console.log("There was a problem while getting user, possibly because network issues or user does not exist.")
        })
    }

    filterPeople = (event) => {
        event.preventDefault()

        var beatLoaders = document.getElementById("beatLoaders");
        beatLoaders.style.display = "block"
        
        this.setState({
            userDetails: {},
            errorMsg: '',
            filteredPeopleDetails: {}
        })

        let peopleData = {
            offset: this.state.jobsOffset,
            size: this.state.jobsSize,
            aggregate: this.state.jobsAggregate
        }

        fetch(`https://search.torre.co/people/_search/?[offset=${this.state.peopleOffset}&size=${this.state.peopleSize}&aggregate=${this.state.peopleAggregate}]`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peopleData)
        })
        .then( res => res.json() )
        .then( data => {
            beatLoaders.style.display = "none";
            console.log(data)
            this.setState({
                filteredPeopleDetails: data
            })
        })
        .catch( err => {
            beatLoaders.style.display = "none";

            toast.error("People were not found, possibly because of network issue.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "People were not found, possibly because of network issue."
            })

            console.log("People were not found, possibly because of network issue.")
        })
    }
}

export default home
