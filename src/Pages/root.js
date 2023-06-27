import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, NavBar, Pedido, Restaurante, TopBar } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket'

class index extends Component {
    static TOPBAR = <TopBar type={"ubicacion"} />;
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData() {
        Model.pedido.Action.CLEAR();
        Model.pedido.Action._getReducer().data_activos_inicio = "";
        Model.horario.Action.CLEAR();
        Model.pack.Action.CLEAR();
        Model.restaurante.Action.CLEAR();
        Model.pack_extra.Action.CLEAR();
        Model.favorito.Action.CLEAR();
        Model.incentivo.Action.CLEAR();
        this.restaurantes = null;
        this.novedades = null;

    }
    loadData() {
        this.filtros = Model.filtros.Action.getAll();
        // console.log(this.filtros)

        if (!this.restaurantes) {
            this.restaurantes = Model.restaurante.Action.getAllFilters();
        }
        if (!this.novedades) {
            this.novedades = Model.novedades.Action.getAll();
        }
        // if (!this.restaurantes) return null;
        if (this.restaurantes) {
            // if (Object.keys(this.restaurantes).length === 0) {
            //     SPopup.alert("No hay restaurantes para mostrar")
            // }
        } else {
            return null;
        }
        return true;
    }

    render_list_recomendados() {
        if (!this.loadData()) return <SLoad />
        if (Object.keys(this.restaurantes).length === 0) return <SView col={"xs-12"} center row><SIcon name={"Noneicon"} height={70} /></SView>;
        return <SView col={"xs-12"} height={195}>
            <ScrollView horizontal contentContainerStyle={{
                width: null,
            }}>
                <SList horizontal center initSpace={8}
                    data={this.restaurantes}
                    limit={5}
                    render={(obj) => {
                        return <Restaurante.Card data={obj} onPress={(data) => {
                            SNavigation.navigate("/restaurante", { pk: data.key })
                        }} />
                    }}
                />
            </ScrollView>
        </SView>
    }
    render_list_pronto() {
        if (!this.loadData()) return <SLoad />
        if (Object.keys(this.restaurantes).length === 0) return <SView col={"xs-12"} center row><SIcon name={"Noneicon"} height={70} /></SView>;
        return <SView col={"xs-12"} height={195}>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    width: null,
                }}>
                <SList horizontal center initSpace={8}
                    data={this.restaurantes}
                    limit={5}
                    order={[{ key: "proximo_horario/fecha", order: "asc", peso: 2 }]}
                    render={(obj) => {

                        return <Restaurante.Card data={obj} onPress={(data) => {
                            SNavigation.navigate("/restaurante", { pk: data.key })
                        }} />
                    }}
                />
            </ScrollView>
        </SView>
    }
    render_list_cerca() {
        if (!this.loadData()) return <SLoad />
        if (Object.keys(this.restaurantes).length === 0) return <SView col={"xs-12"} center row><SIcon name={"Noneicon"} height={70} /></SView>;
        const data_format = Object.values(this.restaurantes).sort((a, b) => (a.distancia ?? 0) - (b.distancia ?? 0));
        return <SView col={"xs-12"} height={195}>
            <ScrollView horizontal contentContainerStyle={{
                width: null,
            }}>
                <SList horizontal center initSpace={8}
                    data={data_format}
                    limit={5}
                    // order={[{ key: "distancia", order: "asc", peso: 2 }]}
                    render={(obj) => {
                        return <Restaurante.Card data={obj} onPress={(data) => {
                            SNavigation.navigate("/restaurante", { pk: data.key })
                        }} />
                    }}
                />
            </ScrollView>
        </SView>
    }
    render_pedidos_en_curso() {
        this.pedidos_en_curso = Model.pedido.Action.getEnCurso();
        if (!this.pedidos_en_curso) return null;
        if (!this.pedidos_en_curso.length) return null;
        return <SView col={"xs-12"} height={195}>
            <SHr height={20} />
            <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Pedidos en curso"}</SText>
            <SHr />
            <ScrollView horizontal contentContainerStyle={{
                width: null,
            }}>
                <SList horizontal center initSpace={8}
                    data={this.pedidos_en_curso}
                    limit={5}
                    render={(obj) => {
                        return <Pedido.Card data={obj} onPress={(data) => {
                            SNavigation.navigate("/pedido", { pk: data.key })
                        }} />
                    }}
                />
            </ScrollView>
        </SView>
    }
    render_novedades() {
        var novedades = Model.novedades.Action.getAll();
        if (!novedades) return <SLoad />
        return <SView col={"xs-12"} height={195}>
            {/* <SScrollView2 contentContainerStyle={{
                width: null,
            }}> */}
            <SList
                horizontal
                initSpace={8}
                data={novedades}
                render={(data) => {
                    return <SView card width={318} height={150} style={{
                        overflow: "hidden"
                    }}>
                        <SImage src={SSocket.api.root + "novedades/" + data.key} style={{
                            resizeMode: "cover"
                        }} />
                    </SView>
                }}
            />
            {/* </SScrollView2> */}
        </SView>
    }
    render_with_data() {

        return <SView col={"xs-12"}>
            {this.render_pedidos_en_curso()}
            <SHr height={20} />
            <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Pronto"}</SText>
            <SHr />
            {this.render_list_pronto()}
            <SHr height={20} />
            <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Recomendados Para Ti"}</SText>
            <SHr />
            {this.render_list_recomendados()}
            <SHr height={20} />
            <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Cerca"}</SText>
            <SHr />
            {this.render_list_cerca()}
            <SHr height={20} />
            <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Novedades"}</SText>
            <SHr />
            {this.render_novedades()}
        </SView>

    }

    render() {
        var miDireccion = Model.filtros.Action.getByKey("direccion")?.select
        if (!miDireccion) {
            // console.log("Entro en mi direccion", miDireccion)
            SNavigation.replace("/direccion");
            return null;
        }
        return (
            <SPage
                // navBar={this.navBar()}
                hidden
                footer={this.footer()}
                onRefresh={this.clearData.bind(this)}
            >
                <SView col={"xs-12"}>
                    {this.render_with_data()}
                </SView>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/root"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);