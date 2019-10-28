import React, { Component } from "react";
import AddDegree from "./addDegree";

class Card extends Component {

    constructor(props) {
        super(props);
        this.cardName = props.cardName;
        this.description = props.description;
    }
  
    render(){
        return(
            <React.Fragment>
                <div className="card">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Students</a>
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Upload Requests</a>
                        </div>
                    </nav>
                    <div className="card-body">
                        <h5 className="card-title">{this.cardName}</h5>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                        <th scope="col">Student Nr.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Degree(s)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-active">
                                            <th scope="row">19018150</th>
                                            <td>Amanda Pierce</td>
                                            <td>Bsc(Hons) Computer Science</td>
                                        </tr>
                                    </tbody>
                                </table> 
                                <button type="button" className="btn btn-primary float-right">Add Student</button>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><p>AAAAAAAAAAAA</p></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Card;