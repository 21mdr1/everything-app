import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { paths } from '@/utils/types';

interface screen {
    name: string;
    path: paths;
}

const screens: screen[] = [
    { name: 'Daily', path: '/daily'  },
    { name: 'Weekly', path: '/weekly'  },
    { name: 'Projects', path: '/projects' },
    { name: 'Vision Board', path: '/' },
    { name: 'Storage', path: '/storage' },
    { name: 'Packing', path: '/packing' }
]

function Button({ name, path }: { name: string; path: paths }) {
    const router = useRouter();

    return (
        <Pressable style={menuStyles.button} key={name} onPress={() => router.navigate(path) }>
            <Text style={menuStyles.buttonLabel}>
                {name}
            </Text>
        </Pressable>
    );
}

export default function Menu() {

    return (
        <View style={menuStyles.container}>
            <FlatList 
                data={screens}
                renderItem={({ item }) => <Button name={item.name} path={item.path} />}
            />
        </View>
    );
}

const menuStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
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
        fontFamily: 'Virgil',
    }
});