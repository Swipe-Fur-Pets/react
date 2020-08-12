import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, CardDeck, Image, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components.css";
import {Helmet} from "react-helmet";
import { Rnd } from "react-rnd";
import $ from "jquery";
//images
import german_sheperd from "../images/gs.jpeg";
import bulldog from "../images/bd.jpeg";
import rc from "../images/rc.jpg";

import edit from '../img/edit.svg';
import logo from '../img/active-pets.svg';
import chat from '../img/chat.svg';
import close from '../img/close.svg';
import tick from '../img/tick.svg';
import './css/main.css';



import { Client } from "@petfinder/petfinder-js";




class Home extends Component {

  state = {
    currentIndex: 0,
    matches: [],
    profileVisibility: false,
    user: "",
    match: "",
    chatVisibility: false,
    chat: "Nothing",

    pets: [],
    ready: false,

    //rnd
    width: 800,
    height: 500,
    x: 300,
    y: 50,

    type: "",
    size: "",
    age: ""
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/Backend2/AdopterPreferences");
    xhr.send();
    
    
    xhr.onload = () => {
      const json = JSON.parse(xhr.response);
      this.fetchPets(json);
    }

  
  }

  fetchPets = (json) => {
    console.log(json.type);
    console.log(json.size);
    console.log(json.age);
    const client = new Client({apiKey: "iiyYrC5Y4GhsTGnDbpUk3vLerxcpc5cH4GQPn0jQ19NeajnLNZ", secret: "ZOMDVAWUrEs6gmAM9MOyj3MdReJkMQH5T5QIug6J"});
    client.animal.search({
      type: json.type,
      size: json.size,
      age: json.age,
      limit: 100
    })
    .then((response) => {
      console.log(response);
      const animals = response.data.animals;
      var pets = [];
      for (var i = 0; i < animals.length; i++) {
        const temp = animals[i];
        
        if (temp.photos.length > 0) {
            console.log(temp.organization_id);
            console.log(temp.gender);
            const pet = {
                Pet_Name: temp.name, 
                PetType: temp.species, 
                Size: temp.size, 
                Age: temp.age, 
                Gender: temp.gender,
                Rescus_ID: temp.organization_id,
                ImgLink: temp.photos[0].medium,  
                Children: temp.environment.children,
                Dogs: temp.environment.dogs,
                Cats: temp.environment.cats
            };
            console.log(pet);
          pets.push(pet);
        }
      }
      this.setState({ 
        pets: pets,
        ready: true
       })
    })

  }



  editProfile = () => {
    this.setState({ profileVisibility: true })
  }

  hideProfile = () => {
    this.setState({ profileVisibility: false })
  }


  swipeLeft = (e) => {
    e.preventDefault();
    console.log("swipe");
    if (this.state.currentIndex == this.state.pets.length - 1) {
      this.setState({ currentIndex: 0 });
    } 
    else {
      const temp = this.state.currentIndex;
      console.log(temp);
      this.setState({
        currentIndex: temp + 1
      })
    } 
  }

  swipeRight = (e) => {
    e.preventDefault();

    const temp = this.state.pets[this.state.currentIndex];
    //const current = JSON.parse(temp);
    console.log(temp);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/Backend2/Match?pet_name=" + temp.Pet_Name + "&pettype=" + temp.PetType + "&size=" + temp.Size + "&age=" + temp.Age + "&gender=" + temp.Gender + "&rescue_id=" + temp.Rescus_ID + "&imglink=" + temp.ImgLink + "&children=" + temp.Children + "&dogs=" + temp.Dogs + "&cats=" + temp.Cats);
    xhr.send();
    
    xhr.onload = () => {
      console.log(xhr.response);
    }



    if (this.state.currentIndex == this.state.pets.length - 1) {
      this.setState({ currentIndex: 0 });
    } 
    else {
      const temp = this.state.currentIndex;
      console.log(temp);
      this.setState({
        currentIndex: temp + 1
      })
    } 
  


    if (this.state.currentIndex == this.state.pets.length - 1) {
      this.setState({ currentIndex: 0 });
    } 
    else {
      const temp = this.state.currentIndex;
      console.log(temp);
      this.setState({
        currentIndex: temp + 1
      })
    } 
  }
  /*

  swipeRight = (e) => {
    e.preventDefault();
    const helper = [...this.state.matches, pets[this.state.currentIndex]];
    this.setState({ matches: helper });
    if (this.state.currentIndex == pets.length - 1) {
      this.setState({ currentIndex: 0 });
    } 
    else {
      const temp = this.state.currentIndex;
      console.log(temp);
      this.setState({
        currentIndex: temp + 1
      })
    }
  }
  */

