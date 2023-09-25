import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./pages/Splash";
import Posts from "./pages/Posts";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}}/>
                <Stack.Screen name="Posts" component={Posts} options={{headerShown : false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;