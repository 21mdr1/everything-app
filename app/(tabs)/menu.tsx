import {View, Text, ScrollView, StyleSheet} from 'react-native';


const screens = [
    { name: 'Daily',  },
    { name: 'Weekly',  },
    { name: 'Projects', },
    { name: 'Vision Board', },
    { name: 'Storage', },
    { name: 'Packing', }
]


export default function menu() {
    return (
        <View style={menuStyles.container}>
                {screens.map(screen => (
                    <View style={menuStyles.button}>
                        <Text style={menuStyles.buttonLabel}>
                            {screen.name}
                        </Text>
                    </View>
                ))}
        </View>
    );
}

const menuStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 30,
    },

    button: {
        backgroundColor: 'darkseagreen',
        padding: 15,
        margin: 15,
        borderRadius: 20,
    },

    buttonLabel: {
        fontSize: 25,
        textAlign: 'center',
        color: 'darkslategrey',
    }
});