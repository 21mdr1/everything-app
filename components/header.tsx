import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Header({ routerFn }: {routerFn: () => void}) {
    return (
        <Pressable onPress={routerFn} style={header.container}>
            <IconSymbol size={30} name="line.3.horizontal" color='black' />
        </Pressable>
    );
}

const header = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 99,
    },
});