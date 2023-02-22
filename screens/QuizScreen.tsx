import { useState } from "react"
import { ButtonProps, Pressable, StyleSheet, Text, View, ViewProps } from "react-native"
import * as Progress from 'react-native-progress'

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

interface QuizScreenQuestion {
    question: QuizScreenStepProps['question']
    answers: QuizScreenStepProps['answers']
}

const QuizScreenQuestions: QuizScreenQuestion[] = [
    {
        question: 'Do you have Quotex account?',
        answers: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ]
    },
    {
        question: 'What is your trading experience?',
        answers: [
            { label: 'Never traded before', value: true },
            { label: 'Never traded before', value: false },
        ]
    },
    {
        question: 'What are you looking for the most?',
        answers: [
            { label: 'Trading Signals', value: true },
            { label: 'Analytics and Ideas', value: false },
        ]
    },
]

type AnswersValuesMap = Map<number, QuizScreenStepAnswer['value']>

const QuizScreen: React.FC =  () => {
    const [progress, setProgress] = useState(1 / QuizScreenQuestions.length)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<AnswersValuesMap>(new Map())

    const currentQuestion = QuizScreenQuestions[currentQuestionIndex]

    function onAnswerHandler(answer: QuizScreenStepAnswer) {
        answers.set(currentQuestionIndex, answer.value)

        if (currentQuestionIndex === QuizScreenQuestions.length - 1) {
            console.log(answers)

            return
        }

        setProgress((v) => v + 1 / QuizScreenQuestions.length)
        setCurrentQuestionIndex((i) => i + 1)
    }

    return <View
        style={style.quizScreen}
    >
        <QuizScreenStep
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            onAnswer={onAnswerHandler}
        />
        <Progress.Bar
            progress={progress}

            height={4}
            borderRadius={8}
            unfilledColor='#F4F6FA'
            color="#DE584A"
            borderWidth={0}
            width={null}
            style={style.bar}
        />
    </View>
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
    quizScreen: {
        padding: 16,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        height: '100%',
    },
    bar: {
        marginTop: 44,
    }
})

export default QuizScreen
export {
    QuizScreenButton,
    QuizScreenButtonProps,
}
