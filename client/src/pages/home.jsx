import React, { Component } from "react";
import Navbar from "../components/navbar";
import Card from '../components/card';
import institute from "../images/institute.jpg";
import graduate from "../images/graduate.jpg";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({ host: "localhost", port: 8080, protocol: "http" });

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = { userType: "", username:"", studentid:"", degreename:"", degreetype:"", degreemajor:"", requests:[], showing: false, filebuffer: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);

    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSubmit(event) {
        console.log("A degree was submitted: " + this.state.studentid + " " + this.state.degreename + " " + this.state.degreetype + " " + this.state.degreemajor);
        event.preventDefault();
        this.onSubmitRequest();
    }

    getRequestCount = async () =>  {
        try
        {
            let requestCount = await this.props.contract.methods.getTotalRequests().call({from: this.props.account});
            return requestCount;
        }
        catch(error)
        {
            console.log(error);
        }
       
        //let tmp = resultA[0][0].toString();
        //console.log(tmp);

    };

    getSingleRequest = async (i) =>  {
        try
        {
            let request = await this.props.contract.methods.getAllRequests(i).call({from: this.props.account});
            return {user:request[0], address:request[1]};
            //return request;
        }
        catch(error)
        {
            console.log(error);
        }
       
        //let tmp = resultA[0][0].toString();
        //console.log(tmp);

    };

    getRequests = async () =>{

        this.getRequestCount().then(requestCount => {

            for(var i = 1; i <= requestCount; i++ )
            {
                this.getSingleRequest(i).then(request => {
                    this.setState({
                        ...this.state,
                        requests: [...this.state.requests, request]
                    });
                });
            }
        });
    };

    componentDidMount = async () => {
    try {
        const result = await this.props.contract.methods.isRegisteredUser().call({from: this.props.account});
        const name = await this.props.contract.methods.getName().call({from: this.props.account});
        this.setState({ userType:result, username:name});
        this.setValues();
    }
    catch(error)
    {
        console.log(error);
    }
    };

    onSubmitRequest = async () =>  {
        const result = await this.props.contract.methods.requestDocument(this.state.studentid, this.state.degreename, this.state.degreetype, this.state.degreemajor).send({from: this.props.account});
        console.log(result);
    }

    setValues()
    {
        this.getRequests();
    }

    createTable = () => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < this.state.requests.length; i++) {
            let children = []
            let val = this.state.requests[i].user;
          
            children.push(<td key={children.length + + "data"}>{val}</td>);
            children.push(<td key={children.length}><button onClick={() => this.setState({ ...this.state, showing: !this.state.showing })} type="button" className="btn btn-primary float-right">Add Document</button></td>);
          
            //Create the parent and add the children
            table.push(<tr key={i} className="table-active">{children}</tr>);
        }
        return table;
    }

    captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {

          this.setState({ ...this.state, filebuffer: Buffer(reader.result) });
          console.log(Buffer, this.state.filebuffer);
        };
    }

    onFileSubmit = (event) => {
        event.preventDefault();

        console.log("Submitting file to ipfs...");
        ipfs.add(this.state.filebuffer, (error, result) => {
          console.log("Ipfs result", result);
          if(error) {
            console.error(error);
            return;
          }
        //    this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
        //      return this.setState({ memeHash: result[0].hash })
        //    })
        })
    }
    
    
    render(){
        const { showing } = this.state;

        if(this.state.userType == "university")
            {
                return(
                    <div className="App">
                        <header className="App-header">
                            <Navbar />
                        </header>
                        <div className="main__body">
                            <h1 className="universityName">{this.state.username}</h1>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{this.cardName}</h5>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <table className="table table-striped table-dark">
                                                <thead key = {"head"}>
                                                    <tr>
                                                    <th scope="col">Request Information</th>
                                                    <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody key = {"body"}>
                                                    {this.createTable()}          
                                                </tbody>
                                            </table> 
                                        </div>
                                        { showing ? <form onSubmit={this.onFileSubmit} className="uploadDocForm" id="uploadForm" > 
                                        <div className="form-group row">
                                            <label htmlFor="studentNumber" className="col-sm-2 col-form-label">Student Nr.</label>
                                            <div className="col-sm-10">
                                            <input type="text" name="studentid" className="form-control" id="studentNumber" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeName" className="col-sm-2 col-form-label">Degree Name</label>
                                            <div className="col-sm-10">
                                            <input type="text" name="degreename" className="form-control" id="degreeName" placeholder="Bsc" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeType" className="col-sm-2 col-form-label">Degree Type</label>
                                            <div className="col-sm-10">
                                            <input type="text" name="degreetype" className="form-control" id="degreeType" placeholder="Computer Science" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeMajor" className="col-sm-2 col-form-label">Degree major</label>
                                            <div className="col-sm-10">
                                            <input type="text" name="degreemajor" className="form-control" id="degreeMajor" placeholder="Informatics" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="fileUpload" className="col-sm-2 col-form-label">Upload Degree</label>
                                            <div className="col-sm-10">
                                            <input type="file" name="fileUpload" onChange={this.captureFile} className="form-control" id="fileUpload"/>
                                            </div>
                                        </div>
                                        <input type="submit" value="Submit" className="btn btn-primary float-right" />
                                    </form> : null
                                }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else
            {
                return (
                        <div className="App">
                        <header className="App-header">
                            <Navbar />
                        </header>
                        <div id="nav-profile">
                            <div className="main__body">
                                <h1 className="universityName">{this.state.username}</h1>
                                <div className="card studentcard">
                                <div className="card-header">
                                    <h1>Request Document</h1>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Please fill in information for the requested document</h5>
                                    <br />
                                    <form onSubmit={this.handleSubmit}> 
                                        <div className="form-group row">
                                            <label htmlFor="studentNumber" className="col-sm-2 col-form-label">Student Nr.</label>
                                            <div className="col-sm-10">
                                            <input type="text" value={this.state.studentid} name="studentid" onChange={this.handleChange} className="form-control" id="studentNumber" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeName" className="col-sm-2 col-form-label">Degree Name</label>
                                            <div className="col-sm-10">
                                            <input type="text" value={this.state.degreename} name="degreename" onChange={this.handleChange} className="form-control" id="degreeName" placeholder="Bsc" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeType" className="col-sm-2 col-form-label">Degree Type</label>
                                            <div className="col-sm-10">
                                            <input type="text" value={this.state.degreetype} name="degreetype" onChange={this.handleChange} className="form-control" id="degreeType" placeholder="Computer Science" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="degreeMajor" className="col-sm-2 col-form-label">Degree major</label>
                                            <div className="col-sm-10">
                                            <input type="text" value={this.state.degreemajor} name="degreemajor" onChange={this.handleChange} className="form-control" id="degreeMajor" placeholder="Informatics" />
                                            </div>
                                        </div>
                                        <input type="submit" value="Submit" className="btn btn-primary float-right" />
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

export default HomePage;