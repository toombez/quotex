import React from "react"
import { View, Text, ViewProps, TextProps } from 'react-native'
import LogoSvg from '../assets/images/logo.svg'

interface LogoTextProps {
    textProps?: TextProps
}

const LogoText: React.FC<LogoTextProps> = ({
    textProps,
}) => {
    return <Text
        {...textProps}
        style={{
            color: '#921C2E',
            textAlign: 'center',
            fontSize: 37,
            fontWeight: '600',
        }}
    >
        QUOTEX
    </Text>
}

interface LogoProps {
    withText?: boolean
    viewProps?: ViewProps
}

const Logo: React.FC<LogoProps> = ({
    withText = false,
    viewProps,
}) => {
    return <View
        {...viewProps}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: withText ? 16 : undefined,
        }}
    >
        <LogoSvg
            width={116}
        />
        { withText && <LogoText />}
    </View>
}

export default Logo
export {
    LogoText,
    LogoTextProps,
    LogoProps,
}