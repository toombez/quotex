import { Text } from "react-native"
import { View } from "../components/Themed"
import { RootTabScreenProps } from "../types"

const SignalsScreen: React.FC<RootTabScreenProps<'SignalsScreen'>> = ({
    navigation,
}) => {
    return <View>
        <Text style={{ fontSize: 40, color: 'red' }}>
            Signals
        </Text>
    </View>
}

export default SignalsScreen
