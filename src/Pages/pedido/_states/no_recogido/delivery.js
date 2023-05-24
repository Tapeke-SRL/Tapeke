import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../../Components';

export default class listo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (<SPage disableScroll >
            <SView col={"xs-12"} backgroundColor={STheme.color.card} height >
                <Container>
                    <SHr height={30} />
                    <SView col={"xs-9"} center>
                        <SText bold fontSize={22} center>No te pudimos enviar tu pedido</SText>
                        <SHr height={15} />
                        <SText bold fontSize={16} center>Lo sentimos,si pagaste online el monto sera abonado a tu billetera Tapeke.</SText>
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
        </SPage>
        );


    }
}

