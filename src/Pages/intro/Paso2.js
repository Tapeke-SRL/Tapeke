import React from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SNavigation, SView, SIcon, STheme, SImage } from 'servisofts-component';
class Paso2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden disableScroll center>
                <SView flex center col={"xs-11 sm-10 md-8 lg-6 xl-4"}>
                    <SView col={"xs-12"} >
                        <SHr height={20} />
                        <SView col={"xs-12"} center>
                            <SImage src={require('../../Assets/img/paso2.png')} style={{
                                borderRadius: 8,
                                // width: 300,
                                height: 380,
                                // size: 'contain'
                            }} />
                        </SView>
                        <SHr height={30} />
                        <SView col={"xs-12"} center>
                            <SText color={STheme.color.text} fontSize={21} style={{ fontWeight: "bold" }} center >Seleccione el menú de favoritos</SText>
                            <SHr height={15} />
                            <SText color={STheme.color.gray} fontSize={13} center >Marca tus restaurantes favoritos para tener un acceso directo a tu comida preferida.</SText>
                        </SView>
                    </SView>
                    <SHr height={60} />
                    <SView col={"xs-12"} row>
                        <SView col={"xs-4"} onPress={() => {
                            SNavigation.navigate("/intro");
                        }}>
                            <SText fontSize={16} color={STheme.color.gray}>Atrás</SText>
                        </SView>
                        <SView col={"xs-4"} center row>
                            <SView width={10} height={10} backgroundColor={STheme.color.lightGray} style={{ borderRadius: 15 }}></SView>
                            <SView width={8} />
                            <SView width={10} height={10} backgroundColor={STheme.color.primary} style={{ borderRadius: 15 }}></SView>
                            <SView width={8} />
                            <SView width={10} height={10} backgroundColor={STheme.color.lightGray} style={{ borderRadius: 15 }}></SView>
                        </SView>
                        <SView col={"xs-4"} style={{ alignItems: "flex-end" }} onPress={() => {
                            SNavigation.navigate("/intro/paso3");
                        }}>
                            <SIcon name="Flecha1" width={15} height={15} fill={STheme.color.primary}></SIcon>
                        </SView>
                    </SView>
                    <SHr height={40} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Paso2);