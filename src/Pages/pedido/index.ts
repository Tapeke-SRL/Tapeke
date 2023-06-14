import { SPage } from 'servisofts-component';

import root from './root';
import listo_compra from './listo_compra';
export const Parent = {
    name: "pedido",
    path: "/pedido"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "listo_compra": listo_compra,

});