import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SThread, SUuid, SView } from 'servisofts-component';
import Model from '../../../Model';

export default class Totales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidad: 1,
        };
    }

    getValue() {
        return this.state;
    }
    setCantidad(val) {
        this.setState({ cantidad: val })
    }
    setTipoEnvio(data) {
        this.setState({ envio: data.delivery })
    }

    render() {
        let total = (this.state.cantidad * (this.props.data?.proximo_horario?.pack?.precio ?? 0));
        return (
            <SView col={"xs-12"} row center style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SHr height={15} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify" }} fontSize={15}   >Total</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15}   >Bs. {SMath.formatMoney(total)}</SText>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify" }} fontSize={15}   >Envío</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15}   >{this.state.envio ? "Bs. " + SMath.formatMoney(this.state.envio) : null}</SText>
                    </SView>
                    <SHr height={10} />

                    <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                    <SHr height={10} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify", fontWeight: "bold" }} fontSize={15}   >Total</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15} style={{ fontWeight: "bold" }} >Bs. {total + (this.state.envio ?? 0)}</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>
        );
    }
}
