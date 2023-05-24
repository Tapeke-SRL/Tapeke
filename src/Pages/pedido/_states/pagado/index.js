import React, { Component } from 'react'
import { SView } from 'servisofts-component';
import Delivery from "./delivery"
import Recoger from "./recoger"
export default class listo extends Component {
    render() {
        console.log(this.props);
        if (!this.props.data) return <SView />
        if (!this.props.data.delivery) return <Recoger {...this.props} />
        return <Delivery {...this.props} />
    }
}