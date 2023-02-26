/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Text, ViewProps } from 'react-native'

import SignalsScreen from '../screens/SignalsScreen'
import { colors } from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import QuizScreen from '../screens/QuizScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { ClipPath, Defs, G, Path, Svg } from 'react-native-svg'

export default function Navigation() {
    return <NavigationContainer
        linking={LinkingConfiguration}
    >
        <RootNavigator />
    </NavigationContainer>
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return <Stack.Navigator initialRouteName='Quiz' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
    </Stack.Navigator>
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
    return <BottomTab.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <BottomTab.Screen
            name="SignalsScreen"
            component={SignalsScreen}
            options={{
                tabBarLabel: ({ focused, children }) => <Text
                    style={{ color: focused ? colors.red : colors.gray }}
                >
                    {children}
                </Text>,
                title: 'Signals',
                tabBarIcon: () => <SignalsTabBarIcon color={colors.red} />,
            }}
        />
    </BottomTab.Navigator>
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function SignalsTabBarIcon(props: {
    color: string
    style?: ViewProps
}) {
    return <Svg viewBox='0 0 25 24' fill="none" style={props.style} >
    <G fill={props.color} clipPath="url(#a)">
      <Path d="M12.67 6.84c.36.15.7.32 1.04.51.26.02.62 0 .62-.34L14.32.34c0-.22-.2-.38-.42-.33a8.83 8.83 0 0 0-6.54 6.18 9.7 9.7 0 0 1 5.31.65Zm-3.8.68c-9.76-.06-11.2 14.45-1.8 16.45.16.04.32-.08.32-.25l-.01-6.4a.26.26 0 0 0-.26-.26h-.88a.36.36 0 0 1-.3-.56c3.89-5.71 2-5.71 5.9 0a.36.36 0 0 1-.3.56h-1a.26.26 0 0 0-.26.26l.02 6.42c0 .16.15.29.3.25 9.52-1.92 8.1-16.55-1.73-16.47Z"/>
      <Path d="M24.6 8.5A8.83 8.83 0 0 0 17.82.03a.34.34 0 0 0-.42.33l.01 6.65c0 .2.16.34.34.34h.95c.27 0 .43.3.28.53l-1.81 2.84a9.82 9.82 0 0 1 1.37 6.31A8.87 8.87 0 0 0 24.6 8.5Z"/>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.67 0h24v24h-24z"/>
      </ClipPath>
    </Defs>
  </Svg>

}