  renderMatch = (match) => {
    
    return <button style={{backgroundColor: "white", border: "0px" }} className="match-section" onClick={() => this.renderChat(match)}>
      <img src={match.image} style={{borderRadius: "50%", height: "70px", width: "70px", marginLeft: "20px" }}></img>
    </button>

  }

  renderChat = (match) => {
   console.log("enter here");
    this.setState({
      match: match,
      chatVisibility: true
    })
    console.log("leave");
  }

  testBackEnd = (e) => {

    /*
    var option = {
      "method": "GET"
    }
    fetch("http://localhost:8080/Backend2/MyServlet", option).
    then((response) => {
      console.log(response);
      console.log(response.body);
      console.log(response.status);
      console.log(response.text);
      console.log(response.statusText);
      response.json()
    })
    .then((json) => {
      console.log(json);
    })
    */
    


    console.log(this.state.chat);
    //var data = JSON.stringify({ function: "showUserData" });
    const xhr = new XMLHttpRequest();
    var data = "showUserData";
    xhr.open("POST", "http://localhost:8080/Backend2/MyServlet?function=" + data);
    //xhr.setRequestHeader("function", "showUserData");
    xhr.send();

    
    xhr.onload = () => {
      console.log(xhr);
      console.log(xhr.response);
      this.changeState(xhr.response);
    }
    
   /*
   const request = { function: "showUserData" };
   $.ajax({
     type: 'post',
     url: 'http://localhost:8080/Backend2/MyServlet',
     headers: request,
     data: request,
     success: function(){ console.log("success"); }
   })
   */
  }

  changeState = (resp) => {
    this.setState({chat: resp});
  }

  render() {

    return (
      <body>
   
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light py-3">
      <div class="container">

          <a href="main.html" class="navbar-brand">
          <img src={logo} alt="logo" width="50"></img>
          </a>
          <a href="chat.html" class="navbar-brand" width="50"><img src={chat} width="50"></img></a>

          <a href="edit.html" class="navbar-brand" width="50"><img src={edit} width="50"></img></a>
      </div>
      </nav>
  </header>

    {this.state.ready ? <aside class="profile-card">
  
    <header>
      
    
      <a href="#"></a>
      
        <img src={this.state.pets[this.state.currentIndex].image}></img>
      
  
    
      <h1>{this.state.pets[this.state.currentIndex].name}</h1>
      
     
      <h2>(Shelter name)</h2>
      <h2>(City)</h2>
      
    </header>
    
 
    <div class="profile-bio">
      
      <p><span class="info-title">Name: </span>{this.state.pets[this.state.currentIndex].name}</p>
      <p><span class="info-title">Species: </span>{this.state.pets[this.state.currentIndex].species}</p>
      <p><span class="info-title">Age: </span>{this.state.pets[this.state.currentIndex].age}</p>
      
    </div>

   
    <ul class="profile-want">

        <li>
            <a></a>
        </li>

       
        <li>
            <button onClick={this.swipeLeft}>
              <img src={close} class="swipe-svg"></img>
            </button> 
        </li>
        
        
        <li>
            <button onClick={this.swipeRight}>
              <img src={tick} class="swipe-svg"></img>
            </button>
        </li>

        <li>
            <a></a>
        </li>
    </ul>
    
  </aside> : null}
      
  
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>



</body>

    );
  }
}



export default withRouter(Home);



