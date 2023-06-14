import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Container, PButtom, Pedido, Popups, Restaurante, TipoPago } from '../../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../../Model';


export default class pendiente_pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        };
    }

    componentDidMount() {
        // Popups.TapekeComprado.open();
        this.getQr()
    }

    getQr() {
        Model.pedido.Action.getQR({ key_pedido: this.key }).then((resp) => {
            if (resp.estado != "exito") return;
            this.setState({ data: resp.data })
        });
    }

    getImage() {
        if (!this.state.data) return <SLoad />
        return <SImage src={`data: image/png;base64,${this.state.data.b64}`} style={{
            width: "100%",
            height: "100%"
        }
        } />
    }

    render() {
        return (
            <SPage>
                <SView col={"xs-12"} backgroundColor={STheme.color.card}   >
                    <Container>
                        <SHr height={18} />
                        <Pedido.DetallePedido data={this.props.data} />
                        <SHr height={18} />
                        <Pedido.DetallePago data={this.props.data} />
                        <SHr height={18} />
                        <Pedido.QRPedido data={this.props.data} />
                        <SView col={"xs-12 "} row center style={{ backgroundColor: STheme.color.white }}>
                            <SView center col={"xs-12"} row style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: STheme.color.lightGray }}>
                                <SView col={"xs-6"} row center style={{ borderRightWidth: 1, borderColor: STheme.color.lightGray }}
                                    onPress={() => {
                                        SNavigation.navigate("/restaurante/detalle", { pk: this.props.data.restaurante?.key });
                                    }}>
                                    <SHr height={20} />
                                    <SIcon name={'Detalle'} height={17} width={22} />
                                    <SText center color={STheme.color.primary} fontSize={15} style={{ fontWeight: "bold" }}>Detalles {">"}</SText>
                                    <SHr height={20} />
                                </SView>
                                <SView col={"xs-6"} center row onPress={() => { SNavigation.navigate("/restaurante/comollegar", { pk: this.props.data.restaurante?.key }); }}>
                                    <SIcon name={'ComoLlegar'} height={26} width={26} />
                                    <SText color={STheme.color.primary} fontSize={15} style={{ fontWeight: "bold" }}>Cómo llegar {">"}</SText>
                                </SView>
                            </SView>
                            <SHr height={40} />
                        </SView>
                        {/* </SView> */}

                    </Container>
                </SView>
            </SPage>
        );
    }
}

