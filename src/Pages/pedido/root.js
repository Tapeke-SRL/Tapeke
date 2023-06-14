import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SMarker, SNavigation, SPage, SStorage, SText, STheme, SThread, SView } from 'servisofts-component';
import Model from '../../Model';
import _states from './_states';
import { Popups } from '../../Components';
const KEY_STORAGE_DATA_POPUPS_PEDIDOS = "PEDIDOS_PAGADOS_ALERT_2"
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagados: [],
            loading: true
        };
        this.pk = SNavigation.getParam("pk");
        this.isRun = false;

    }

    componentDidMount() {
        SStorage.getItem(KEY_STORAGE_DATA_POPUPS_PEDIDOS, (data) => {
            if (data) {
                this.state.pagados = JSON.parse(data);
            }
            this.setState({ loading: false })
        })
        // Model.pedido.Action.getDetalle(this.pk).then((resp) => {
        //     console.log(resp);
        // }) 

        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        SStorage.setItem(KEY_STORAGE_DATA_POPUPS_PEDIDOS, JSON.stringify(this.state.pagados));
        this.isRun = false;
    }


    hilo() {
        if (!this.isRun) return;
        new SThread(10000, "hilo_pedido", true).start(() => {
            this.hilo();
            if (!this.isRun) return;
            Model.pedido.Action.getDetalle(this.pk, true);
        })
    }

    load_data() {
        var data = Model.pedido.Action.getDetalle(this.pk);
        if (!this.state.data) {
            if (!data) return null;
            this.state.data = data;
        } else {
            if (data) {
                if (this.state.data != data.state) {
                    this.state.data = data;
                }
            }
        }
        return this.state.data;
    }


    render_data() {
        this.data = this.load_data();
        if (!this.data || this.state.loading) return <SLoad />
        var ITEM = _states[this.data.state];
        if (!ITEM) {
            ITEM = (props) => <SText>{"State not found " + this.data.state}</SText>
        }
        if (this.data.state == "pagado") {
            if (this.state.pagados.indexOf(this.data.key) <= -1) {
                this.state.pagados.push(this.data.key);
                Popups.TapekeComprado.open();
            }
        }
        return <ITEM data={this.data} />
    }
    render() {
        return this.render_data();
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);