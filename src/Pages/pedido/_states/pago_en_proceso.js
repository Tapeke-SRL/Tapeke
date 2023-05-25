import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Contador, Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import SShared from '../../../Components/SShared';
import Model from '../../../Model';
import BarraCargando from '../../../Components/BarraCargando';

export default class pago_en_proceso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        this.isRun = true;
        this.getParams();
        this.getDetallePedido();
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    async getParams() {
        if (!this.isRun) return;
        SSocket.sendPromise(
            {
                component: "pedido",
                type: "get_payment_order",
                key_pedido: this.props.data.key,
                // key_pedido: this.key_pedido,
            }
        ).then((resp) => {
            this.setState({ pay_order: resp.data });
        }).catch((err) => {
            if (err.error == "noIniciado") {
                new SThread(500, "getPaymentStatus", false).start(() => {
                    if (!this.isRun) return;
                    this.getParams();
                })
            }

        });
    }

    async getDetallePedido() {
        if (!this.isRun) return;
        if (this.state.isLoading) return;
        // this.setState({ isLoading: true });
        SSocket.sendPromise({
            component: "pedido",
            type: "getDetalle",
            estado: "cargando",
            key_pedido: this.key_pedido,
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }).then((resp) => {

            if (!this.isRun) return;
            Validations.set_pedido_en_curso(resp.data);
            Validations.pedido_en_curso("pedido/mensajeSolicitud");
            // this.setState({ pedido: { ...resp.data } });
            new SThread(5000, "getDetallePedido", false).start(() => {
                this.getDetallePedido();
            });
        }).catch((err) => {
            if (err.error == "noIniciado") {
                new SThread(500, "reintent_get_detalle", false).start(() => {
                    if (!this.isRun) return;
                    this.getDetallePedido();
                })
                return;
            }
        })
    }



    getQr() {
        var po = this.state.pay_order;
        if (!po) return null;
        var obj = po.data;
        if (!obj) return null;
        return "data:image/jpeg;base64," + obj?.image_data;
    }


    render() {

        return <SView center col={"xs-12"} height >
            {this.render_data()}
        </SView>
    }
    render_data() {
        const { delivery, precio, distancia, cantidad, key } = this.props.data;
        if (!this.state.pay_order) {
            return <SView center col={"xs-12"} height  >
                <SIcon name='Logo' fill={STheme.color.secondary} width={200} height={200} />
                <SHr h={100} />
                <SView width={200} >
                    <BarraCargando />
                </SView>
                <SHr />
                <SText fontSize={14} center >Verificando método de pago.</SText>
            </SView>
        }
        return (<SView center col={"xs-12"} height style={{ backgroundColor: STheme.color.primary, }} >
            <SHr height={16} />
            <SView col={"xs-12"} style={{
                padding: 8,
                position: "absolute",
                top: 0,

            }}>
                <SText fontSize={18} color='white' onPress={() => {
                    Model.pedido.Action.action({ key_pedido: key, action: "select_pay_method" }).then((resp) => {
                        console.log(resp);
                    })
                }} underLine>{"< Volver"}</SText>
            </SView>

            <Container>

                <SHr height={16} />
                <SView col={"xs-9"} border={'transparent'}  >
                    <SText fontSize={16} color='white' center >Escanea el QR para realizar el</SText>
                </SView>
                <SHr height={16} />
                <SView col={"xs-12"} center  >
                    <SView center col={"xs-9"} colSquare backgroundColor={"#fff"} style={{ padding: 40, borderRadius: 16 }}>
                        <SImage src={`${this.getQr()}`} />
                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                    </SView>
                </SView>
                <SHr height={16} />
                <SView col={"xs-12"} height={100} center row>
                    <SView flex center height={60} >
                        <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {
                            SPopup.alert("QR descargada con exito");
                            SShared.saveB64(this.getQr())
                        }}>
                            <SIcon name={"ImgSave"} />
                        </SView>
                    </SView>
                    <SView flex center height={60} >
                        <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => { SShared.sharedB64(this.getQr()) }}>
                            <SIcon name={"ImgShare"} />
                        </SView>
                    </SView>
                </SView>
            </Container>
            <SHr height={16} />

        </SView>
        );
    }
}

