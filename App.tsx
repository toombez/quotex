import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import SplashScreen from './screens/SplashScreen';

export default function App() {
    const {
        isLoadingComplete,
        progress,
    } = useCachedResources();

    return <SafeAreaProvider>
        { isLoadingComplete
            ? <Navigation />
            : <SplashScreen progress={progress} />
        }
        <StatusBar />
    </SafeAreaProvider>
}
