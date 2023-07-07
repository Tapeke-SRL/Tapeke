import { SDate } from "servisofts-component";
import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getAll(extra?: {}) {
        let arr = super.getAll(extra);
        if (!arr) return null;
        const curday = new SDate()
        return Object.values(arr).filter((a: any) => new SDate(a.fecha,"yyyy-MM-dd").isAfter(curday))
    }
}