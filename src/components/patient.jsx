import React, { Component } from "react";

import axios from "axios";

class Patient extends Component {
  state = {
    patient: {},
    isCreate: false,
  };

  handleId = (id) => {
    axios.get("https://localhost:5001/Patients/" + id).then((response) => {

      let patient = Object.assign({}, response.data); 
      patient.id = id;

      this.setState({ patient });
      this.props.onCurrentPatient(patient);

      if(patient.name === undefined) {
        window.alert("This patient ID does not exist. \nPlease fill out the Patient Details then click Add New Patient.");
      };

      this.setState({ isCreate: response.data.name !== undefined });
    });
  };

  UpdatePatient = () => {
    let patient = Object.assign({}, this.state.patient);

    axios
      .put("https://localhost:5001/Patients/" + this.state.patient.id, patient)
      .then((response) => {
        console.log("PUT : ", response);
      });
    
    window.alert("Patient file successfully updated.");
    window.location.reload();
  };

  AddNewPatient = () => {
    let patient = Object.assign({}, this.state.patient);

    axios.post("https://localhost:5001/Patients", patient).then((response) => {
      this.props.onCurrentPatient(patient);
      console.log("POST : ", response);
    });

    window.alert("Patient file successfully added. \nYour New Patient ID is \n" + patient.id);
    window.location.reload();
  };


  render() {
    return (
      <React.Fragment>
        <b>Patient ID Search:</b>
        <input
          className="form-control m-2"
          type="number"
          placeholder="Enter your Patient ID" 
          onBlur={(e) => this.handleId(e.target.value)}
        ></input>
        <button className="btn btn-info btn-sm m-2 ">Search</button>

        <br />
        <b>Patient Details:</b>
        <br /><br />

        Health Number:
        <input
          className="form-control m-2"
          type="number"
          placeholder="Please Enter the 5-digit Health Number"
          value={this.state.patient.healthNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.healthNumber = e.target.value;
              return { patient };
            })
          }
        ></input>

        Name:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Please Enter the Patient's Name"
          value={this.state.patient.name || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.name = e.target.value;
              return { patient };
            })
          }
        ></input>

        Date of Birth: 
        <input
          className="form-control m-2"
          type="date"
          placeholder="Please Enter Date of Birth YYYY-MM-DD"
          value={this.state.patient.dateOfBirth || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.dateOfBirth = e.target.value;
              return { patient };
            })
          }
        ></input>

        Phone:
        <input
          className="form-control m-2"
          type="tel"
          placeholder="(XXX) XXXXXXX"
          value={this.state.patient.phoneNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.phoneNumber = e.target.value;
              return { patient };
            })
          }
        ></input>

        Address:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Please Enter the Current Address"
          value={this.state.patient.address || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.address = e.target.value;
              return { patient };
            })
          }
        ></input>
        <br />

        <button
          type="button"
          className="btn btn-success m-2 btn-sm"
          disabled={this.state.isCreate ||
                    this.state.patient.id === undefined ||
                    this.state.patient.name === undefined ||
                    this.state.patient.healthNumber === undefined ||
                    this.state.patient.dateOfBirth === undefined ||
                    this.state.patient.phoneNumber === undefined ||
                    this.state.patient.address === undefined
          }
          onClick={this.AddNewPatient}
        >
          Add New Patient
        </button>
        <button
          type="button"
          className="btn btn-warning m-2 btn-sm"
          disabled={!this.state.isCreate}
          onClick={this.UpdatePatient}
        >
          Update Patient
        </button>
      </React.Fragment>
    );
  }
}

export default Patient;