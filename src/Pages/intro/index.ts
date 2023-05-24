import { SNavigation, SPage, SPageListProps, SPopup } from 'servisofts-component';

import Paso1 from './Paso1';
import Paso2 from './Paso2';
import Paso3 from './Paso3';
export default SPage.combinePages("intro", {
    "": Paso1,
    "paso2": Paso2,
    "paso3": Paso3,

});


export const onEnd = () => {
    SNavigation.replace("/root");
}