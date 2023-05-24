import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
export type FotoPerfilPropsType = {
    data: any
}
class index extends Component<FotoPerfilPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        // var { key, nombre } = this.props.data;
        return <SView col={"xs-12"} height backgroundColor={STheme.color.card}
            {...this.props}
            style={{
                // borderRadius: 100,
                position: "absolute",
                borderColor: STheme.color.secondary,
                borderWidth: 1,
                overflow: "hidden",
                ...this.props.style
            }}
        >
            <SImage src={SSocket.api.root + "restaurante/" + this.props?.data?.key} style={{
                resizeMode: "cover"
            }} />
        </SView>
    }
}
export default (index);