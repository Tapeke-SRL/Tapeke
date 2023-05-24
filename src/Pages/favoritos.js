import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
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
        return <SView col={"xs-11 sm-6 md-6"} center height>
            {/* <SHr height={100} /> */}
            <SText fontSize={18} center color={STheme.color.text} bold >Usted no tiene Favoritos</SText>
            {/* <SHr height={50} /> */}
            {/* <Container center> */}
            <SIcon name={"SinFavorito"} width={280} height={280} fill="red" />
            {/* </Container> */}
        </SView>
    }
    render_with_data() {
        if (!this.state.loading) return <SLoad />
        if (!this.loadData()) return <SLoad />
        var favoritos_filters = Object.values(this.favoritos).filter(o => o.estado != 0);
        if (favoritos_filters.length <= 0) return this.render_sin_favoritos()
        return <SView height center>
            <SList
                // flex
                // center
                data={favoritos_filters}
                render={(obj) => {
                    if (!this.restaurantes[obj.key_restaurante]) return null;
                    return <Restaurante.Card key={obj.key} data={this.restaurantes[obj.key_restaurante]} onPress={(data) => {
                        SNavigation.navigate("/restaurante", { pk: data.key })
                    }} />
                }}
            />
        </SView>
    }
    render() {
        return (
            <SPage
                // navBar={}
                hidden
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<AccentBar />}
            // disableScroll

            >
                <Container>
                    <SHr height={40} />
                    {this.render_with_data()}
                </Container>
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