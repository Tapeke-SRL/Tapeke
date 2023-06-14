import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SView } from 'servisofts-component';
import ListoDelivery from "./listo_delivery"
import ListoRecoger from "./listo_recoger"
export default class listo extends Component {
    render() {
        if (!this.props.data) return <SView />
        if (!this.props.data.delivery) return <ListoRecoger {...this.props} />
        return <ListoDelivery {...this.props} />
    }
}