import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SDate, SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Container, PButtom, Pedido, Restaurante, TipoPago } from '../../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../../Model';
import BarraCargando from '../../../../Components/BarraCargando';


export default class pendiente_pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        };
    }

    componentDidMount() {
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
        return (<SPage  >
            <Container>
                <SHr height={18} />
                <Pedido.DetallePedido data={this.props.data} />
                <SHr height={18} />
                <Pedido.DetallePago data={this.props.data} />
                <SHr height={32} />
                <SText center fontSize={12}>{"ESPERA LA HORA DE ENTREGA PARA QUE UN DELIVERY TE LLEVE EL PEDIDO"}</SText>
                <SHr h={32} />
                <BarraCargando />
                <SHr h={32} />
                <SText fontSize={18} color={STheme.color.primary} bold center >{new SDate(this.props.data?.fecha, "yyyy-MM-dd").toString("DAY, dd de MONTH del yyyy")}</SText>
                <SText fontSize={18} color={STheme.color.primary} bold center >{this.props.data?.horario?.hora_inicio} - {this.props.data?.horario?.hora_fin}</SText>

            </Container>
        </SPage>
        );
    }
}

