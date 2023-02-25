function formatValue(value: number) {
    return value < 9 ? `0${value}` : value.toString()
}

export default function useTime(time: number) {
    const totalMinutes = Math.floor(time / 60)

    const seconds = time % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    const formattedSeconds = formatValue(seconds)
    const formattedMinutes = formatValue(minutes)
    const formattedHours = formatValue(hours)

    return {
        seconds,
        minutes,
        hours,

        formattedSeconds,
        formattedMinutes,
        formattedHours,
    }
}

export { useTime }
