import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/navigation/Navigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    </>
  );
}

export default App;