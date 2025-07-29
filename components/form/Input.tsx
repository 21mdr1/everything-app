import { TextInput, StyleSheet } from 'react-native';

export default function Input({ placeholder = '', value = '', onChangeText, style, multiline = false, clearButtonMode }: {
    placeholder?: string,
    value: string,
    onChangeText: (text: string) => void,
    style?: any,
    multiline?: boolean,
    clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always",
}) {
    return (
        <TextInput
        placeholder = { placeholder }
        value = { value }
        onChangeText = { onChangeText }
        style = {[styles.input, multiline? styles.multiline : styles.singleLine, style]}
        multiline = { multiline }
        clearButtonMode={clearButtonMode}
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