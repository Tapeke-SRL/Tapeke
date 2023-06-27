import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SMath, SNavigation, SPage, SPopup, SScroll, SScrollView2, SText, STheme, SView, SThread } from 'servisofts-component';
import { Contador, Container, PButtom, Popups, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import SShared from '../../../Components/SShared';
import Model from '../../../Model';
import BarraCargando from '../../../Components/BarraCargando';
import TiempoRestantePago from '../../../Components/Pedido/TiempoRestantePago';

export default class pago_en_proceso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.isRun = true;
    }

    componentDidMount() {
        console.log(this.isRun)
        this.isRun = true;
        this.getParams();
        // this.getDetallePedido();
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
            if (resp?.data?.transaction_id) {
                this.isRun = false;
                this.setState({ pay_order: resp.data });
            }
        }).catch((err) => {
            if (err.error == "noIniciado") {
                new SThread(1000, "getPaymentStatus", true).start(() => {
                    if (!this.isRun) return;
                    this.getParams();
                })
                return;
            }
        });
        new SThread(4000, "getPaymentStatus", true).start(() => {
            if (!this.isRun) return;
            this.getParams();
        })
    }

    // async getDetallePedido() {
    //     if (!this.isRun) return;
    //     if (this.state.isLoading) return;
    //     // this.setState({ isLoading: true });
    //     SSocket.sendPromise({
    //         component: "pedido",
    //         type: "getDetalle",
    //         estado: "cargando",
    //         key_pedido: this.key_pedido,
    //         key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    //     }).then((resp) => {
    //         if (!this.isRun) return;
    //         Validations.set_pedido_en_curso(resp.data);
    //         Validations.pedido_en_curso("pedido/mensajeSolicitud");
    //         // this.setState({ pedido: { ...resp.data } });
    //         new SThread(5000, "getDetallePedido", false).start(() => {
    //             this.getDetallePedido();
    //         });
    //     }).catch((err) => {
    //         if (err.error == "noIniciado") {
    //             new SThread(500, "reintent_get_detalle", false).start(() => {
    //                 if (!this.isRun) return;
    //                 this.getDetallePedido();
    //             })
    //             return;
    //         }
    //     })
    // }



    getQr() {
        var po = this.state.pay_order;
        if (!po) return null;
        var obj = po.data;
        if (!obj) return null;
        return "data:image/jpeg;base64," + obj?.image_data;
    }
    popupDescargaQr() {
        return <>
            <SView width={362} center row style={{ borderRadius: 32, overflow: "hidden" }} withoutFeedback backgroundColor={STheme.color.background}   >
                <SHr height={40} />
                <SView col={"xs-11"} center row>
                    <SView col={"xs-12"} center >
                        <SIcon width={100} name='IconSucces' fill='#99CC00'></SIcon>
                    </SView>
                    <SHr height={20} />
                    <SView col={"xs-12"} center>
                        <SText fontSize={14} color={STheme.color.text}  >QR descargada con éxito.</SText>
                    </SView>
                    <SHr height={40} />
                </SView>
            </SView>
        </>
    }


    render() {

        return <SPage center hidden disableScroll >
            {/* <SView col={"xs-12"} height center backgroundColor='#f0f'> */}
            <SView center col={"xs-12"} flex style={{ backgroundColor: STheme.color.primary, }} >
                {this.render_data()}
            </SView>

            {/* </SView> */}
        </SPage>
    }
    render_data() {
        const { delivery, precio, distancia, cantidad, key } = this.props.data;
        if (!this.state?.pay_order?.data) {
            return <SView center col={"xs-12"} flex backgroundColor={STheme.color.background}>
                <SIcon name='Logo' fill={STheme.color.secondary} width={200} height={200} />
                <SHr h={100} />
                <SView width={200} >
                    <BarraCargando />
                </SView>
                <SHr />
                <SText fontSize={14} center >Verificando método de pago.</SText>
            </SView>
        }
        return (<SView center col={"xs-12"} flex style={{ backgroundColor: STheme.color.primary, }} >
            <SScrollView2 >
                <SHr height={50} />
                <Container>
                    <SHr height={16} />
                    <SView col={"xs-9"} border={'transparent'}  >
                        <SText fontSize={16} color='white' center >Escanea el QR para realizar el</SText>
                    </SView>
                    <SHr height={50} />
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
                                // SPopup.alert("QR descargada con éxito");
                                SPopup.open({ content: this.popupDescargaQr(), key: "descargaqr" });

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
                    <SHr height={16} />
                    <SText fontSize={18} bold color={STheme.color.secondary}>En: </SText>
                    <SHr h={4} />
                    <TiempoRestantePago pay_order={this.state.pay_order} />
                    <SHr h={4} />
                    <SText col={"xs-12"} fontSize={18} center bold color={STheme.color.secondary}>Se vence el QR para este pedido.</SText>
                    <SHr h={32} />
                    <SView center padding={16} onPress={() => {
                        // this.getParams()
                        Model.pedido.Action.CLEAR();
                    }}>
                        <SText underLine fontSize={18} center color={STheme.color.secondary}>¿Ya pagaste? ¡Haz click aquí!</SText>
                    </SView>
                    <SHr h={50} />
                </Container>
            </SScrollView2>
            <SView col={"xs-12"} style={{
                top: 0,
                padding: 8,
                position: "absolute"
            }}>
                <SText fontSize={18} color='white' onPress={() => {
                    SPopup.confirm({
                        title: "¿Seguro quieres seleccionar otro método de pago?",
                        message: "Podrás seleccionar otro método de pago, pero este QR ya no será válido para comprar el Tapeke. *¡No pagues este QR!*",
                        onPress: () => {
                            Model.pedido.Action.action({ key_pedido: key, action: "select_pay_method" }).then((resp) => {
                                console.log(resp);
                            })
                        },
                    })
                }} underLine>{"< Volver"}</SText>
            </SView>
        </SView>
        );
    }
}

