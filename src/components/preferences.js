import React, { Component } from 'react';
import { Button, Card, CardDeck, Image, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import logo from '../img/pets.svg';
import preferences from '../img/preferences.svg';
import './css/register.css';

class Preferences extends Component {

    state = {
        petType: "",
        size: "",
        age: "",
        children: "",
        dogs: "",
        cats: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/Backend2/AdopterRegister?pettype=" + this.state.petType + "&size=" + this.state.size + "&age=" + this.state.age + "&children=" + this.state.children + "&cats=" + this.state.cats + "&dogs=" + this.state.dogs);
        xhr.send();
        xhr.onload = () => {
            const json = JSON.parse(xhr.response);
            if (json.status === "success") {
                this.props.history.push("/home");
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

    <h3>Just a little bit more about yourself...</h3>
    <div class="row py-5 mt-4 align-items-center">
      <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
        <img src={preferences} alt="" class="img-fluid mb-3 d-none d-md-block"></img>
      </div>
  
      <div class="col-md-7 col-lg-6 ml-auto">
        <form action="#" method="POST">
          <div class="row">

            <div style="display:none;">
             
              <input name="userID" type="text" value="#"></input>
            </div>

            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-paw text-muted"></i>
                </span>
                </div>
                <select id="petType" name="petType" class="form-control custom-select bg-white border-left-0 border-md">
                <option selected>What kind of pet are you most interested in?</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="turtle">Turtle</option>
                <option value="bird">Bird</option>
                </select>
            </div>

            <div class="col-lg-12 mb-4">
              <div id="type-invalid" class="text-danger missing-entries"></div>
            </div>
  
   
            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-paw text-muted"></i>
                </span>
                </div>
                <select id="size" name="size" class="form-control custom-select bg-white border-left-0 border-md">
                <option selected>Which pet size are you looking for?</option>
                <option value="small">Small</option>
                <option value="med">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
                </select>
            </div>

            <div class="col-lg-12 mb-4">
              <div id="size-invalid" class="text-danger missing-entries"></div>
            </div>
  
            <div class="input-group col-lg-12 mb-4">
              <div class="input-group-prepend">
              <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-calendar-o text-muted"></i>
              </span>
              </div>
              <select id="age" name="age" class="form-control custom-select bg-white border-left-0 border-md">
              <option selected>What age preference do you have for your pet?</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
              </select>
          </div>

          <div class="col-lg-12 mb-4">
            <div id="age-invalid" class="text-danger missing-entries"></div>
          </div>


            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-child text-muted"></i>
                </span>
                </div>
                <select id="children" name="chlidren" class="form-control custom-select bg-white border-left-0 border-md">
                <option selected>Friendly with children?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
                </select>
            </div>

            <div class="col-lg-12 mb-4">
              <div id="children-invalid" class="text-danger missing-entries"></div>
            </div>

 
            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-paw text-muted"></i>
                </span>
                </div>
                <select id="dogs" name="dogs" class="form-control custom-select bg-white border-left-0 border-md">
                <option selected>Friendly with dogs?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
                </select>
            </div>

            <div class="col-lg-12 mb-4">
              <div id="dog-invalid" class="text-danger missing-entries"></div>
            </div>

            <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                    <i class="fa fa-paw text-muted"></i>
                </span>
                </div>
                <select id="cats" name="cats" class="form-control custom-select bg-white border-left-0 border-md">
                <option selected>Friendly with cats?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
                </select>
            </div>

            <div class="col-lg-12 mb-4">
              <div id="cat-invalid" class="text-danger missing-entries"></div>
            </div>
  
       
            <div class="form-group col-lg-12 mx-auto mb-0">
              <button type="submit" class="btn btn-primary btn-block py-2">
                <span class="font-weight-bold">Finish creating your account</span>
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

export default withRouter(Preferences);


