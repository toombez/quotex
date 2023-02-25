import { Image, StyleSheet, Text, Platform, useColorScheme } from "react-native"
import { useState } from 'react'
import { View } from "../components/Themed"
import Timer from "../components/Timer"
import { RootTabScreenProps } from "../types"

import Signal, { SignalProps } from "../components/Signal"

const SignalsScreen: React.FC<RootTabScreenProps<'SignalsScreen'>> = ({
    navigation,
}) => {
    const TIMER_TIME = 10

    const [signals, setSignals] = useState<SignalProps[]>([
        { currency: 'EUR/CAD', direction: 'down', time: 1000 },
        { currency: 'EUR/GBR', direction: 'up', time: 1000 },
        { currency: 'EUR/GBR', direction: 'up', time: 1000 },
        { currency: 'EUR/GBR', direction: 'up', time: 1000 },
        { currency: 'EUR/GBR' },
        { currency: 'EUR/GBR' },
        { currency: 'EUR/GBR' },
    ])

    function updateSignals(signals: SignalProps[]) {
        return signals.map(s => {
            const { currency, direction, time } = s

            const newTime = time ? time + TIMER_TIME : time
            const newDirection: SignalProps['direction'] = direction
                ? (direction === 'down' ? 'up' : 'down')
                : direction

            return {
                currency,
                time: newTime,
                direction: newDirection,
            }
        })
    }

    const onTimerEndHandler = () => {
        setSignals((s) => updateSignals(s))
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
            onTimerEnd={onTimerEndHandler}
        />

        <View style={{ width: '100%' }}>
            { signals.map((s, i) => <Signal {...s} key={i} />) }
        </View>
    </View>
}

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        height: '100%',
        width: '100%',
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
export {
}
