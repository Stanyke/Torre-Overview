import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class jobs extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentJob: "JWO8X4wQ",
            errorMsg: "",
            jobDetails: {}
        }

        toast.configure()
    }

    componentDidMount(){
        var beatLoaders = document.getElementById("beatLoaders");

        fetch(`https://torre.co/api/opportunities/${this.state.currentJob}`)
        .then( res => res.json() )
        .then( data => {
            beatLoaders.style.display = "none";

            console.log(data)
            this.setState({
                jobDetails: data
            })
        })
        .catch( err => {
            beatLoaders.style.display = "none";
            toast.error("Job opportunity not found.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "Job opportunity not found."
            })

            console.log("Job opportunity not found.")
        })

    }
    
    render() {

        const { jobDetails, errorMsg } = this.state;
        const errorColor = {"color": "#cddc39"}
        const imgStyle = {width: '100%', height: '350px'}
        const boldTitle = {"color": "#cddc39"}

        return (
            <div>
                
                <nav className="navbar navbar-expand-sm">
                    <Link className="navbar-brand" to="/">Torre APIs Overview</Link>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="btn nav-link p-2" to="/">Home</Link>
                        </li>
                    </ul>
                </nav>

                <div className="container mb-5">
                    
                    <form onSubmit={this.searchJob}>
                        <input type="text" class="form-control userInput p-3 mb-2" id="userInput" value={this.state.currentJob} onChange={(e) => this.setState({ currentJob: e.target.value})} placeholder="Search Job" />

                        <button type="submit" class="form-control usernameButton">Search Job</button>
                    </form>


                    <div className="profileCard mt-5" id="profileCard">
                        {
                            jobDetails.attachments ?

                            <div className="row">

                                <div className="col-md-4">
                                    {jobDetails.attachments.length ?
                                    <img src={jobDetails.attachments[0].address} style={imgStyle} alt="User Cover" />
                                    : <h2 align="center">No Image Available For Preview</h2> }
                                </div>

                                <div className="col-md-8">
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Objective:</b> {jobDetails.objective}</div>


                                    {
                                        jobDetails.organizations.length ?
                                        jobDetails.organizations.map(organization => 
                                            <div className="mb-2"><b style={boldTitle} className="pr-3">Organization:</b> {organization.name} | Size ({organization.size})</div>
                                        ) : null
                                    }

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Job Status:</b> {jobDetails.status}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Paying:</b> {jobDetails.compensation.currency} {jobDetails.compensation.minAmount} - {jobDetails.compensation.maxAmount} | {jobDetails.compensation.periodicity}</div>
                                    
                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Location:</b> {jobDetails.place.remote === true ? "Remote" : "On-Site" }</div>
                                    

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Timezone:</b> {jobDetails.place.anywhere === true ? "Any Time Zone" : "Not-Available" }</div>
                                    

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Created Job:</b> {jobDetails.created}</div>

                                    <div className="mb-2"><b style={boldTitle} className="pr-3">Deadline:</b> {jobDetails.deadline}</div>
                                    
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
                    <b>Job Loading...</b>
                </div>

            </div>
        )
    }

    searchJob = (event) => {
        event.preventDefault()

        var beatLoaders = document.getElementById("beatLoaders");
        beatLoaders.style.display = "block"
        
        this.setState({
            jobDetails: {},
            errorMsg: ''
        })

        fetch(`https://torre.co/api/opportunities/${this.state.currentJob}`)
        .then( res => res.json() )
        .then( data => {
            beatLoaders.style.display = "none";
            console.log(data)
            this.setState({
                jobDetails: data
            })
        })
        .catch( err => {
            beatLoaders.style.display = "none";

            toast.error("Job opportunity not found.", {position: toast.POSITION.TOP_LEFT, autoClose: 5000});

            this.setState({
                errorMsg: "Job opportunity not found."
            })

            console.log("Job opportunity not found.")
        })
    }
}

export default jobs
