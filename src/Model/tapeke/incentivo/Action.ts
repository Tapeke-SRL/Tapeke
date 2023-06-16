import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {
    getAllActivos(extra: { key_restaurante: any }, force) {
        var reducer = this._getReducer();
        if (force) {
            reducer.key_restaurante = ""
            reducer.data_activos = ""
        }
        if (extra.key_restaurante != reducer.key_restaurante) {
            reducer.key_restaurante = extra.key_restaurante;
            reducer.data_activos = null;
        }
        const data = reducer?.data_activos;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            const petition = {
                ...this.model.info,
                type: "getAllActivos",
                estado: "cargando",
                ...extra
            }
            SSocket.send(petition);
            return null;
        }
        return data;
    }
}