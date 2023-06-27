import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SThread } from 'servisofts-component';
import { Container, FloatButtomTap, PButtom, Pedido, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class conductor_llego extends Component {
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
        new SThread(3000, "hilo_pedido_background", true).start(() => {
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
                    latitude: this.props.data?.direccion?.latitude,
                    longitude: this.props.data?.direccion?.longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
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
            <SView col={"xs-12"} style={{
                position: "absolute",
                bottom: 0,
                padding: 8
            }}>
                <SView col={"xs-12"} padding={4} backgroundColor={STheme.color.white} center>
                    <SText center >Ref. {this.props.data?.direccion?.referencia}</SText>
                    <SText center color={STheme.color.gray}>{this.props.data?.direccion?.direccion}</SText>
                </SView>
            </SView>
        </SView>
    }

    showCards() {
        return <SView height={480} col={"xs-12"}>
            <SView height={20} col={"xs-12"} backgroundColor={STheme.color.accent} />
            <Container>
                <Pedido.DetallePedido data={this.props.data} />
                <Pedido.DetallePago data={this.props.data} />
                <SHr h={16} />
                <SText fontSize={18} center col={"xs-12"}>El conductor llego con tu pedido!</SText>
                <Pedido.Chat data={this.props.data} />
            </Container>

        </SView>
    }

    render() {
        return (<SPage disableScroll >
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                {this.showMapa()}
                {this.showCards()}
            </SView>
        </SPage>
        );
    }
}