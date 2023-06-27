import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, Restaurante, TopBar } from '../../Components';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");

    }

    navBar() {
        return <TopBar type={"default"} title='Preguntas Frecuentes - Respuesta' />
    }

    item(id) {
        if (this.pk == "0")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"} row >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Quiénes somos?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>Somos una empresa que apoya a los comercios a reducir o eliminar su excedente de comida, permitiendo que sus usuarios finales puedan disfrutar de Tapekes sorpresa a precios reducidos mediante nuestra aplicación móvil.</SText>
                        <SHr height={15} />
                        <SText color={STheme.color.text} fontSize={14}>Tapeke nace de la intención de generar conciencia sobre los excedentes de alimentos y reducirlos, poniéndolos a disposición de los consumidores a bajo precio.</SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "1")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cuáles son los métodos de pago aceptados?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>- Efectivo</SText>
                        <SHr height={10} />
                        <SText color={STheme.color.text} fontSize={14}>- Tarjeta de Débito/Crédito</SText>
                        <SHr height={10} />
                        <SText color={STheme.color.text} fontSize={14}>- QR</SText>
                        <SHr height={10} />
                        <SText color={STheme.color.text} fontSize={14}>- Billetera Móvil</SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "2")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cuáles son los horarios de atención?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>Podrás ver en el perfil de cada comercio disponible los horarios que están habilitados para realizar tu pedido.</SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "3")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cómo crear una cuenta en Tapeke?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>Una vez que hayas descargado la app, puedes crear una cuenta siguiendo estos pasos:</SText>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Ingresa al botón que dice MI PERFIL
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Registra tu usuario con tu email o número de teléfono
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Adjuntar la ubicación GPS y dirección escrita donde quieres recibir tus pedidos
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>¡Y ya estás listo para hacer tus pedidos!</SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "4")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cómo hacer un pedido?</SText>
                        <SHr height={20} />
                    </SView>
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                1.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Ingresa al comercio de donde quieras realizar tu pedido.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                2.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Selecciona los productos que desees y agrégalos al carrito.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                3.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                En el carrito selecciona el método de pago.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                4.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Si deseas, agrega un cupón.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                5.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Confirma tu pedido y finaliza tu compra.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>Una vez finalizados los pasos, ve al botón MIS PEDIDOS donde podrás hacer el seguimiento correspondiente hasta el momento que llegue a tu puerta.</SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "5")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cómo agregar un cupón en la app?</SText>
                        <SHr height={20} />
                    </SView>
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                1.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Presiona el ícono de "Mi perfil"
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                2.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Selecciona la opción "Mis cupones"
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                3.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Presiona en el símbolo "+"
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                4.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Digita el Código de cupón que deseas agregar
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                5.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Selecciona "Confirmar"
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                6.
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Y listo! ya puedes utilizar tu cupón
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-11"} row>
                        <SText color={STheme.color.text} fontSize={16} bold>
                            IMPORTANTE:
                        </SText>
                        <SText color={STheme.color.text} fontSize={14}>
                            Toma en cuenta las condiciones en las que aplica el cupón.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "6")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Puedo enviar pedidos a otra dirección?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Para enviar un pedido a otra dirección solo debes cambiar la ubicación, al ingresar a la app presiona el botón de "Mis direcciones" selecciona la dirección donde quieres enviar tu pedido o agrega una nueva presionando el botón “+”. Es importante asegurarse que el local o comercio haga envíos a la nueva dirección que acabas de seleccionar.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "7")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Por qué algunos locales no están disponibles en mi zona?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Es probable que te encuentres fuera de la zona de entrega de algunos locales, como también puede ser que el local este cerrado en ese momento.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "8")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Puedo programar un pedido?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Claro que sí, el momento que realizas un pedido puedes escoger la fecha y hora de entrega, siempre y cuando sea dentro de los horarios de trabajo del comercio seleccionado.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "9")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Por qué el repartidor va en otra dirección?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Un repartidor puede recibir dos pedidos para ser entregados en ubicaciones cercanas, en estos casos el repartidor sigue la ruta para ambas paradas y el tiempo estimado de entrega también fue calculado tomando en cuenta las dos entregas, así que no te preocupes el repartidor llegará a tu ubicación en el intervalo de tiempo estimado.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "10")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Como puedo saber el tiempo de entrega de mi pedido?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Al ver el estado de un pedido realizado, podrás ver en el mismo el tiempo de entrega estimado, esto es calculado en base al tiempo que el comercio suele tardar en aceptar el pedido y tenerlo listo, mas el tiempo que tardaría el repartidor en recogerlo y llegar a tu ubicación. Hay que tener en cuenta que es una estimación y el tiempo real puede variar dependiendo la demanda, el tráfico, el clima u otros factores.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "11")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Cómo puedo saber el estado de mi pedido?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Inicia sesión en tu app. Presiona el botón "Mis Pedidos", selecciona el pedido que acabas de realizar, presiona en el botón "Detalles" y así podrá ver el estado de tu pedido.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "12")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Debo darle propina al repartidor?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            La propina al repartidor es un gesto voluntario que se deja a criterio del cliente, si quisiera darle propina al repartidor, puede hacerlo en el momento de la entrega de su pedido.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "13")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Puedo modificar mi pedido?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Lamentablemente no puedes modificar tu pedido después de haberlo realizado.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "14")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Qué hago si mi pedido fue cancelado?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Escríbenos al chat de soporte para conocer los detalles de tu pedido y por qué fue cancelado para brindarte una respuesta y pronta solución.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "15")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>¿Qué hago si mi pedido llega dañado?</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Escríbenos de inmediato al chat de soporte para brindarte una solución lo antes posible, todos los pedidos están asegurados.
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "16")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>Tengo problemas con la app</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Antes reportar un problema por favor verifica:
                        </SText>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row>
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Tu conexión a internet o datos móviles.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row>
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Que estés utilizando la versión más actual de la app.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row>
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                La app puede presentar intermitencias, ante lo cual te recomendamos cerrarla totalmente y volverla a abrir.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row>
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                Si el problema persiste, desinstala la app y vuélvela a instalar.
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"} row>
                        <SView col={"xs-1"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                -
                            </SText>
                        </SView>
                        <SView col={"xs-11"}>
                            <SText color={STheme.color.text} fontSize={14}>
                                ¿El problema persiste?, escríbenos y con gusto te ayudaremos.
                            </SText>
                        </SView>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
        if (this.pk == "17")
            return <SView col={"xs-12"} center >
                <SView col={"xs-12"} row center >
                    <SView col={"xs-11"}  >
                        {/* <SView width={20}></SView> */}
                        <SText color={STheme.color.text} fontSize={18} bold>Quiero contactarlos</SText>
                        <SHr height={20} />

                    </SView>
                    <SView col={"xs-11"} style={{}} >
                        <SText color={STheme.color.text} fontSize={14}>
                            Nuestro equipo valora mucho que estés contento con nuestro servicio. Si tienes alguna consulta o sugerencia, puedes escribirnos al
                        </SText>
                        <SText color={STheme.color.text} fontSize={14}>
                            +591 62241491
                        </SText>
                    </SView>
                </SView>
                <SHr height={20} />
            </SView>
    }

    render() {
        // if(!this.pk) return null

        return (
            <SPage
                navBar={this.navBar()}
                onRefresh={this.clearData}
                header={<AccentBar />}>
                <Container>
                    <SHr height={40} />
                    {this.item(this.pk)}
                    <SHr height={40} />
                </Container>
            </SPage>
        );
    }


}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);