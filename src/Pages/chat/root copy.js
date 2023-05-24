import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, } from 'servisofts-component';
import { Container, PButtom, PButtom2 } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket';



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    load_data() {
        this.data = Model.chat.Action.getAll({
            key_usuario: Model.usuario.Action.getKey()
        });
        return this.data;
    }

    _render_item(data) {
        return <SView col={"xs-12"} card style={{
            // backgroundColor: data.color + "33",
            overflow: 'hidden',
            borderRadius: 12
        }} onPress={() => {
            SNavigation.navigate("/chat/profile", { pk: data.key })
        }}>
            <SHr />
            <SView row col={"xs-12"} center>
                <SView width={8} />
                <SView width={50} height={50}
                    style={{
                        backgroundColor: STheme.color.card,
                        borderWidth: 2,
                        borderColor: STheme.color.primary,
                        borderRadius: 40,
                        overflow:"hidden"
                    }}
                >
                    <SImage src={SSocket.api.root + "usuario/" + data?.key_usuario + "?date=" + new Date().getTime()} style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover"
                    }} />
                    {console.log(data)}
                </SView>
                <SView width={8} />
                <SView flex>
                    <SText bold>{data.descripcion}</SText>
                    <SText >{data.observacion}</SText>
                    <SHr />
                    <SText fontSize={10}>{new SDate(data.fecha_on).toString("dd/MM/yyyy")} {new SDate(data.fecha_on).toString("hh:mm")}</SText>
                    
                </SView>
            </SView>
            <SHr />
            {/* <SHr height={4} color={data.color} /> */}
        </SView>
    }
    render_data() {
        if (!this.load_data()) return <SLoad />
        // console.log(this.data)
        var list = Object.values(this.data);
        if (list.length <= 0) {
            return <PButtom onPress={() => {
                Model.chat.Action.registro({
                    data: {
                        descripcion: "Chat de soporte",
                        observacion: "--",
                        color: "#ff0000"
                    },
                    app: "client",
                    key_usuario: Model.usuario.Action.getKey()
                }).then(resp => {
                    SNavigation.navigate("/chat/profile", { pk: resp.data.key })
                    console.log(resp);
                })
            }}>NUEVO CHAT</PButtom>
        }
        return <SView col={"xs-12"}>

            <SList data={this.data}
                initSpace={8}
                render={this._render_item} />
        </SView>
    }
    render() {
        return (<SPage title={'Chats'} onRefresh={() => {
            Model.chat.Action.CLEAR();
            Model.chat_mensaje.Action.CLEAR();
        }}>
            <Container>
                <SHr />
                {this.render_data()}
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);