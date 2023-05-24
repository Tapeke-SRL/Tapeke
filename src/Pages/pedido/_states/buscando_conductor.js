import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SThread } from 'servisofts-component';
import { Container, FloatButtomTap, PButtom, Pedido, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class buscando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
        this.isRun = false;
    }

    componentDidMount() {
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    hilo() {
        if (!this.isRun) return;
        this.buscar_posicion_conductor()
        new SThread(5000, "hilo_pedido_background", true).start(() => {
            this.hilo();
        })
    }


    buscar_posicion_conductor() {
        if (!this.props?.data?.key_conductor) return null;
        Model.background_location.Action.getByKeyAsync(this.props.data.key_conductor).then(resp => {
            this.setState({ posicion_conductor: resp.data })
        }).catch(e => {
            console.error(e)
        })
    }


    showMapa() {
        if (!this.props.data.restaurante.key) return null;
        return <SView col={"xs-12"} flex center >
            <SMapView2 initialRegion={
                {
                    latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
                    longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }} preventCenter>
                <Restaurante.Marker data={this.props.data?.restaurante}
                    lat={this.props.data?.restaurante?.latitude}
                    lng={this.props.data?.restaurante?.longitude}
                    latitude={this.props.data?.restaurante?.latitude}
                    longitude={this.props.data?.restaurante?.longitude} />
                <SMarker lat={this.props.data?.direccion?.latitude} lng={this.props.data?.direccion?.longitude} >
                    <SIcon name={"Marker"} width={40} height={40} fill={"#FA790E"} />
                </SMarker>
                {!this.state.posicion_conductor ? null : <SMarker lat={this.state.posicion_conductor?.latitude} lng={this.state?.posicion_conductor?.longitude} >
                    <SIcon name={"MarkerLocation"} width={50} height={50} fill={"#FA790E"} />
                </SMarker>}
            </SMapView2>
        </SView>
    }

    showCards() {
        return <SView height={200}>
            <Pedido.BotonesEstado data={this.props.data} posicion_conductor={this.state?.posicion_conductor} />
        </SView>
    }

    render() {
        return (<SPage disableScroll >
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                {this.showMapa()}
                {/* <Pedido.Chat data={this.props.data}/> */}
                {this.showCards()}
            </SView>
        </SPage>
        );
    }
}