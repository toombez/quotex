import {
    View,
    Text,
    ViewProps,
    StyleSheet,
} from 'react-native'
import { Path, Svg, SvgProps } from 'react-native-svg'

const LogoText: React.FC = () => {
    return <Text style={style.logo__text}>
        QUOTEX
    </Text>
}

interface LogoSvgProps {
    color?: string
    style?: SvgProps['style']
}

const LogoSvg: React.FC<LogoSvgProps> = ({
    color = '#921C2E',
    style,
}) => {
    return <Svg viewBox='0 0 117 134' fill="none" style={style} >
        <Path
            fill={color}
            d="m35.52 23.87 17.85-9.77v105.8l-7.4-4.78-.35-73.73-9.76.54-.34 67.52-7.55-4.78-.2-50.47h-9.78v45.15l-7.88-5.1.14-54.8 17.17-10.7.35-11.28L.48 33.43v67.13L58.43 134l58.08-33.72-.14-66.84L89.09 17.8l.34 10.94 17.17 10.7.14 54.8-7.88 5.1.34-44.82-10.11-.33-.2 50.46-7.55 4.8V41.38H71.23l-.35 73.72-7.4 4.79V14.1l17.86 10.1-.35-11.05L58.43 0 35.86 13.15l-.34 10.72Z"
        />
    </Svg>

}

interface LogoProps {
    withText?: boolean
    viewStyle?: ViewProps['style']
}

const Logo: React.FC<LogoProps> = ({
    withText = false,
    viewStyle,
}) => {
    return <View style={[style.logo, viewStyle]}>
        <LogoSvg
            style={{
                marginBottom: withText ? 16 : undefined,
                width: withText ? 117 : '100%',
                height: withText ? 137 : '100%',
            }}
        />
        { withText && <LogoText />}
    </View>
}

const style = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo__icon: {
        width: 116,
        height: 134,
    },
    logo__text: {
        color: '#921C2E',
        textAlign: 'center',
        fontSize: 37,
        fontWeight: '600',
        textTransform: 'uppercase',
    }
})

export default Logo
export {
    LogoText,
    LogoSvgProps,
    LogoSvg,
    LogoProps,
    Logo,
}
