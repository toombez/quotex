import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as Progress from 'react-native-progress'
import Logo from "../components/Logo"
import QuizButton from "../components/QuizButton"
import { RootStackParamList } from "../types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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

            return <QuizButton
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

const QuizScreen: React.FC = () => {
    const [progress, setProgress] = useState(1 / QuizScreenQuestions.length)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers] = useState<AnswersValuesMap>(new Map())

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const currentQuestion = QuizScreenQuestions[currentQuestionIndex]
    const isQuizFinished = currentQuestionIndex === QuizScreenQuestions.length - 1

    function onAnswerHandler(answer: QuizScreenStepAnswer) {
        answers.set(currentQuestionIndex, answer.value)

        if (isQuizFinished) {
            console.log(answers)

            navigation.navigate('Root')

            return
        }

        setProgress((v) => v + 1 / QuizScreenQuestions.length)
        setCurrentQuestionIndex((i) => i + 1)
    }

    return <View
        style={style.quizScreen}
    >
        <Logo
            viewStyle={{
                width: 60,
                height: 60,
                transform: [{ translateX: -30 }],
                position: 'absolute',
                top: 64,
                left: '50%'
            }}
        />

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
