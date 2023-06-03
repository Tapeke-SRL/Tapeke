import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
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
        Model.restaurante.Action.CLEAR();
    }
    loadData() {
        if (!this.restaurantes) {
            this.restaurantes = Model.restaurante.Action.getAllRecursive();
        }
        if (!this.restaurantes) return null;
        return true;
    }

    render_list_recomendados() {
        return <Container>
            <SList
                initSpace={8}
                buscador
                flex
                data={this.restaurantes}
                // filter={obj => obj?.proximo_horario?.pack?.cantidad > 0}
                order={[
                    { key: "proximo_horario/pack/cantidad", order: "asc", peso: 1 },
                    { key: "distancia", order: "asc", peso: 2 },
                    { key: "proximo_horario/fecha", order: "asc", peso: 3 },
                ]}
                limit={5}
                render={(obj) => {
                    // console.log(obj)
                    return <Restaurante.Card col={"xs-12"} width={0} data={obj} onPress={(data) => {
                        SNavigation.navigate("/restaurante", { pk: data.key })
                    }} />
                }}
            />
        </Container>
    }
    render_with_data() {
        if (!this.state.loading) return <SLoad />
        if (!this.loadData()) return <SLoad />
        return <SView col={"xs-12"} center>
            {this.render_list_recomendados()}
        </SView>

    }
    navBar() {
        return <TopBar type={"ubicacion"} title='Hola' />
    }

    header() {
        return <SView col={"xs-12"}>
            <Container>
                {/* <Restaurante.BarraFiltros /> */}
            </Container>
        </SView>
    }
    render() {
        return (
            <SPage
                // navBar={this.navBar()}
                header={this.header()}
                // footer={this.footer()}
                onRefresh={this.clearData}>
                {this.render_with_data()}
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);