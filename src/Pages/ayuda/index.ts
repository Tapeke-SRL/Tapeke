import { SPage } from 'servisofts-component';
import consultas from './consultas';
import politicas_de_privacidad from './politicas_de_privacidad';
import preguntas_frecuentes from './preguntas_frecuentes';
import preguntas_frecuentes_respuestas from './preguntas_frecuentes_respuestas';
import root from './root';
import terminos_y_condiciones from './terminos_y_condiciones';
export const Parent = {
    name: "ayuda",
    path: "/ayuda"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "preguntas_frecuentes": preguntas_frecuentes,
    "preguntas_frecuentes/respuesta": preguntas_frecuentes_respuestas,
    "terminos_y_condiciones": terminos_y_condiciones,
    "politicas_de_privacidad": politicas_de_privacidad,
    "consultas": consultas,
});