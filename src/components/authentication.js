import React, { Component } from 'react';
import { Button, Card, CardDeck, Image, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import logo from '../img/pets.svg';
import register from '../img/register.svg';
import './css/register.css';

class Authentication extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        phoneNumber: "",
        password: "",
        passwordConfirmation: ""
    }

    componentDidMount() {
        setInterval(() => {
            console.log("haha");
        }, 1000)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/Backend2/AdopterRegister?firstname=" + this.state.firstName + "&lastname=" + this.state.lastName + "&email=" + this.state.email + "&phone=" + this.state.phoneNumber + "&location=" + this.state.location + "&password=" + this.state.password);
        xhr.send();
        xhr.onload = () => {
            const json = JSON.parse(xhr.response);
            console.log(json.status);
            if (json.status === "success") {
                this.props.history.push("/preferences");
            }
        }
    }

    render() {

        return (
      

            <div>
                <header class="header">
                    <nav class="navbar navbar-expand-lg navbar-light py-3">
                        <div class="container">
                            <a href="pickRegister.html" class="navbar-brand">
                                <img src={logo} alt="logo" width="50"></img>
                            </a>
                        </div>
                    </nav>
                </header>

  
  
  <div class="container">

    <h3>Submit your personal information through this very secure form</h3>

    <div class="row py-5 mt-4 align-items-center">
      <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
        <img src={register} alt="" class="img-fluid mb-3 d-none d-md-block"></img>
      </div>
  
    
      <div class="col-md-7 col-lg-6 ml-auto">
        <form>
          <div class="row">
  
  
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-user text-muted"></i>
                </span>
              </div>
              <input id="firstName" type="text" name="firstname" placeholder="First Name" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
            </div>            
  
        
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-user text-muted"></i>
                </span>
              </div>
              <input id="lastName" type="text" name="lastname" placeholder="Last Name" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
            </div>

          
            <div class="col-lg-6 mb-4 missing-entries">
              <div id="fname-invalid" class="text-danger"></div>
            </div>

          
            <div class="col-lg-6 mb-4 missing-entries">
              <div id="lname-invalid" class="text-danger"></div>
            </div>
  
     
            <div class="input-group col-lg-12 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-envelope text-muted"></i>
                </span>
              </div>
              <input id="email" type="email" name="email" placeholder="Email Address" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
            </div>

            <div class="col-lg-12 mb-4 missing-entries">
              <div id="email-invalid" class="text-danger"></div>
            </div>

            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-location-arrow text-muted"></i>
                  </span>
                </div>
                <input id="location" type="text" name="location" placeholder="Location - Ex: Los Angeles, CA" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
            </div>

            <div class="col-lg-12 mb-4 missing-entries">
              <div id="location-invalid" class="text-danger"></div>
            </div>
  
            <div class="input-group col-lg-12 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-phone-square text-muted"></i>
                </span>
              </div>
              <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" class="form-control bg-white border-md border-left-0 pl-3" onChange={this.handleChange}></input>
            </div>

            <div class="col-lg-12 mb-4 missing-entries">
              <div id="phone-invalid" class="text-danger"></div>
            </div>
 
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-lock text-muted"></i>
                </span>
              </div>
              <input id="password" type="password" name="password" placeholder="Password" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
              <div class="errorPassword text-danger"></div>
            </div>
  
        
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-lock text-muted"></i>
                </span>
              </div>
              <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" class="form-control bg-white border-left-0 border-md" onChange={this.handleChange}></input>
              <div class="errorPassword text-danger"></div>
            </div>

            <div class="col-lg-6 mb-4 missing-entries">
              <div id="pw-invalid" class="text-danger"></div>
            </div>

            <div class="col-lg-6 mb-4 missing-entries">
              <div id="pwConfirm-invalid" class="text-danger"></div>
            </div>
  
            <div class="form-group col-lg-12 mx-auto mb-0">
              <button class="btn btn-primary btn-block py-2" onClick={this.handleSubmit}>
                <span class="font-weight-bold">Create your account</span>
              </button>
            </div>
  
    
            <div class="text-center w-100">
              <p class="text-muted font-weight-bold">Already Registered? <a href="login.html" class="text-primary ml-2">Login</a></p>
            </div>
  
          </div>
        </form>
      </div>
    </div>
  </div>

</div>

        );
    }
}

export default withRouter(Authentication);

