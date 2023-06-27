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
        if (this.props?.data?.state == "buscando_conductor" || this.props?.data?.state == "confirmando_conductor") return null;
        Model.background_location.Action.getByKeyAsync(this.props.data.key_conductor).then(resp => {
            this.mapa.fitToCoordinates([
                { latitude: this.props.data?.direccion?.latitude, longitude: this.props.data?.direccion?.longitude },
                { latitude: resp.data.latitude, longitude: resp.data.longitude }
            ], {
                edgePadding: {
                    top: 100,
                    bottom: 100,
                    left: 50,
                    right: 50,
                }
            })
            if (!this.isRun) return;
            this.setState({ posicion_conductor: resp.data })
            // this.mapa.animateToRegion({
            //     latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
            //     longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
            //     latitudeDelta: 0.0722,
            //     longitudeDelta: 0.0421,
            // })
        }).catch(e => {
            console.error(e)
        })
    }


    // showMapa() {
    //     if (!this.props.data.restaurante.key) return null;
    //     return <SView col={"xs-12"} flex center >
    //         <SMapView2 initialRegion={
    //             {
    //                 latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
    //                 longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
    //                 latitudeDelta: 0.0722,
    //                 longitudeDelta: 0.0421,
    //             }} preventCenter>
    //             <Restaurante.Marker data={this.props.data?.restaurante}
    //                 lat={this.props.data?.restaurante?.latitude}
    //                 lng={this.props.data?.restaurante?.longitude}
    //                 latitude={this.props.data?.restaurante?.latitude}
    //                 longitude={this.props.data?.restaurante?.longitude} />
    //             <SMarker lat={this.props.data?.direccion?.latitude} lng={this.props.data?.direccion?.longitude} >
    //                 <SIcon name={"Marker"} width={40} height={40} fill={"#FA790E"} />
    //             </SMarker>
    //             {!this.state.posicion_conductor ? null : <SMarker lat={this.state.posicion_conductor?.latitude} lng={this.state?.posicion_conductor?.longitude} >
    //                 <SIcon name={"MarkerLocation"} width={50} height={50} fill={"#FA790E"} />
    //             </SMarker>}
    //         </SMapView2>
    //     </SView>
    // }
    showMapa() {
        if (!this.props.data.restaurante.key) return null;
        return <SView col={"xs-12"} flex center >
            <SMapView
                ref={ref => this.mapa = ref}
                initialRegion={
                    {
                        latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
                        longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
                        latitudeDelta: 0.0722,
                        longitudeDelta: 0.0421,
                    }} >
                <></>
                <Restaurante.Marker2 data={this.props.data?.restaurante}
                    latitude={this.props.data?.restaurante?.latitude}
                    longitude={this.props.data?.restaurante?.longitude} />
                <SMapView.SMarker
                    width={40} height={40}
                    latitude={this.props.data?.direccion?.latitude}
                    longitude={this.props.data?.direccion?.longitude}
                >
                    <SIcon name={"Marker"} width={40} height={40} fill={"#FA790E"} />
                </SMapView.SMarker>
                {!this.state.posicion_conductor ? null : <SMapView.SMarker width={50} height={50} latitude={this.state.posicion_conductor?.latitude} longitude={this.state?.posicion_conductor?.longitude} >
                    <SIcon width={50} height={50} name={"MarkerLocation"} fill={"#FA790E"} />
                </SMapView.SMarker>}
            </SMapView>
        </SView >
    }

    showCards() {
        return <SView height={250}>
            <Pedido.BotonesEstado data={this.props.data} posicion_conductor={this.state?.posicion_conductor} />
        </SView>
    }

    render() {
        if (!this.rc) this.rc = 0;
        this.rc++;
        return (<SPage disableScroll >
            {/* <SText>{this.rc}</SText> */}
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                {this.showMapa()}
                {/* <Pedido.Chat data={this.props.data}/> */}
                {this.showCards()}
            </SView>
        </SPage>
        );
    }
}