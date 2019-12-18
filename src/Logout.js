import {Component} from "react";
import React from 'react';
import {
    Link
} from 'react-router-dom';

export default class Logout extends Component {

    constructor(props) {
        super(props);
        console.log("asdasdasd");
    }

    render() {
        return(
            <Link to={"/login"}/>
        )
    }
}