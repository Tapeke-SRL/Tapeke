import React, { Component } from 'react';
import { Linking } from 'react-native';
import { SIcon, SLoad, SNavigation, SText, SUuid, SView } from 'servisofts-component';
import Model from '../../Model';

type propsType = {
    data: any,
    size?: any
}

export default class Chat extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size ?? 30
        };

    }
    render_chat() {
        if (!this.props.data.key) return null;
        let chat = Model.chat.Action.getByKey(this.props.data.key);
        // if (!chat) return <SLoad />
        return <SView width={this.state.size} height={this.state.size} center
            style={{
                // position: "absolute",
                // top: 25,
                // right: 18,
                // zIndex: 999,
                backgroundColor: "#F5F5F5",
                borderRadius: 5
            }}
            onPress={() => {
                Model.chat_mensaje.Action.CLEAR();
                if (!chat) {
                    Model.chat.Action.registro({
                        data: {
                            key: this.props.data.key,
                            descripcion: "Chat del delivery",
                            observacion: "--",
                            color: "#000000",
                            tipo: "pedido",
                        },
                        users: [
                            { key_usuario: this.props.data.key_usuario, tipo: "admin", app: "client" },
                            { key_usuario: this.props.data.key_conductor, tipo: "admin", app: "driver" },
                        ],
                        key_usuario: Model.usuario.Action.getKey()
                    }).then((resp) => {
                        SNavigation.navigate("/chat/profile", { pk: this.props.data.key })
                    }).catch(e => {
                        Model.chat.Action.CLEAR();
                        Model.chat_usuario.Action.CLEAR();
                        SNavigation.navigate("/chat/profile", { pk: this.props.data.key })
                    })
                } else {
                    SNavigation.navigate("/chat/profile", { pk: this.props.data.key })

                }
            }}>
            {/* <SText>{'Chat'}</SText> */}
            <SIcon name='Ichat' />
        </SView>
    }
    renderWhatsApp() {
        let kc = this.props?.data?.key_conductor;
        let user = Model.usuario.Action.getByKey(kc) ?? {};
        let telefono = user?.Telefono ?? "";
        telefono = telefono.replace(/\s/g, "");
        telefono = telefono.replace(/\+/g, "");
        if (telefono.length <= 7) {
            telefono = "59162241491";
        }
        return <SView width={this.state.size} height={this.state.size} center padding={2} onPress={() => {
            Linking.openURL(`https://api.whatsapp.com/send?phone=${telefono}`)
        }}>
            <SIcon name='whatsApp' fill={"#f0f"} />
        </SView>
    }
    render() {
        if (this.props?.data?.state != 'entregado_conductor' && this.props?.data?.state != 'conductor_llego') return null;
        return <SView height={50} row>
            {this.render_chat()}
            <SView width={this.state.size} />
            {this.renderWhatsApp()}
        </SView>
    }
}