import React, { Component } from 'react';
import { SIcon, SLoad, SNavigation, SText, SUuid, SView } from 'servisofts-component';
import Model from '../../Model';

type propsType = {
    data: any,
}

export default class Chat extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        if (!this.props.data.key) return null;
        let chat = Model.chat.Action.getByKey(this.props.data.key);
        // if (!chat) return <SLoad />
        return <SView width={30} height={30} center
            style={{
                position: "absolute",
                top: 25,
                right: 18,
                zIndex: 999,
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
            <SIcon name='Ichat' width={28} height={28} />
        </SView>
    }
}