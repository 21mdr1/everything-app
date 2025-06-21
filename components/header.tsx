import { StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Header() {
    return (
            <IconSymbol style={header.icon} size={30} name="line.3.horizontal" color='black' />
    );
}

const header = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 99,
    }
});