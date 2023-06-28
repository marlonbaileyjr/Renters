import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import PullToRefresh from "../../props/refresh";

const MainPage = ({navigation}:any) => {  
    return (
        <View style={styles.container}>
            <Text>MainPage</Text>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Properties')}>
                <Text>Go to Properties</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    }
});