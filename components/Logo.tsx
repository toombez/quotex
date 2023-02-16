import {
    View,
    Text,
    ViewProps,
    Platform,
    Image,
    StyleSheet,
} from 'react-native'
import LogoSvg from '../assets/images/logo.svg'

const LogoText: React.FC = () => {
    return <Text style={style.logo__text}>
        QUOTEX
    </Text>
}

interface LogoIconProps {
    viewStyle?: ViewProps['style']
}

const LogoIcon: React.FC<LogoIconProps> = ({
    viewStyle,
}) => {
    return <View style={viewStyle}>
        { Platform.OS === 'web'
            ? <Image
                source={require('../assets/images/logo.svg')}
                style={{ ...style.logo__icon}}
            />
            : <LogoSvg />
        }
    </View>
}

interface LogoProps {
    withText?: boolean
}

const Logo: React.FC<LogoProps> = ({
    withText = false,
}) => {
    return <View style={style.logo}>
        <LogoIcon viewStyle={{ marginBottom: withText ? 16 : undefined }} />
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
    LogoSvg,
    LogoText,
    LogoIcon,
    LogoIconProps,
    LogoProps,
}
