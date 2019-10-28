import React, { Component } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";

class StudentPage extends Component {
    render(){
        return(
                <div className="main__home">
                    <div className="main__home__body">
                      <Navbar />
                      <div className="card studentcard">
                        <div className="card-header">
                            Request Document
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Please fill in information for the requested document</h5>
                            <form>
                                <div className="form-group row">
                                    <label for="studentNumner" className="col-sm-2 col-form-label">Student Number</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="studentNumner" value="21217721" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="degreeName" className="col-sm-2 col-form-label">Degree Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="degreeName" placeholder="Bsc" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="degreeType" className="col-sm-2 col-form-label">Degree Type</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="degreeType" placeholder="Computer Science" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="degreeMajor" className="col-sm-2 col-form-label">Degree major</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="degreeMajor" placeholder="Informatics" />
                                    </div>
                                </div>
                                <a href="#" className="btn btn-primary float-right">Submit</a>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
        );
    }
}

export default StudentPage;
