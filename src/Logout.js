import {Component} from "react";
import React from 'react';


export default class Login extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        sessionStorage.clear();
        this.props.history.push("/login");
    }

    render() {
        return(
            <div/>
        )
    }
}