import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {


    getAllActivos(state: any, action: any) {
        if (action.estado == "exito") {
            state.data_activos = action.data;
            state.data_activos_inicio = action.data;
        }
    }
    getByUser(state: any, action: any) {
        if (action.estado == "exito") {
            state.data_usuario = action.data;
        }
    }
    editar(state: any, action: any): void {
        if (action.estado == "exito") {
            if (state.data) {
                state.data[action.data[this.model.pk]] = action.data;
            }
            if (state.data_activos) {
                state.data_activos[action.data[this.model.pk]] = action.data;
            }
            if (state.data_activos_inicio) {
                state.data_activos_inicio[action.data[this.model.pk]] = action.data;
            }
        }
    }
    action(state: any, action: any): void {
        if (action.estado == "exito") {
            if (state.data) {
                state.data[action.data[this.model.pk]] = action.data;
            }
            if (state.data_activos) {
                state.data_activos[action.data[this.model.pk]] = action.data;
            }
            if (state.data_activos_inicio) {
                state.data_activos_inicio[action.data[this.model.pk]] = action.data;
            }
        }
    }
    registro(state: any, action: any): void {
        if (action.estado == "exito") {
            if (state.data) {
                state.data[action.data[this.model.pk]] = action.data;
            }
            if (!state.data_activos) {
                state.data_activos = {}
            }
            state.data_activos[action.data[this.model.pk]] = action.data;

            if (state.data_activos_inicio) {
                state.data_activos_inicio[action.data[this.model.pk]] = action.data;
            }
        }
    }
    getDetalle(state: any, action: any): void {
        if (action.estado == "exito") {
            if (!state.data_activos) {
                state.data_activos = {}
            }
            state.data_activos[action.data[this.model.pk]] = action.data;
            if (state.data_activos_inicio) {
                state.data_activos_inicio[action.data[this.model.pk]] = action.data;
            }
        }
    }
}