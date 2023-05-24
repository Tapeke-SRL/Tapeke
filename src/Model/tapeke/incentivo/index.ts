import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "incentivo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "fecha_inicio": { type: "timestamp", label: "Fecha de inicio", editable: true },
        "fecha_fin": { type: "timestamp", label: "Fecha de fin", editable: true },
        "monto": { type: "double", editable: true, notNull: true, },
        "monto_driver": { type: "double", editable: true, notNull: true, },
        "key_zona": { type: "text", fk: "zona" },
        "tipo": { type: "text", editable: true },
    },
    Action,
    Reducer,
});