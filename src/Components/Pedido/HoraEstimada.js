import React, { Component } from 'react';
import { SText, SView, STheme, SDate, SLoad } from 'servisofts-component';

// posicion_conductor  **
export default class HoraEstimada extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    calc_distance = (lat1, lon1, lat2, lon2) => {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137;
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000;
        return d;
    }
    calcular_distancia_conductor_restaurante() { return this.calc_distance(this.props.posicion_conductor.latitude, this.props.posicion_conductor.longitude, this.props.data.restaurante.latitude, this.props.data.restaurante.longitude) }
    calcular_distancia_cliente_restaurante() { return this.calc_distance(this.props.data.direccion.latitude, this.props.data.direccion.longitude, this.props.data.restaurante.latitude, this.props.data.restaurante.longitude) }
    calcular_distancia_cliente_conductor() { return this.calc_distance(this.props.data.direccion.latitude, this.props.data.direccion.longitude, this.props.posicion_conductor.latitude, this.props.posicion_conductor.longitude) }

    calcular_tiempo() {

        const media_de_metros_x_minuto = 220;
        const segundos_espera_driver_en_restaurante = 10 * 60;
        let tiempo = 0;
        if (this.props.data.state == "esperando_conductor") {
            //  El conductor tiene que ir al restaurante a recoger el pedido.
            // console.log(this.calcular_distancia_conductor_restaurante())
            tiempo += this.calcular_distancia_conductor_restaurante() / (media_de_metros_x_minuto / 60)
            tiempo += this.calcular_distancia_cliente_restaurante() / (media_de_metros_x_minuto / 60)
            tiempo += segundos_espera_driver_en_restaurante;
        } else {
            //  El conductor tiene que ir al cliente.
            tiempo = this.calcular_distancia_cliente_conductor() / (media_de_metros_x_minuto / 60);
        }
        return tiempo;
    }

    render_aproximado_conductor() {
        let tiempo = this.calcular_tiempo();
        // hora_inicio = new SDate().addSecond(tiempo - (10 * 60)).toString("hh:mm");
        // hora_fin = new SDate().addSecond(tiempo + (10 * 60)).toString("hh:mm");
        let time = "";
        let mensaje = "";
        if (tiempo < 60 * 60) {
            mensaje = "Minutos";
            time = new SDate("00:00:01", "hh:mm:ss").addSecond(tiempo).toString("mm");
        } else {
            mensaje = "Horas";
            time = new SDate("00:00:01", "hh:mm:ss").addSecond(tiempo).toString("hh");
        }
        return <SView col={"xs-12"} row center>
            <SText fontSize={12} bold center>{"En"}</SText>
            <SView width={16} />
            <SText fontSize={40} bold center>{time}</SText>
            <SView width={16} />
            <SText fontSize={12} bold center>{mensaje + " aproximadamente."}</SText>
        </SView>
        // hora_fin = "";
    }
    render_buscando_conductor() {
        return <SText bold center fontSize={20}>{"Buscando conductor..."}</SText>
    }
    render() {
        if(!this.props?.data) return <SLoad/>
        if (this.props?.data?.state == "confirmando_conductor" || this.props?.data?.state == "buscando_conductor") return this.render_buscando_conductor();
        
        if(this.props?.data?.state == "entregado_conductor"){
            if (this.props.posicion_conductor){
                return this.render_aproximado_conductor();  
            } else{
                return <SLoad/>
            }

        }
        
        return <SText col={"xs-12"} color={STheme.color.text} style={{ fontSize: 40 }} bold center>{`${this.props?.data?.horario?.hora_inicio} - ${this.props?.data?.horario?.hora_fin}`}</SText>
    }
}
