import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import SplashScreen from './screens/SplashScreen';

export default function App() {
    const {
        isLoadingComplete,
        progress,
    } = useCachedResources();
    const colorScheme = useColorScheme();

    return <SafeAreaProvider>
        { isLoadingComplete
            ? <Navigation colorScheme={colorScheme} />
            : <SplashScreen progress={progress} />
        }
        <StatusBar />
    </SafeAreaProvider>
}
