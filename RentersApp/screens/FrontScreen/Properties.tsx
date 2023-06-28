import { View, Text, StyleSheet } from "react-native"
import PullToRefresh from "../../props/refresh";

const Properties = () => {  
    return (
        <View style={styles.container}>
        <Text>Owner Main</Text>
        </View>
    )
}

export default Properties

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});