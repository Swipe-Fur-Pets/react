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




class Message extends Component {

  state = {
    chats: [],
    message: "",
    chat: "",
  }

  componentDidMount() {
      setInterval(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/Backend2?mid=" + this.state.message + "&user=" + localStorage.getItem("email"));
        xhr.send();
        xhr.onload = () => {
          const json = JSON.parse(xhr.response);
          this.updateState(json);
        }
      }, 1000);
  }

  updateState = (json) => {
    this.setState({
        chats: json.chats
    })
  }

  renderChat = (chat) => {
      return (
        <button onClick={this.setChat(chat)}>
        <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
                  <div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"></img>
                    <div class="media-body ml-4">
                      <div class="d-flex align-items-center justify-content-between mb-1">
                        <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">14 Dec</small>
                      </div>
                      <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur. incididunt ut labore.</p>
                    </div>
                  </div>
                </a>
    </button>
      );
  
  }

  setChat = (e, chat) => {
      e.preventDefault();
      this.setState({
          chat: chat
      })
  }

  renderMessage = (message) => {
      return (
        <div class="media w-50 mb-3"><a href="profile.html"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"></img></a>
        <div class="media-body ml-3">
          <div class="bg-light rounded py-2 px-3 mb-2">
            <p class="text-small mb-0 text-muted">Test which is a new approach all solutions</p>
          </div>
          <p class="small text-muted">12:00 PM | Aug 13</p>
        </div>
      </div>
      )
  } 

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

    handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const dateString = date.toDateString();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/Backend2/Message?user=" + localStorage.getItem("email") + "&mid=" + this.state.chat.id + "&content=" + this.state.message + "&date=" + this.state.dateString);
        xhr.send();
    }
  


  render() {

    return (
    <body>
   
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light py-3">
        <div class="container">
  \
            <a href="main.html" class="navbar-brand">
            <img src="img/pets.svg" alt="logo" width="50"></img>
            </a>
            <a href="chat.html" class="navbar-brand" width="50"><img src="img/active-chat.svg" alt="msg" width="50"></img></a>

            <a href="edit.html" class="navbar-brand" width="50"><img src="img/edit.svg" alt="edit" width="50"></img></a>

   
            <a href="chat.html" class="navbar-brand">
            <img src="img/pets.svg" alt="logo" width="50"></img>
            </a>
        </div>
        </nav>
    </header>
  
  
    <div class="container py-5 px-4">
      
        <div class="row rounded-lg overflow-hidden shadow">

          <div class="col-5 px-0">
            <div class="bg-black">
      
            
              <div class="messages-box">
                <div class="list-group rounded-0">
                  <a class="list-group-item list-group-item-action active text-white rounded-0">
                    
                    
                    <div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"></img>
                      <div class="media-body ml-4">
                        <div class="d-flex align-items-center justify-content-between mb-1">
                          <h6 class="mb-0"></h6>

                          <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">25 Dec</small>
                        </div>
                        
                        <p class="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                      </div>
                    </div>
                  </a>
      
                  {this.state.chats && this.state.chats.map((chat) => {
                      return this.state.renderChat(chat);
                  })}
      
                </div>
              </div>
            </div>
          </div>


          <div class="col-7 px-0">
            <div class="px-4 py-5 chat-box bg-white">
         
              {this.chat.history && this.chat.history.map((message) => {
                  return this.renderMessage(message);
              })}
      
            </div>
      
           
            <form onSubmit={this.handleSubmit}>
              <div class="input-group">
                <input onChange={this.handleChange} id="message" name="msg" type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light"></input>
                <div class="input-group-append">
                  <button id="button-addon2" type="submit" class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
                </div>
                <div style="display:none;" class="checkMsg"></div> 
              </div>
            </form>
      
          </div>
        </div>
      </div>
 

</body>

    );
  }
}

export default withRouter(Message);