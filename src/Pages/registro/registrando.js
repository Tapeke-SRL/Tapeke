import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from './components/BtnSend';
import Header from './components/Header';

class registrando extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }

    componentDidMount() {
        Model.usuario.Action.registro({
            data: this.params
        }).then((resp) => {
            var usuario = resp.data;
            console.log(usuario);
            let toLogin = {
                usuario: ""
            }
            if (usuario.gmail_key) {
                toLogin.usuario = usuario.gmail_key
            } else if (usuario.facebook_key) {
                toLogin.usuario = usuario.facebook_key
            } else if (usuario.apple_key) {
                toLogin.usuario = usuario.apple_key
            } else {
                toLogin.usuario = usuario.Correo
                toLogin.password = usuario.Password
            }
            Model.usuario.Action.loginByKey(toLogin).then(resp => {
                SNavigation.reset("/");
            }).catch(e => {
                SPopup.alert("Error al iniciar con el nuevo usuario");
                SNavigation.reset("/");
            })
        }).catch(err => {
            SPopup.alert("Error al registrar usuario");
            SNavigation.goBack();
        })
    }
    render() {
        var defaultData = {
            ...this.params
        };
        return (
            <SPage preventBack>
                <Header title={"Registrando en la base de datos"} />
                <Container>
                    <SLoad />
                    {/* <SText col={"xs-12"}>{JSON.stringify(this.params)}</SText> */}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(registrando);