import { ViewProps } from "react-native"
import { useState } from 'react'
import { ButtonProps, Pressable, StyleSheet, Text } from 'react-native'

interface QuizButtonProps {
    title: string
    pressableStyle?: ViewProps['style']
    onPress?: ButtonProps['onPress']
}

const QuizButton: React.FC<QuizButtonProps> = ({
    title,
    pressableStyle,
    onPress,
}) => {
    const [isPressed, setIsPressed] = useState(false)

    const wrapperStyle = isPressed
        ? { ...buttonStyle.button, ...buttonStyle["button--pressed"] }
        : buttonStyle.button

    const textStyle = isPressed
        ? {...buttonStyle.button__text, ...buttonStyle["button__text--pressed"]}
        : buttonStyle.button__text

    return <Pressable
        onPress={onPress}
        style={[wrapperStyle, pressableStyle]}
        onPressIn={() => setIsPressed(() => true)}
        onPressOut={() => setIsPressed(() => false)}
    >
        <Text style={textStyle} >
            { title }
        </Text>
    </Pressable>
}

const buttonStyle = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#F5F3E1',
        borderRadius: 20,
        padding: 20,
    },
    'button--pressed': {
        backgroundColor: '#DE584A',
    },
    button__text: {
        color: '#1F1F1F',
        fontSize: 16,
        fontWeight: '600',
    },
    'button__text--pressed': {
        color: '#FFFFFF',
    }
})

export default QuizButton
export {
    QuizButtonProps,
    QuizButton,
}
