import React, { Component } from "react";

class AddDegree extends Component {
    
    render(){
            return(
                <React.Fragment>
                    <div>
                        <form>
                            <fieldset>
                            <div className="form-group">
                                <label>Upload degree</label>
                                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                                <small id="fileHelp" className="form-text text-muted">Please upload the student's degree.</small>
                            </div>
                            </fieldset>
                        </form>
                    </div> 
                </React.Fragment>
            );
        }
}

export default AddDegree;