import { SDate, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    editar(extra?: {}): Promise<unknown> {
        var key = Model.usuario.Action.getUsuarioLog().key
        console.log("kye", key)
        return super.editar({
            ...extra,
            key_usuario: key,

        });
    }

    getAllRecursive() {
        var horarios = this.getAll();
        var packs = Model.pack.Action.getAllRecursive();

        if (!horarios || !packs) return null;

        Object.values(horarios).map((obj: any) => {
            var packs = Model.pack.Action.getAllBy({
                key_horario: obj.key
            })
            horarios[obj.key].pack = Object.values(packs)[0]
        })
        return horarios;
    }

    getByKeyRestauranteProximo = (key) => {
        // if (key != '9d059306-1aad-44ac-8097-33a40099fbee') return;
        // if (key != 'd1737e1c-969f-4fd1-8e5a-9325e2421c77') return;
        var data = this.getAllRecursive();
        if (!data) return null;
        var arr = Object.values(data).filter((itm: any) => itm.key_restaurante == key && itm.dia != -1)
        if (arr.length <= 0) return null;
        let date = new SDate();
        let curDay = date.getDayOfWeek();
        let curHour = date.toString("hh:mm")
        date.addDay(-curDay)
        // lunes = 0  domingo = 6
        let menor;

        arr.map((a: any) => {
            let lbl: any = "";
            if (a.dia == curDay) {
                lbl = "hoy";
                a.fecha = date.clone().addDay(a.dia).toString("yyyy-MM-dd")
                a.date_fin = new SDate(a.fecha + "T" + a.hora_fin + ":01", "yyyy-MM-ddThh:mm:ss")
                if (a.date_fin.isBefore(new SDate())) {
                    a.fecha = date.clone().addDay(7 + a.dia).toString("yyyy-MM-dd")
                    lbl = "Proximo " + date.clone().addDay(7 + a.dia).toString("DAY");

                }
            } else if (a.dia > curDay) {
                lbl = date.clone().addDay(a.dia).toString("DAY");
                a.fecha = date.clone().addDay(a.dia).toString("yyyy-MM-dd")
            } else {
                lbl = date.clone().addDay(a.dia).toString("DAY");
                a.fecha = date.clone().addDay(7 + a.dia).toString("yyyy-MM-dd")
            }
            a.date_fin = new SDate(a.fecha + "T" + a.hora_fin + ":01", "yyyy-MM-ddThh:mm:ss")
            a.text = lbl + " " + a.hora_inicio + " - " + a.hora_fin;
            a.extraData = {
                text: lbl,
                hora_inicio: a.hora_inicio,
                hora_fin: a.hora_fin,
            }
            if (!menor) {
                menor = a;
            } else {
                if (a.date_fin.isBefore(menor.date_fin)) {
                    menor = a;
                }
            }
        })

        return menor;
    }
    // getByKeyRestauranteProximo = (key) => {
    //     var data = this.getAllRecursive();
    //     if (!data) return null;
    //     var arr = Object.values(data).filter((itm: any) => itm.key_restaurante == key && itm.dia != -1)
    //     if (arr.length == 0) return "void";
    //     var date = new SDate();
    //     var arr2 = arr.filter((itm: any) => itm.dia >= date.getDayOfWeek());

    //     if (arr2.length > 0) {
    //         arr2.sort((a: any, b: any) => { return a.dia > b.dia ? 1 : -1 });
    //     } else {
    //         arr2 = arr;
    //         arr2.sort((a: any, b: any) => { return a.dia > b.dia ? 1 : -1 });
    //     }
    //     var list = [];
    //     arr2.map((dow: any) => {
    //         var date = new SDate();
    //         var dia = dow.dia;
    //         var text = SDate.getDayOfWeek(dia).text;
    //         if (dia == date.getDayOfWeek()) {
    //             text = "Hoy";
    //             dow.fecha = date.toString("yyyy-MM-dd");
    //         } else if (dia > date.getDayOfWeek()) {
    //             dow.fecha = date.addDay(dow.dia - date.getDayOfWeek()).toString("yyyy-MM-dd");
    //         } else if (dia < date.getDayOfWeek()) {
    //             dow.fecha = date.addDay(7 - date.getDayOfWeek() + dow.dia).toString("yyyy-MM-dd");
    //         }
    //         dia = new SDate(dow.fecha + " " + dow.hora_fin, "yyyy-MM-dd hh:mm");
    //         if (dia.getTime() < new SDate().getTime()) {
    //             dow.fecha = date.addDay(7).toString("yyyy-MM-dd");
    //             text = "Próximo " + SDate.getDayOfWeek(dow.dia).text?.toLowerCase();
    //             dia = new SDate(dow.fecha + " " + dow.hora_fin, "yyyy-MM-dd hh:mm");
    //         }
    //         dow.sdate = dia;
    //         dow.text = text + " " + dow.hora_inicio + " - " + dow.hora_fin;
    //         dow.extraData = {
    //             text: text,
    //             hora_inicio: dow.hora_inicio,
    //             hora_fin: dow.hora_fin,
    //         }

    //         list.push(dow);
    //     })
    //     list.sort((a, b) => { return a.sdate.getTime() > b.sdate.getTime() ? 1 : -1 });
    //     return list[0];
    // }
}