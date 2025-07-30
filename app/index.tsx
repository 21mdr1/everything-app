import { useRouter, Router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { paths } from '@/utils/types';
import { MaterialIcons } from '@expo/vector-icons';

interface screen {
    name: string;
    path: paths;
}

const screens: screen[] = [
    { name: 'Daily', path: '/daily'  },
    { name: 'Weekly', path: '/weekly'  },
    { name: 'Projects', path: '/projects' },
    { name: 'Vision Board', path: '/visionBoard' },
    { name: 'Storage', path: '/storage' },
    { name: 'Packing', path: '/packing' }
]

function Button({ name, path, router }: { name: string; path: paths; router: Router }) {

    return (
        <Pressable 
            style={({ pressed }) => 
                pressed ? [menuStyles.button, menuStyles.pressedBackground] : 
                [menuStyles.button, menuStyles.unpressedBackground]} 
            key={name} 
            onPress={ () => router.push(path) }
        >
            <Text style={menuStyles.buttonLabel}>
                {name}
            </Text>
        </Pressable>
    );
}

export default function Menu() {
    const router = useRouter();

    return (
        <View style={menuStyles.container}>
            {router.canGoBack() &&
            (<Pressable onPress={router.back} style={menuStyles.backButton}>
                <MaterialIcons name="close" size={30} color="black" />
            </Pressable>)
            }

            <FlatList 
                contentContainerStyle={menuStyles.list}
                data={screens}
                renderItem={({ item }) => <Button name={item.name} path={item.path} router={router} />}
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
        paddingTop: 50,
    },

    backButton: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 99,
    },

    list: {
        flex: 1,
        justifyContent: 'center',
    },

    button: {
        padding: 15,
        margin: 15,
        borderRadius: 20,
    },

    unpressedBackground: {
        backgroundColor: 'darkseagreen',
    },

    pressedBackground: {
        backgroundColor: 'olivedrab',
    },

    buttonLabel: {
        fontSize: 25,
        textAlign: 'center',
        color: 'darkslategrey',
        fontFamily: 'Virgil',
    }
});