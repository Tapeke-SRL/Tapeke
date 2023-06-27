import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { SHr, SList, SMapView, SMapView2, SPage, SText, SView } from 'servisofts-component';
import { Container, Cupon } from '../Components';
import Sounds from '../Components/Sounds';
let CANTIDAD_DE_RENDERS = 0;
class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('entro al did update');
    }
    render() {
        CANTIDAD_DE_RENDERS += 1;
        this.time_start_render = new Date().getTime();
        console.log("Inicio el renderizado")
        return <SView col={"xs-12"} height>
            <SMapView>

            </SMapView>
        </SView>
    }
}

export default (test);