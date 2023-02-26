import { useEffect, useState } from "react"
import { Text, StyleSheet } from "react-native"
import { View, ViewProps } from "react-native"

const TimerSeparator: React.FC = () => {
    return <Text style={separatorStyle.separator}>
        :
    </Text>
}

interface TimerValueProps {
    value: number
}

const TimerValue: React.FC<TimerValueProps> = ({
    value,
}) => {
    const formattedValue = value > 9 ? value : `0${value}`
    const [number1, number2] = formattedValue.toString().split('')

    return <>
        <Text style={[cellStyle.number, { marginRight: 16 }]}>
            { number1 }
        </Text>
        <Text style={cellStyle.number}>
            { number2 }
        </Text>
    </>
}

interface TimerProps {
    initialSeconds: number
    isResetOnEnd?: boolean
    viewStyle?: ViewProps['style']
    onTimerEnd?: () => void
}

const Timer: React.FC<TimerProps> = ({
    initialSeconds,
    isResetOnEnd = false,
    viewStyle,
    onTimerEnd,
}) => {
    const [time, setTime] = useState(initialSeconds)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(seconds => Math.max(seconds - 1, 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const totalMinutes = Math.floor(time / 60)

    const seconds = time % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    if (isResetOnEnd) {
        useEffect(() => {
            if (time !== 0) return

            const timeout = setTimeout(() => {
                setTime(() => initialSeconds)

                if (onTimerEnd) onTimerEnd()
            }, 1000)

            return () => clearTimeout(timeout)
        }, [time])
    }


    return <View style={[timerStyle.timer, viewStyle]} >
        <TimerValue value={hours} /><TimerSeparator />
        <TimerValue value={minutes} /><TimerSeparator />
        <TimerValue value={seconds} />
    </View>
}

const separatorStyle = StyleSheet.create({
    separator: {
        fontSize: 12,
        color: '#C1C2C8',
        marginHorizontal: 8,
    }
})

const cellStyle = StyleSheet.create({
    number: {
        backgroundColor: '#F4F6FA',
        color: '#363645',
        padding: 8,
    }
})

const timerStyle = StyleSheet.create({
    timer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Timer
export {
    TimerValue,
    TimerValueProps,
    TimerProps,
}
