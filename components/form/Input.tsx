import { TextInput, StyleSheet } from 'react-native';


export default function Input({ placeholder = '', value = '', onChangeText, style, multiline = false }: {
    placeholder?: string,
    value: string,
    onChangeText: (text: string) => void,
    style?: StyleSheet.NamedStyles<any>,
    multiline?: boolean,
}) {
    return (
        <TextInput
        placeholder = { placeholder }
        value = { value }
        onChangeText = { onChangeText }
        style = {[styles.input, multiline? styles.multiline : styles.singleLine, style]}
        multiline = { multiline }
        />
    );
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Virgil',
        paddingHorizontal: 10,
        marginBottom: 5,
        paddingVertical: 2,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10, 
    },

    singleLine: {

    },

    multiline: {
        height: 80,
    },
})