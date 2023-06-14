import pendiente_pago from "./pendiente_pago"
import pagado from "./pagado/index"
import pago_en_proceso from "./pago_en_proceso"
import listo from "./listo/index"
import timeout_pago from "./timeout_pago"
import entregado from "./entregado"
import buscando_conductor from "./buscando_conductor"
import confirmando_conductor from "./confirmando_conductor"
import entregado_conductor from "./entregado_conductor"
import esperando_conductor from "./esperando_conductor"
import conductor_llego from "./conductor_llego"
import no_recogido from "./no_recogido/index"
import cancelado from "./cancelado"
export default {
    pendiente_pago,
    pagado,
    pago_en_proceso,
    listo,
    timeout_pago,
    entregado,
    "confirmando_conductor": buscando_conductor,
    "entregado_conductor": buscando_conductor,
    // entregado_conductor,
    "esperando_conductor": buscando_conductor,
    "conductor_llego": conductor_llego,
    // conductor_llego,
    buscando_conductor,
    "no_recogido": no_recogido,
    "cancelado": cancelado,


}