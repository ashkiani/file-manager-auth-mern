// import image from "./assets/concert3.jpg";
import React, { Component } from 'react';
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async res => {
        if (res.status === 200) {
          this.props.history.push("/app");
        } else {
          res.text().then(text => { alert("Error please try again -" + text) });
        }
      })
      .catch(err => {
        console.log(err);
        alert("Error registering in please try again");
      });
  }
  render() {
    return (
      <div id="main-body">
        <div id="user-input" className="container">
          <div className="card mb-3" >
            <div className="row no-gutters">
              <div className="col-md-4" >
                
              </div>

              <div className="col-md-8">
                <form onSubmit={this.onSubmit}>
                  <div className="card-body">
                    <h3 className="card-title">Join</h3>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label >Email:</label>
                          <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required className="form-control" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label >Password:</label>
                          <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} required className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label >First Name:</label>
                          <input type="text" name="firstName" placeholder="Enter First Name" value={this.state.firstName} onChange={this.handleInputChange} required className="form-control" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label >Last Name:</label>
                          <input type="text" name="lastName" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.handleInputChange} required className="form-control" />
                        </div>
                      </div>
                    </div>
                    {/* Button used to sign up a new user */}
                    <input type="submit" value="Sign Up" className="btn btn-dark" />
                    {/* onClick={signUpNewUser} */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}