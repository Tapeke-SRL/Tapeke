import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';



export default class listo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
    }





    render() {
        return (<SView col={"xs-12"} backgroundColor={STheme.color.card} height >
            <Container>
                <SHr height={30} />
                <SView col={"xs-9"} center>
                    <SText bold fontSize={22}>Tapeke no recogido</SText>
                    <SHr height={15} />
                    <SText bold fontSize={16} center>Lo sentimos, no llegaste a tiempo para recoger tu tapeke.</SText>
                </SView>
                <SView col={"xs-12"} row center>
                    <SHr height={40} />
                    <SIcon fill={STheme.color.secondary} name={"TimeOut"} height={280} />
                </SView>
                <SHr height={40} />
                <PButtom onPress={() => {
                    SNavigation.navigate("/root")
                }}>ACEPTAR</PButtom>
            </Container>
        </SView>
        );


    }
}

