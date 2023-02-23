import { Image, StyleSheet, Text, Platform } from "react-native"
import { useState } from 'react'
import { View } from "../components/Themed"
import Timer from "../components/Timer"
import { RootTabScreenProps } from "../types"

import ArrowUp from '../assets/images/arrowUp.svg'
import ArrowDown from '../assets/images/arrowDown.svg'
import SignalIconSvg from '../assets/images/signalIcon.svg'

type SignalDirection = 'up' | 'down'

interface SignalDirectionIndicatorProps {
    direction: SignalDirection
}

const SignalDirectionIndicator: React.FC<SignalDirectionIndicatorProps> = ({
    direction,
}) => {
    const style = { width: 24, height: 24 }

    const upIcon = <Image
        source={require('../assets/images/arrowUp.svg')}
        style={style}
    />
    const downIcon = <Image
        source={require('../assets/images/arrowDown.svg')}
        style={style}
    />

    return <View>
        { Platform.OS === 'web'
            ? direction === 'up' ? upIcon : downIcon
            : direction === 'up' ? <ArrowUp /> : <ArrowDown />
        }
    </View>
}

interface SignalIndicatorProps {
    time: number
    direction: SignalDirection
}

const SignalIndicator: React.FC<SignalIndicatorProps> = ({
    time,
    direction,
}) => {
    const totalMinutes = Math.floor(time / 60)

    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 9, fontSize: 14, fontWeight: '500' }}>
            {hours}:{minutes}
        </Text>

        <SignalDirectionIndicator direction={direction} />
    </View>
}

interface SignalProps {
    direction: SignalDirection
    time: number
    currency: string
}

const Signal: React.FC<SignalProps> = ({
    currency,
    direction,
    time,
}) => {
    const webIcon = <Image
        source={require('../assets/images/signalIcon.svg')}
        style={{ width: 32, height: 32 }}
    />

    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
            { Platform.OS === 'web'
                ? webIcon
                : <SignalIconSvg />
            }
            <Text style={{ marginLeft: 10 }}>
                { currency }
            </Text>
        </View>

        <SignalIndicator direction={direction} time={time} />
    </View>
}

const SignalsScreen: React.FC<RootTabScreenProps<'SignalsScreen'>> = ({
    navigation,
}) => {
    const TIMER_TIME = 120

    const [signals, setSignals] = useState<
        { direction: SignalDirection, time: number, currency: string }[]
    >([
        { currency: 'EUR/CAD', direction: 'down', time: 1000 },
        { currency: 'EUR/GBR', direction: 'up', time: 1000 },
    ])

    function changeSignalsDirection() {

    }

    return <View style={style.screen} >
        <Text style={style.title}>
            2 minute signals
        </Text>
        <Text style={style.timerTitle}>
            Signals will update in:
        </Text>
        <Timer
            initialSeconds={TIMER_TIME}
            isResetOnEnd
            viewStyle={style.timer}
            onTimerEnd={() => {
                setSignals((v) => v.map(s => ({
                    ...s,
                    direction: s.direction === 'down' ? 'up' : 'down',
                    time: s.time + TIMER_TIME,
                })))
            }}
        />

        { signals.map((s) => <Signal {...s} />) }
    </View>
}

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
    },
    timer: {
        marginTop: 4,
        marginBottom: 20,
    },
    title: {
        color: '#1F1F1F',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
    },
    timerTitle: {
        color: '#818181',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 4,
    }
})

export default SignalsScreen
