import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SThread, SUuid, SView } from 'servisofts-component';
import Model from '../../../Model';

export default class TipoEntrega extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        if (this.props?.data?.key) {
            Model.incentivo.Action.getAllActivos({ key_restaurante: this.props?.data?.key }, true);
            this.setState({ monto: 0, load: false })
        }
    }
    handlePress(delivery) {
        if (delivery && this.state.monto <= 0) return;
        if (this.props.onChange) this.props.onChange({ delivery: delivery ? this.state.monto : false });
        // if (this.props.parent) parent.delivery = delivery ? this.state.monto : false
        this.setState({ delivery: delivery })
    }

    getCostoEnvio(distancia) {
        // TODO: ricky
        this.data_costos = Model.costo_envio.Action.getAll();
        this.incentivos = Model.incentivo.Action.getAllActivos({ key_restaurante: this.data.key });

        // let incentivos = this.getTotalIncentivos();

        if (!this.data_costos || !this.incentivos) return null;
        let monto_incentivos = 0;
        Object.values(this.incentivos).map((obj) => {
            monto_incentivos += obj.monto;
        })
        var distancia_t = distancia;
        console.log(distancia_t)

        var costo = { metro: 0, monto: 0 };
        var max = { monto: 0 };
        Object.values(this.data_costos).map(obj => {
            if (distancia_t <= obj.metro && (costo.metro > obj.metro || costo.metro == 0)) {
                costo = obj;
                return;
            }
            if (obj.monto >= max.monto) {
                max = obj;
            }
        })
        if (costo.monto <= 0) {
            costo = max;
        }

        this.costo_envio = costo;
        this.monto_incentivos = monto_incentivos;
        let total = costo.monto + monto_incentivos;
        if (!this.state.monto && !this.state.load) {
            this.setState({ monto: total, load: true })
        }
    }
    renderCostoEnvio() {
        if (this.state.monto) {
            return <SText fontSize={14}   >Costo del envío: Bs. {SMath.formatMoney(this.state.monto)} </SText>
        } else {
            return <SText fontSize={14}   >No hay costos de envío</SText>
        }
    }



    tipo_recoger(delivery, distancia) {
        return <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6, }}
            onPress={this.handlePress.bind(this, false)} >
            <SView col={"xs-2"} center flex>
                <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                    backgroundColor={!this.state.delivery ? STheme.color.primary : "transparent"} ></SView>
            </SView>
            <SView col={"xs-10"} >
                <SHr height={15} />
                <SText fontSize={18} col={"xs-12"} style={{ fontWeight: "bold" }}>Recoger del lugar </SText>
                <SHr height={10} />

                <SText fontSize={14} col={"xs-12"}   >¡Se encuentra a {distancia} Km de tu ubicación!</SText>
                <SHr height={15} />
                <SView col={"xs-12"} row center>
                    <SView col={"xs-6"} >
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end", }}
                        row
                        center>
                        <SIcon name={'ComoLlegar'} height={26} width={26} />
                        <SText color={STheme.color.primary} height={26} center fontSize={15} style={{ fontWeight: "bold" }}
                            onPress={() => {
                                SNavigation.navigate("/restaurante/comollegar", { pk: this.props.data.key });
                            }}
                        >Cómo llegar {">"}</SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={10} />
        </SView >
    }

    tipo_domicilio(delivery, distancia) {
        if (!delivery) return null;
        if (!this?.state?.monto) {
            this.getCostoEnvio(distancia)
        }
        return <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6 }} onPress={this.handlePress.bind(this, true)}>
            <SView col={"xs-2"} center flex>
                <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                    backgroundColor={!!this.state.delivery ? STheme.color.primary : "transparent"} ></SView>
            </SView>
            <SView col={"xs-10"} >
                <SHr height={15} />
                <SText fontSize={18} style={{ fontWeight: "bold" }}>Envío a domicilio</SText>
                <SHr height={30} />
                {this.renderCostoEnvio()}
                <SHr height={15} />
            </SView>
            <SHr height={10} />
        </SView >
    }
    render() {
        this.data = this.props.data;
        // if (!this.data) {
        // this.data = Model.restaurante.Action.getByKeyRecursive(this.props.key_restaurante);
        if (!this.data) return <SLoad />

        // }
        let delivery = this.data.delivery;
        return (
            <SView backgroundColor={STheme.color.background} col={"xs-12"} center>
                <SHr height={8} />
                <SView col={"xs-11"} style={{ opacity: delivery == true ? 1 : 0.3 }} >
                    <SText fontSize={18} style={{ fontWeight: "bold" }}>Tipo de entrega</SText>
                    <SHr height={15} />
                    {this.tipo_recoger(delivery, this.data.distancia)}
                    <SHr height={15} />
                    {this.tipo_domicilio(delivery, this.data.distancia_metros)}
                    <SHr height={15} />
                </SView>
            </SView>
        );
    }
}

// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(TipoEntrega);