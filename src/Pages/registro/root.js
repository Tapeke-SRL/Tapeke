import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SPopup, SText, SThread, SView } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from './components/BtnSend';
import Header from './components/Header';
import SectionApis from '../login/components/SectionApis';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }

    render() {
        var defaultData = {
            ...this.params,
        };
        if (this.state.reload) {
            this.state.reload = false;
            new SThread(200, "reload_login", true).start(() => {
                this.params = SNavigation.getAllParams();
                this.setState({ reload: false })
            })
            return <SLoad />
        }
        return (
            <SPage footer={<AccentBar />} >
                <Header title={"Bienvenido a Tapeke"} />
                <SHr height={20} />
                <Container>
                    <SForm
                        ref={(form) => { this.form = form; }}
                        col={"xs-12"}
                        inputProps={{
                            col: "xs-12",
                            separation: 16
                        }}
                        style={{
                            alignItems: "center",
                        }}
                        inputs={{
                            Nombres: { placeholder: "Nombres", isRequired: true, defaultValue: defaultData.Nombres },
                            Apellidos: { placeholder: "Apellidos", isRequired: true, defaultValue: defaultData.Apellidos },
                            Correo: { placeholder: "Correo", type: "email", isRequired: true, defaultValue: defaultData.Correo },
                        }}
                        onSubmit={(values) => {
                            Model.usuario.Action.validateRegistro({
                                ...values,
                                Telefono: "+591 xxxxxxx"
                            }).then(resp => {
                                if (!this.params.type) {
                                    SNavigation.navigate("/registro/password", {
                                        ...this.params,
                                        ...values,
                                    })
                                } else {
                                    SNavigation.navigate("/registro/telefono", {
                                        ...this.params,
                                        ...values,
                                    })
                                }
                            }).catch(e => {
                                SPopup.alert("Ya existe un usuario con este correo.")
                            })

                        }}
                    />
                    <SHr height={20} />
                    <SectionApis label={"o Registrate con"} onChange={() => {
                        this.state.reload = true;
                    }} />
                    <SHr height={20} />
                    <BtnSend onPress={() => this.form.submit()}>{"CONTINUAR"}</BtnSend>
                    <SHr height={30} />
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);