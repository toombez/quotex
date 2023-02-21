import { View } from "../components/Themed"
import Logo from "../components/Logo"
import * as Progress from 'react-native-progress'
import { StyleSheet, Text } from 'react-native'

interface SplashScreenProgressBarProps {
    progress: number
}

const SplashScreenProgressBar: React.FC<SplashScreenProgressBarProps> = ({
    progress,
}) => {
    const formattedProgress = Math.min(Math.round(progress * 100), 100)

    return <View style={style.progress}>
        <Progress.Bar
            progress={progress}
            height={12}
            borderRadius={30}
            unfilledColor="#F4F6FA"
            color="#DE584A"
            style={style.bar}
        />
        <Text style={style.text}>
            { formattedProgress }
        </Text>
    </View>
}

interface SplashScreenProps {
    progress: number
}

const SplashScreen: React.FC<SplashScreenProps> = ({
    progress = 0
}) => {
    return <View style={style.splashScreen}>
        <Logo withText />
        <SplashScreenProgressBar progress={progress} />
    </View>
}

const style = StyleSheet.create({
    splashScreen: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 37,
    },
    progress: {
        position: 'absolute',
        bottom: 74,
    },
    bar: {
        marginBottom: 8,
    },
    text: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default SplashScreen
export { SplashScreenProps }
