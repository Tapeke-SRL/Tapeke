import React, { Component } from 'react';
import { SDate, SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView, SThread } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';

type propsType = {
    payment_order: any
}

export default class TiempoRestantePago extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        // Model.pedido.Action.getDetalle(this.pk).then((resp) => {
        //     console.log(resp);
        // })

        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }


    hilo() {
        if (!this.isRun) return;
        this.setState({ ...this.state })
        new SThread(0.5, "hilo_pedido", true).start(() => {
            this.hilo();
            if (!this.isRun) return;
        })
    }

    formatSecond(val) {
        const vf = parseFloat(val).toFixed(0)
        if (parseFloat(vf) < 10) return "0" + vf;
        return vf;
    }
    render() {
        if (!this.props.pay_order) return null;
        const { fecha_exp, fecha_on } = this.props.pay_order;
        let sfe = new SDate(fecha_exp, "yyyy-MM-ddThh:mm:ss");
        let time = new SDate().diffTime(sfe);
        let totalSeconds = Math.floor(time / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        if (time <= 0) return <SText fontSize={20} style={{ marginBottom: 4, }} bold color={STheme.color.secondary}>Vencido</SText>
        return <SView col={"xs-12 "} center>
            <SView row style={{
                alignItems: "flex-end"
            }}>
                <SView width={16}/>
                <SText fontSize={60} bold color={STheme.color.secondary}>{this.formatSecond(minutes)}:</SText>
                <SText fontSize={60} bold color={STheme.color.secondary}>{this.formatSecond(seconds)}</SText>
                <SView width={16} />
                <SText fontSize={20} style={{ marginBottom: 4, }} bold color={STheme.color.secondary}>min</SText>
            </SView>
        </SView>
    }
}