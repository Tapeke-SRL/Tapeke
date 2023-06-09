import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, BtnRedes, Container, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navBar() {
        return <TopBar type={"menu"} title='Contáctanos' />
    }
    clearData() {
        // Model.restaurante.Action.CLEAR();
    }

    render() {
        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<AccentBar />}>
                <Container>
                    <SHr height={40} />
                    <SText color={STheme.color.primary} fontSize={18} style={{}}>Síguenos</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} center backgroundColor={"transparent"} style={{ borderRadius: 8 }}>
                        {/* <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}> */}
                        <SHr height={20} />
                        <SView col={"xs-11"} row center >
                            <BtnRedes root={"https://www.facebook.com/Tapekeapp?mibextid=ZbWKwL"}>
                                <SView flex >
                                    <SIcon name={'Cfacebook'} height={47} width={47} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} fontSize={16}>@Facebook</SText>
                                </SView>
                            </BtnRedes>
                            <SHr height={20} />
                            <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} height={2}></SView>
                            <SHr height={20} />
                            <BtnRedes root={"https://www.instagram.com/tapeke.app/?igshid=NTc4MTIwNjQ2YQ%3D%3D"}>
                                <SView flex >
                                    <SIcon name={'Cinstagram'} height={47} width={47} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} fontSize={16}>@Instagram</SText>
                                </SView>
                            </BtnRedes>
                            <SHr height={20} />
                            <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} height={2}></SView>
                            <SHr height={20} />
                            <BtnRedes root={"https://www.tiktok.com/@tapeke?_t=8cEtaqs3AIv&_r=1"}>
                                <SView flex >
                                    <SIcon name={'Ctiktok'} height={47} width={47} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} fontSize={16}>@TikTok</SText>
                                </SView>
                            </BtnRedes>
                            <SHr height={20} />
                            <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} height={2}></SView>
                        </SView>
                        <SHr height={15} />
                    </SView>
                    <SHr height={50} />
                    <SText color={STheme.color.primary} fontSize={18} style={{}}>Llámanos</SText>
                    <SHr height={20} />
                    <SView col={"xs-11"} center backgroundColor={"transparent"} style={{ borderRadius: 8 }}>
                        <SHr height={20} />
                        <BtnRedes root={"https://api.whatsapp.com/send?phone=59162241491"}>
                            <SView flex >
                                <SIcon name={'Cwhatsapp'} height={47} width={47} />
                            </SView>
                            <SView col={"xs-10"}  >
                                <SText color={STheme.color.text} fontSize={16}>Toca para escribirnos</SText>
                            </SView>
                        </BtnRedes>

                        <SHr height={20} />
                        <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} height={2}></SView>
                        <SHr height={20} />
                        <BtnRedes root={'mailto:informaciones@tapekeapp.com'}>
                            <SView flex >
                                <SIcon name={'Cmail'} height={47} width={47} />
                            </SView>
                            <SView col={"xs-10"}  >
                                <SText color={STheme.color.text} fontSize={16}>Toca para enviarnos un e-mail</SText>
                            </SView>
                        </BtnRedes>
                        <SHr height={20} />
                        <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} height={2}></SView>
                    </SView>
                    <SHr />
                    <SHr height={50} />
                    {/* <SText color={STheme.color.primary}   fontSize={18} style={{}}>WhatsApp</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} center backgroundColor={"transparent"}  style={{ borderRadius: 8 }}>
                        <SHr height={20} />
                        <SView col={"xs-11"} row center onPress={() => { }}>
                            <SView flex >
                                <SIcon name={'Cwhatsapp'} height={47} width={47} />
                            </SView>
                            <SView col={"xs-10"}  >
                                <SText color={STheme.color.text}   fontSize={16}>Toca para escríbenos</SText>
                            </SView>
                        </SView>
                        <SHr height={20} />
                    </SView> */}
                    <SHr height={40} />
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);