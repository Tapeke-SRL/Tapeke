import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#FF6600",
        text: "#000000",
        primary: "#FF6600",
        secondary: "#ffffff",
        info: "#DE5738",
        background: "#ffffff",
        card: "#eeeeee99",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#FF6600",
        text: "#000000",
        primary: "#FF6600",
        secondary: "#ffffff",
        info: "#DE5738",
        background: "#ffffff",
        card: "#eeeeee99",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"
    }
}
export default theme;