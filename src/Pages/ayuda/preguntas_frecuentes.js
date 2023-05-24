import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, Restaurante, TopBar } from '../../Components';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navBar() {
        return <TopBar type={"default"} title='Preguntas Frecuentes' />
    }

    item({ url, label, id, requireUser }) {
        return <SView col={"xs-12"} center  backgroundColor={STheme.color.card} style={{ borderRadius: 16, borderLeftWidth: 20, borderColor: STheme.color.primary }} onPress={() => {
            if (requireUser && !Model.usuario.Action.getKey()) {
                Popups.InicieSession.open();
                return;
            }

            SNavigation.navigate(url, { pk: id })
        }}>
            <SHr height={20} />
            <SView col={"xs-12"} row center >
                <SView col={"xs-11"} flex >
                    <SView width={30}></SView>
                    <SText color={STheme.color.text} fontSize={16} style={{paddingLeft:5}}>{label}</SText>
                </SView>
                <SView col={"xs-1"} style={{}} >
                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                </SView>
            </SView>
            <SHr height={20} />
        </SView>
    }

    render() {
        return (
            <SPage
                navBar={this.navBar()}
                onRefresh={this.clearData}
                header={<AccentBar />}>
                <Container>
                    <SHr height={40} />
                    <SView col={"xs-12"} row>
                        <SText fontSize={18}>GENERAL</SText>
                        <SHr height={15} />
                    </SView>
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Quiénes somos?",
                        id: "0"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cuáles son los métodos de pago aceptados?",
                        id: "1"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cuáles son los horarios de atención?",
                        id: "2"
                    })}
                    <SHr height={15} />
                    <SView col={"xs-12"} row>
                        <SText fontSize={18}>MI CUENTA</SText>
                        <SHr height={15} />
                    </SView>
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cómo crear una cuenta en Tapeke?",
                        id: "3"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cómo hacer un pedido?",
                        id: "4"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cómo agregar un cupón en la app?",
                        id: "5"
                    })}
                    <SHr height={15} />
                    <SView col={"xs-12"} row>
                        <SText fontSize={18}>PEDIDOS</SText>
                        <SHr height={15} />
                    </SView>
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Puedo enviar pedidos a otra dirección?",
                        id: "6"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Por qué algunos locales no están disponibles en mi zona?",
                        id: "7"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Puedo programar un pedido?",
                        id: "8"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Por qué el repartidor va en otra dirección?",
                        id: "9"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Como puedo saber el tiempo de entrega de mi pedido?",
                        id: "10"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Cómo puedo saber el estado de mi pedido?",
                        id: "11"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Debo darle propina al repartidor?",
                        id: "12"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Puedo modificar mi pedido?",
                        id: "13"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Qué hago si mi pedido fue cancelado?",
                        id: "14"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "¿Qué hago si mi pedido llega dañado?",
                        id: "15"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "Tengo problemas con la app",
                        id: "16"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes/respuesta",
                        label: "Quiero contactarlos",
                        id: "17"
                    })}
                    <SHr height={40} />
                </Container>
            </SPage>
        );
    }


}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);