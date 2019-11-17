import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import Home from '../screens/home/Home'
import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
import SignUp from '../screens/signUp/SignUp';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import LogIn from '../screens/login/Login';



const StackNavigator = createStackNavigator({
    SplashScreen: { screen: SplashScreen },
    WelcomeScreen: { screen: WelcomeScreen },
    LogIn: { screen: LogIn },
    Home: { screen: Home },
    SignUp: { screen: SignUp },
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            drawerLockMode: 'locked-closed'
        },
    });


const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigator
    },
},
    {
        drawerPosition: 'left',
        initialRouteName: 'Home',
        drawerWidth: 250,
        // drawerBackgroundColor: 'blue'
        // contentComponent: DrawerContent,
        // drawerLockMode: 'locked-open'
    }
)

const Navigation = createAppContainer(DrawerNavigator)

export default Navigation;