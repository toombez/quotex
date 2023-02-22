import { useState } from "react"
import { ButtonProps, Pressable, StyleSheet, Text, View, ViewProps } from "react-native"

interface QuizScreenButtonProps {
    title: string
    pressableStyle?: ViewProps['style']
    onPress?: ButtonProps['onPress']
}

const QuizScreenButton: React.FC<QuizScreenButtonProps> = ({
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

interface QuizScreenStepAnswer {
    label: string
    value: unknown
}

interface QuizScreenStepProps {
    question: string
    answers: QuizScreenStepAnswer[]
    onAnswer?: (answer: QuizScreenStepAnswer) => void
}

const QuizScreenStep: React.FC<QuizScreenStepProps> = ({
    answers,
    question,
    onAnswer,
}) => {
    const onPressHandler = (answer: QuizScreenStepAnswer) => {
        if (!onAnswer) return

        onAnswer(answer)
    }

    return <View>
        <Text style={QuizScreenStepStyle.question}>
            { question }
        </Text>
        { answers.map((a, i) =>{
            const isLastAnswer = i === answers.length - 1

            return <QuizScreenButton
                title={ a.label }
                pressableStyle={{
                    marginBottom: isLastAnswer ? 0 : 16,
                }}
                onPress={() => onPressHandler(a)}
                key={i}
            />})
        }
    </View>
}

const QuizScreen: React.FC =  () => {
    return <View></View>
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

const QuizScreenStepStyle = StyleSheet.create({
    question: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1F1F1F',
        marginBottom: 20,
    }
})

const style = StyleSheet.create({
})

export default QuizScreen
export {
    QuizScreenButton,
    QuizScreenButtonProps,
}
