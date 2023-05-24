import React, { Component } from 'react';
import { SHr, SMath, SText, STheme, SView } from 'servisofts-component';

type propsType = {
    precio: Number,
    cantidad: Number,
    delivery: Number,
    cupon: Number
}

export default class DetallePago extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    getDetalleDelivery() {
        if (!this.props?.data.delivery) return null;
        let monto = this.props?.data.delivery;
        if (this.props?.data?.incentivos) {
            this.props?.data?.incentivos.map(a => monto += a.monto)
        }
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Envío</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. {SMath.formatMoney(monto)}</SText>
            </SView>
        </SView>
    }
    getDetalleCupon() {
        if (!this.props.data.cupon_usuario) return null;;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Cupón:</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. -{SMath.formatMoney(this.props.data.cupon_usuario.monto)}</SText>
            </SView>
        </SView>
    }

    getIncentivos() {
        if (!this.props?.data?.incentivos) return null;
        return this.props.data.incentivos.map((obj) => {
            return <SView row col={"xs-12"}>
                <SView col={"xs-6"} >
                    <SText style={{ textAlign: "justify", fontWeight: "bold" }} fontSize={15}>{obj.tipo}</SText>
                </SView>
                <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={15} bold >Bs. {SMath.formatMoney(obj.monto)}</SText>
                </SView>
            </SView>
        })

    }
    getSubTotal() {
        const { precio, cantidad, delivery, cupon } = this.props.data;
        var total = (precio * cantidad)
        if (!total) return null;;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Total:</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. {SMath.formatMoney(total)}</SText>
            </SView>
        </SView>
    }
    getTotal() {
        const { precio, cantidad, delivery, cupon, cupon_usuario, monto_total } = this.props.data;
        // var total = (monto_total) - (cupon ?? 0);
        var total = (monto_total) - (cupon_usuario?.monto ?? 0);
        if (!total) return null;;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Total:</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. {SMath.formatMoney(total)}</SText>
            </SView>
        </SView>
    }
    getTipoPago() {
        var tipo = "Online";
        if (this.props.data.tipo_pago) {
            var efectivo = this.props.data.tipo_pago.find(o => o.type == "efectivo");
            if (efectivo) {
                tipo = "Efectivo"
            }
        }
        return <SView col={"xs-12"} row center>
            <SView col={"xs-6"} center>
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>{tipo}</SText>
            </SView>
        </SView>
    }
    render() {
        const { precio, cantidad, delivery, cupon } = this.props.data;
        var total = ((precio * cantidad) + parseFloat(delivery)) - (cupon ?? 0);
        return <SView col={"xs-12"} row center style={{ backgroundColor: STheme.color.white }}>
            <SView col={"xs-11"} row center>
                <SHr height={15} />

                {this.getSubTotal()}
                <SHr height={10} />
                {this.getDetalleDelivery()}
                <SHr height={10} />
                {/* {this.getIncentivos()} */}
                {/* <SHr height={10} /> */}
                {this.getDetalleCupon()}
                <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                <SHr height={10} />
                {this.getTotal()}
                <SHr height={10} />
                {this.getTipoPago()}
                <SHr height={15} />
            </SView>
        </SView>
    }
}