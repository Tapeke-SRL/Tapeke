import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    SButtom,
    SHr,
    SIcon,
    SImage,
    SLoad,
    SMath,
    SNavigation,
    SPage,
    SPopup,
    SText,
    STheme,
    SThread,
    SUuid,
    SView,
} from 'servisofts-component';
import {
    AccentBar,
    Container,
    PButtom,
    Popups,
    Restaurante,
} from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_pedido: SUuid(),
            alerta: true,
        };
        this.pk = SNavigation.getParam('pk');
    }
    componentDidMount() {
        new SThread(500, 'anykey', true).start(() => {
            this.setState({ loading_page: true });
        });
    }
    load_data() {
        if (!this.data) {
            this.data = Model.restaurante.Action.getByKeyRecursive(this.pk);
        }
        return this.data;
    }

    handlePress() {
        if (!Model.usuario.Action.getKey()) {
            Popups.InicieSession.open();
            // SNavigation.navigate("/login");
            // SPopup.alert("Inicie session con un usuario para comprar un tapeke.")
            return;
        }

        var direccion_str =
            Model.filtros.Action.getByKey('direccion')?.select?.direccion;
        if (!direccion_str) {
            SPopup.alert('Inserte dirección para realizar el pedido.');
            return;
        }
        var key_direccion =
            Model.filtros.Action.getByKey('direccion')?.select?.key;
        var direccion = {};

        if (key_direccion) {
            direccion = {
                key_direccion_usuario: key_direccion,
            };
        } else {
            var latitude =
                Model.filtros.Action.getByKey('direccion')?.select?.latitude;
            var longitude =
                Model.filtros.Action.getByKey('direccion')?.select?.longitude;
            direccion = {
                direccion: direccion_str,
                latitude: latitude,
                longitude: longitude,
            };
        }
        var total = this.ref_totales.getValue();
        // console.log(val)
        // return;
        this.setState({ loading: true });

        var resquest = {
            key_usuario: Model.usuario.Action.getKey(),
            key_pedido: this.state.key_pedido,
            data: {
                key_pack: this.data?.proximo_horario?.pack?.key,
                cantidad: total.cantidad ?? 1,
                delivery: !!total.envio,
                fecha: this.data?.proximo_horario?.fecha,
                direccion: direccion,
            },
        };

        // return;
        Model.pedido.Action.registro(resquest)
            .then(resp => {
                console.log(resp);
                SNavigation.navigate('/pedido', { pk: resp.data.key });
                this.state.key_pedido = SUuid();
                this.setState({ loading: false });
            })
            .catch(e => {
                if (e.error == 'agotado') {
                    Popups.TapekesAgotados.open();
                }
                this.setState({ loading: false });
            });
    }

    btn = ({ title, onPress, active }) => {
        return (
            <SView
                col={'xs-5.5'}
                height={44}
                center
                border={STheme.color.primary}
                backgroundColor={active ? STheme.color.primary : ''}
                style={{ borderRadius: 8 }}
                onPress={onPress}
            >
                <SText
                    fontSize={14}
                    color={
                        active ? STheme.color.secondary : STheme.color.primary
                    }
                    bold
                >
                    {title}
                </SText>
            </SView>
        );
    };

    popupAlerta(dato) {
        if (!dato) return <SLoad />;
        var INSTACE = this;
        return (
            <SView
                style={{
                    width: '100%',
                    maxWidth: 365,
                    height: 220,
                    borderRadius: 30,
                    padding: 8,
                }}
                center
                withoutFeedback
                backgroundColor={STheme.color.background}
            >
                <SHr height={10} />
                <SView col={'xs-10'} center>
                    <SText
                        color={STheme.color.darkGray}
                        style={{ fontSize: 16 }}
                        center
                    >
                        El horario de la compra de este Tapeke será:
                    </SText>
                </SView>
                <SHr height={10} />
                <SView col={'xs-10'} center row>
                    <SView
                        col
                        row
                        style={{ borderColor: '#FA790E', borderBottomWidth: 2 }}
                    />
                    <SHr />
                    <SView col={'xs-8'} center>
                        <SText bold fontSize={16}>
                            {dato?.proximo_horario?.extraData?.text}
                        </SText>
                        <SText bold fontSize={18}>
                            {dato?.proximo_horario?.extraData?.hora_inicio} -{' '}
                            {dato?.proximo_horario?.extraData?.hora_fin}
                        </SText>
                    </SView>
                    <SView col={'xs-3'} style={{ alignItems: 'flex-start' }}>
                        <SIcon
                            name='Ihand'
                            width={60}
                            height={60}
                            fill='#96BE00'
                        />
                    </SView>
                    <SHr />
                    <SView
                        col
                        row
                        style={{ borderColor: '#FA790E', borderBottomWidth: 2 }}
                    />
                    <SHr />
                </SView>
                <SView flex />
                <SView col={'xs-12'} style={{ alignItems: 'center' }}>
                    <SView row col={'xs-11'} center>
                        <SHr height={10} />
                        {this.btn({
                            title: 'Entendido',
                            onPress: () => {
                                SPopup.close('alerta');
                            },
                            active: true,
                        })}
                    </SView>
                </SView>
                <SView flex />
                <SHr />
            </SView>
        );
    }

    render_data() {
        if (!this.state.loading_page) return <SLoad />;
        if (!this.load_data()) return <SLoad />;

        if (this.data && this.state.alerta) {
            this.setState({ alerta: false });
            SPopup.open({
                key: 'alerta',
                content: this.popupAlerta(this.data),
            });
        }

        return (
            <SView col={'xs-11 sm-10 md-8 lg-6 xl-4'} center>
                <SHr h={15} />
                <Restaurante.reserva.Detalle
                    ref={ref => (this.ref_detalle = ref)}
                    data={this.data}
                    onChange={e => {
                        this.ref_totales.setCantidad(e);
                    }}
                />
                <SHr h={15} />
                <Restaurante.reserva.Totales
                    data={this.data}
                    ref={ref => (this.ref_totales = ref)}
                />
                <SHr h={15} />
                <Restaurante.reserva.TipoEntrega
                    data={this.data}
                    onChange={e => {
                        this.ref_totales.setTipoEnvio(e);
                        this.ref_detalle.setTipoEnvio(e);
                    }}
                />
                <SHr h={15} />
                <PButtom
                    loading={this.state.loading}
                    fontSize={20}
                    onPress={this.handlePress.bind(this)}
                >
                    REALIZAR PEDIDO
                </PButtom>
                <SHr height={40} />
            </SView>
        );
    }
    render() {
        return (
            <SPage header={<AccentBar />} onRefresh={(resolve) => {
                // Model.incentivo.Action.CLEAR();
            }}>
                <SView
                    backgroundColor={STheme.color.card}
                    col={'xs-12'}
                    height
                    style={{ position: 'absolute' }}
                ></SView>
                <SView col={'xs-12'} center>
                    {this.render_data()}
                </SView>
            </SPage>
        );
    }
}
const initStates = state => {
    return { state };
};
export default connect(initStates)(index);
// export default index;
