import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardDeck, Image, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components.css";

import {Helmet} from "react-helmet";


class Highlight extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <video controls src={this.props.location.state.video}></video>
            </div>
        );
    }
}

export default Highlight;