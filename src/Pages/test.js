import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { SHr, SList, SPage, SText, SView } from 'servisofts-component';
import { Container, Cupon } from '../Components';

let CANTIDAD_DE_RENDERS = 0;
class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.time_end_render = new Date().getTime();
        console.log("Termino de renderizar. ", this.time_end_render - this.time_start_render)
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('entro al did update');
    }
    render() {
        CANTIDAD_DE_RENDERS += 1;
        this.time_start_render = new Date().getTime();
        console.log("Inicio el renderizado")
        return <SView col={"xs-12"} height>
            <SList
                data={require("./test.json")}
            // render={(a) => <SView col={"xs-12"} height={8} backgroundColor='#f0f' />} 
            />
            {/* <FlatList
                ItemSeparatorComponent={(() => <SView width={8} />)}
                data={require("./test.json")}
                horizontal
                renderItem={({ item }) => {
                    return <SView width={50} height={50} backgroundColor='#f0f' />
                }}
            /> */}
        </SView>
    }
}

export default (test);