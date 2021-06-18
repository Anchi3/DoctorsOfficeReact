import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import React, { Component } from "react";

import axios from "axios";
import Doctors from "./components/doctors";
import Patient from "./components/patient";

class App extends Component {
  state = {
    doctors: [],
    patient: {},
    currentDoctorId: 0,
    currentSymptom: "",
  };

  componentDidMount() {
    axios.get("https://localhost:5001/Doctors").then((response) => {
      this.setState({ doctors: response.data });
      this.setState({ currentDoctorId: this.state.doctors[0].id });
    });
  }

  handleCurrentDoctor = (event) => {
    console.log(event.target.value);
    this.setState({ currentDoctorId: event.target.value });
  };

  handleCurrentPatient = (event) => {
    console.log(event);
    this.setState({ patient: event });
  };

  handleSymptom = (e) => {

    this.setState({ currentSymptom: e.target.value });


  };



  render() {
    return (
      <React.Fragment>
        <NavBar>Doctor's Patient Intake Form</NavBar>
        <main className="container">
          <br />
          <p>
            Current Doctor ID: &nbsp;
            {this.state.currentDoctorId}
            <br />
            Current Patient ID: &nbsp;
            {this.state.patient.id}
            <br />
           {/*Current Patient Symptom: &nbsp;
            {this.state.currentSymptom}*/}
          </p>
          <br />

          <hr />
          <b>Please Choose Your Preferred Physician:</b><br /><br />
          <Doctors
            doctors={this.state.doctors}
            onCurrentDoctor={this.handleCurrentDoctor}
          ></Doctors>
          <br /><br />
          <hr />
          <Patient onCurrentPatient={this.handleCurrentPatient}></Patient>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              <b>Symptom/s:</b>
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.handleSymptom}
              placeholder="Please limit to 500 characters"
            ></textarea>
          </div>

          <button
          type="button"
          className="btn btn-success  m-2 btn-lg"
          disabled={this.state.isCreate}
          onClick={this.AddNewPatient}
        >
          Create New Appointment
        </button>
        </main>
      </React.Fragment>
    );
  }
}

export default App;