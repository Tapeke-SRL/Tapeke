import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';



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


    componentDidMount() {
        this.isRun = true;
    }
    componentWillUnmount() {
        this.isRun = false;
    }






    render() {
        return (<SPage>
            <SView col={"xs-12"} backgroundColor={STheme.color.card} height >
                <Container >
                    <SHr height={18} />
                    <SView col={"xs-12"} padding={16} backgroundColor={STheme.color.primary} borderRadius={16} center>
                        <SHr h={32} />
                        <SText center color={STheme.color.secondary} bold fontSize={20}>El pago no se realizo</SText>
                        <SHr h={16} />
                        <SText center color={STheme.color.secondary} bold fontSize={16}>{"No pagaste tu Tapeke, pero no te quedes sin él, ¡vuelve a comprar uno!"}</SText>
                        <SHr h={32} />
                        <SView col={"xs-11"} colSquare center padding={16}>
                            <SImage src={require("../../../Assets/img/timeout_pago.png")} style={{}} />
                        </SView>
                        <SHr h={80} />
                    </SView>
                    <SHr />
                    <PButtom onPress={() => {
                        Model.pedido.Action.action({ key_pedido: this.props.data.key, action: "select_pay_method" }).then((resp) => {
                            console.log(resp);
                        })
                    }}>
                        SELECCIONAR METODO DE PAGO
                    </PButtom>
                    {/* <SHr height={18} /> */}
                </Container>
            </SView>
        </SPage>
        );
    }
}