/*

      <div>

        {this.state.chat}
        <Button id="test" onClick={this.testBackEnd}>Test Backend</Button>
        <div className="matches-container">

        <div className="profile-header">

          <img src={user.image} style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "10px"}}></img>
          <div style={{}}>{user.name}</div>
   
          <button style={{ backgroundColor: "lightgreen", float: "right", position: "relative"}} onClick={this.editProfile}>Edit Profile</button>
        </div>

        <div className="matches">
          {this.state.matches && this.state.matches.map((match) => {
            return this.renderMatch(match);
          })}
        </div>
      </div>


      {this.state.chatVisibility ? <div>
        <Rnd
className="chat-window"
size={{ width: this.state.width, height: this.state.height }}
enableUserSelectHack="false"
position={{ x: this.state.x, y: this.state.y, z: 1 }}
onDragStop={(e, d) => {
  this.setState({ x: d.x, y: d.y });
}}
onResizeStop={(e, direction, ref, delta, position) => {
  this.setState({
    width: ref.style.width,
    height: ref.style.height,
    ...position
  });
}}
>

          <div className="chat-window-header">
            <button style={{float: "right", backgroundColor: "pink", color: "white", border: "0"}} onClick={() => this.setState({chatVisibility: false})}>x</button>
          </div>
          
          
          <div className="chat-area">
            <div className="chat-content">
          </div>

            <textarea onMouseDown={e => e.stopPropagation()} style={{height: "20%", width: "100%"}}></textarea>

            <div>
              <button style={{float: "right", border: "0", backgroundColor: "pink", fontFamily: "Comic Sans MS"}}>Send</button>
            </div>
          </div>

          <div className="match-info">
            <img style={{width: "200px", height: "200px", borderRadius: "50%"}} src={this.state.match.image}></img>
            <div>Breed: {this.state.match.breed}</div>
            <div>Age: {this.state.match.age}</div>
          </div>
        </Rnd>
      </div> 
      : null}


      <Modal show={this.state.profileVisibility} onHide={this.hideProfile}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.handleMessaging}>
                    <div style={{display: "flex"}}>
                      <span>First Name</span>
                      <input id="firstName"></input>

                    </div>

                    <div style={{display: "flex"}}>
                    
                      <span>Last Name</span>
                      <input id="lastName"></input>

                    </div>

                    <div style={{display: "flex"}}>
                    
                      <span>Email</span>
                      <input id="email"></input>
                    </div>

                  </form>
                </Modal.Body>
      </Modal>

      <div className="pet-container">
        <img src={pets[this.state.currentIndex].image} style={{width: "480px", height: "300px"}}></img>
        <div className="pet-info">
          <div>Breed: {pets[this.state.currentIndex].breed}</div>
          <div>Age: {pets[this.state.currentIndex].age}</div>
        </div>

        <button className="swipe-left" onClick={this.swipeLeft}>😒</button>
        <button className="swipe-right" onClick={this.swipeRight}>❤️</button>
        
      </div>
      </div>
*/









/*
     <div>
        
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light py-3">
      <div class="container">
          <a href="main.html" class="navbar-brand">
          <img src={logo} alt="logo" width="50"></img>
          </a>
          <a href="chat.html" class="navbar-brand" width="50"><img src={chat} width="50"></img></a>

          <a href="edit.html" class="navbar-brand" width="50"><img src={edit} width="50"></img></a>
      </div>
      </nav>
  </header>

    <aside class="profile-card">
  
    <header>
      
    
      <a href="#"> 
         
        <img src="#"></img>
     </a>
  
      
      <h1>(Pet name)</h1>
      
      <h2>(Shelter name)</h2>
      <h2>(City)</h2>
      
    </header>
    
    
    <div class="profile-bio">
      
      <p><span class="info-title">Species: </span>Dog</p>
      <p><span class="info-title">Size: </span>Large</p>
      <p><span class="info-title">Age: </span>Adult</p>
      
    </div>

  
    <ul class="profile-want">

        <li>
            <a></a>
        </li>

     
        <li>
            <a href="">
            <img src={close} class="swipe-svg"></img>
            </a>
        </li>
        
        
        <li>
            <a href="">
            <img src={tick} class="swipe-svg"></img>
            </a>
        </li>

        <li>
            <a></a>
        </li> 
    </ul>
    
  </aside>

</div>
*/