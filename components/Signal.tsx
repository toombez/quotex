import { Text } from "react-native"
import { Path, Rect, Svg, SvgProps } from "react-native-svg"
import { View } from "./Themed"
import { useTime } from '../hooks/useTime'

type SignalDirection = 'up' | 'down'

interface SignalSvgProps {
    color?: string
    circleColor?: string
    direction?: SignalDirection
    style?: SvgProps['style']
}

const SignalSvg: React.FC<SignalSvgProps> = ({
    color = '#fff',
    circleColor = '#000',
    direction = 'up',
    style,
}) => {
    const rotation = direction === 'up' ? 0 : 180

    return <Svg fill="none" viewBox="0 0 24 24" rotation={rotation} style={style} >
        <Rect width="24" height="24" fill={circleColor} rx="12"/>
        <Path
            fill={color}
            fillRule="evenodd"
            d="M12 18c.23 0 .45-.09.6-.24a.8.8 0 0 0 .26-.57V7.78l3.68 3.48a.86.86 0 0 0 .6.24.9.9 0 0 0 .6-.24.81.81 0 0 0 .26-.57.78.78 0 0 0-.25-.58L12.6 5.24A.86.86 0 0 0 12 5a.9.9 0 0 0-.6.24L6.24 10.1a.8.8 0 0 0-.25.58c0 .21.09.42.25.57a.88.88 0 0 0 1.21 0l3.68-3.48v9.4c0 .22.1.43.25.58a.9.9 0 0 0 .61.24Z"
            clipRule="evenodd"
        />
    </Svg>
}

interface SignalIndicatorProps {
    direction: SignalDirection
    time: number
}

const SignalIndicator: React.FC<SignalIndicatorProps> = ({
    direction,
    time,
}) => {
    const circleColor = direction === 'up' ? '#35B972' : '#FF6151'
    const {
        formattedMinutes: minutes,
        formattedHours: hours,
    } = useTime(time)

    return <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <Text
            style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 14 * 1.3,
                marginRight: 9,
            }}
        >
            {hours}:{minutes}
        </Text>
        <SignalSvg
            style={{ width: 24, height: 24 }}
            circleColor={circleColor}
            direction={direction}
        />
    </View>
}

export {
    SignalSvgProps,
    SignalSvg,
    SignalIndicatorProps,
    SignalIndicator,
}
