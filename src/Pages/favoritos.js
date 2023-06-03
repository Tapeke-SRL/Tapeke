import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScroll, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import { BottomNavigator, Container, Restaurante, TopBar, AccentBar } from '../Components';
import Model from '../Model';

class index extends Component {
    static TOPBAR = <TopBar type={"menu"} title='Mis Favoritos' />
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount() {
        new SThread(500, "anykey", true).start(() => {
            this.setState({ loading: true })
        })
    }
    clearData() {
        // Model.restaurante.Action.CLEAR();
        Model.favorito.Action.CLEAR();
        // Model.pedido.Action.CLEAR();
        // Model.horario.Action.CLEAR();
        // Model.pack.Action.CLEAR();
        Model.restaurante.Action.CLEAR();
        // Model.pack_extra.Action.CLEAR();
        // Model.favorito.Action.CLEAR();

        // this.restaurantes = null;
        // this.novedades = null;
    }
    loadData() {
        this.favoritos = Model.favorito.Action.getAll({ key_usuario: Model.usuario.Action.getKey() })
        this.restaurantes = Model.restaurante.Action.getAllRecursive();
        if (!this.restaurantes) return null;
        if (!this.favoritos) return null;
        return true;
    }
    render_sin_favoritos() {
        return <SView col={"xs-12"} center flex >
            {/* <SHr height={100} /> */}
            <SHr h={32} />
            <SText fontSize={24} col={"xs-11"} center color={STheme.color.text} bold >Usted no tiene Favoritos</SText>
            {/* <Container center> */}
            {/* <SHr h={16} /> */}
            <SView flex />
            <SView col={"xs-12"} style={{
                // height: "80%",
                maxHeight:"50%",
                paddingRight: "7%",
                // justifyContent: "flex-end",
            }}>
                <SIcon name={"SinFavorito"} width={"100%"} fill="red" />
            </SView>
            {/* </Container> */}
        </SView>
    }
    render_with_data() {

        if (!this.state.loading) return <SLoad />
        if (!this.loadData()) return <SLoad />

        var favoritos_filters = Object.values(this.favoritos).filter(o => o.estado != 0 && !!this.restaurantes[o.key_restaurante]);

        if (favoritos_filters.length <= 0) return this.render_sin_favoritos()
        return <SList
            flex
            col={"xs-12"}
            data={favoritos_filters}
            contentContainerStyle={{
                alignItems: 'center',
            }}
            // filter={obj => }
            render={(obj) => {
                return <Restaurante.Card key={obj.key} data={this.restaurantes[obj.key_restaurante]} onPress={(data) => {
                    SNavigation.navigate("/restaurante", { pk: data.key })
                }} />
            }}
        />
    }
    render() {
        return (
            <SPage
                // navBar={}
                hidden
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<AccentBar />}
            >
                <SView flex col={"xs-12"}>
                    {/* <SHr height={40} /> */}
                    {this.render_with_data()}
                </SView>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/favoritos"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);