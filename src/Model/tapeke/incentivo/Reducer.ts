import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    getAllActivos(state: any, action: any) {
        if (action.estado == "exito") {
            state.data_activos = action.data;
        }
    }

}