import { SDate, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getAllRecursive() {
        var packs = this.getAll();
        var pedidos = Model.pedido.Action.getAllActivos();
        var pack_extras = Model.pack_extra.Action.getAll({
            vigentes: true
        });
        if (!packs || !pedidos || !pack_extras) return null;

        var lista = Object.values(pedidos);
        var lista_pack_extras = Object.values(pack_extras);
        let curday = new SDate()

        Object.values(packs).map((pack: any) => {
            var pedidos_del_pack = lista.filter((obj: any) => obj.key_pack == pack.key);
            var extras_del_pack = lista_pack_extras.filter((obj: any) => obj.key_pack == pack.key );
            pack.pedidos = pedidos_del_pack;
            var pedidos_activos = pedidos_del_pack.filter((p: any) => p.state != "pendiente_pago" && p.state != "timeout_pago" && p.state != "cancelado");
            var cantidad = 0;
            var cantidad_extra = 0;
            pedidos_activos.map((o: any) => cantidad += o.cantidad);
            extras_del_pack.map((o: any) => cantidad_extra += parseFloat(o.cantidad));
            pack.cantidad_disponibles = (pack.cantidad + (cantidad_extra)) - cantidad
            pack.cantidad_extra = (cantidad_extra);
            pack.cantidad_total = parseFloat(pack.cantidad);

        })
        return packs;
    }
}