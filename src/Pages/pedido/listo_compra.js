import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView } from 'servisofts-component';
import { AccentBar, Container, PButtom, Restaurante, TipoPago } from '../../Components';
import SSocket from 'servisofts-socket';
import Sounds from '../../Components/Sounds';



export default class listo_compra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
            }
        };
    }

    componentDidMount(){
        Sounds.play();
    }




    render() {
        return (<SPage backgroundColor={STheme.color.card}  hidden center
            header={<AccentBar />}
        >
            <Container>
                <SView col={"xs-9"} center>
                    <SText bold fontSize={30}>¡Listo!</SText>
                    <SHr height={25} />
                    <SText bold fontSize={16} center>Tu pedido fue realizado exitosamente.</SText>
                </SView>
                <SView col={"xs-12"} row center>
                    <SHr height={40} />
                    <SIcon fill="#99CC00" name={"Check2"} height={150} />
                </SView>
                <SHr height={60} />
                <PButtom onPress={() => {
                    SNavigation.navigate("/root")
                }}>ACEPTAR</PButtom>
            </Container>
        </SPage>
        );


    }
}

