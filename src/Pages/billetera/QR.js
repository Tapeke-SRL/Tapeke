import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, SImage, SInput, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { Container, PButtom } from '../../Components';
import SShared from '../../Components/SShared';
import Model from '../../Model';

class QR extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.data = JSON.parse(SNavigation.getParam("data"));
    }
    success() {
        SNavigation.goBack();
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
        const { transaction_id, image_data, checkout_amount } = this.data;
        return (
            <SPage disableScroll>
                <SView col={"xs-12"} center height style={{ backgroundColor: STheme.color.primary, }}>


                    <Container>
                        {/* <SView col={"xs-9"} border={'transparent'}  >
                            <SText fontSize={16} color='red' center> aqui va algo</SText>
                        </SView> */}
                        {/* <SHr height={16} /> */}
                        <SView col={"xs-12"} center  >
                            <SView center col={"xs-9"} colSquare backgroundColor={"#fff"} style={{ padding: 32, borderRadius: 16 }}>
                                <SImage src={"data:image/jpeg;base64," + image_data} />
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                            </SView>
                        </SView>
                        <SHr height={16} />
                        <SView col={"xs-12"} height={100} row center  >
                            <SView col={"xs-2"} height center>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {
                                    // SPopup.alert("QR descargada con éxito");
                                    SPopup.open({ content: this.popupDescargaQr(), key: "descargaqr" });
                                    SShared.saveB64("data:image/jpeg;base64," + image_data)
                                }}>
                                    <SIcon name={"ImgSave"} />
                                </SView>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => { SShared.sharedB64("data:image/jpeg;base64," + image_data) }}>
                                    <SIcon name={"ImgShare"} />
                                </SView>
                            </SView>
                            <SView col={"xs-2"} height center>
                            </SView>
                        </SView>
                        <SHr height={16} />

                        <PButtom withe loading={this.state.loading} onPress={() => {
                            // var params = `?transaction_id=${transaction_id}&profile_code=0&message=asdsa&internal_code=${Model.usuario.Action.getKey()}_QR&checkout_amount=${checkout_amount}&checkout_currency=BOB&status=success`
                            // var url = `https://tapeke.servisofts.com/http/rest/qhantuy/callback_billetera`;
                            // // var url = `http://192.168.2.1:30031/rest/qhantuy/callback_billetera`;
                            // console.log(url+params)
                            SSocket.sendPromise(
                                {
                                    "component": "billetera",
                                    "type": "getByTransactionId",
                                    "transaction_id": transaction_id + "",
                                }
                            ).then((resp) => {

                                this.setState({ loading: false });
                                if (!!resp?.data?.key) {
                                    this.success();
                                }
                            }).catch((err) => {
                                this.setState({ loading: false });
                                console.error("Error en el pago", err);
                            });
                        }}>Verificar pago</PButtom>

                    </Container>

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(QR);