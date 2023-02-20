import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

type TaskFunction = () => Promise<unknown>

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)
    const [progress, setProgress] = useState(0)

    async function loadFontsTask() {
        return Font.loadAsync({
            ...FontAwesome.font,
            'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        })
    }

    function emptyTask(ms: number) {
        return () => new Promise(res => {
            setTimeout(() => res(true), ms)
        })
    }

    useEffect(() => {
        console.log(progress);
    }, [progress])

    async function awaitTasks(...tasks: TaskFunction[]) {
        const taskProgress = 1 / tasks.length

        try {
            SplashScreen.preventAutoHideAsync()
            await Promise.all(tasks.map(async task => {
                await task()
                return setProgress(p => p + taskProgress)
            }))
        } catch (e) {
            console.warn(e)
        } finally {
            setLoadingComplete(true)
            SplashScreen.hideAsync()
        }
    }

    useEffect(() => {
        awaitTasks(loadFontsTask, emptyTask(10000), emptyTask(5000))
    }, [])

    return {
        isLoadingComplete,
        progress,
    }
}
