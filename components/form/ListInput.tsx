import { View, StyleSheet, Pressable, Text } from 'react-native';
import Input from '@/components/form/Input';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function ListInput({ list, updateList }: {
    list: any[],
    updateList: (_: any) => void,
}) {

    const [ addingItem, setAddingItem ] = useState(false);
    const [ inputText, setInputText ] = useState("");

    return (
        <>
        <List list={list} updateList={updateList}/>

        {addingItem ? 
            (<View style={styles.inputContainer}>
                <Input 
                    style={styles.input}
                    placeholder='enter task'
                    value={inputText}
                    onChangeText={setInputText}
                    clearButtonMode='always'
                />
                <Pressable
                    style={({ pressed }) => [styles.button, styles.inlineButton, pressed && styles.pressedButton]}
                    onPress={() => {
                        inputText !== '' && updateList(inputText);
                        setAddingItem(false);
                        setInputText('');
                    }}
                >
                    <Text style={styles.text}>
                        {inputText === '' ? "Close" : "Add item"}
                    </Text>
                </Pressable>
            </View>)
            :
            (<>
            <Pressable
                style={({pressed}) => [styles.button, styles.blockButton, pressed && styles.pressedButton]}
                onPress={() => setAddingItem(true)}
            >
                <MaterialIcons name="add" size={15} color="black" />
                <Text style={styles.text}>Add Item</Text>
            </Pressable>
            </>)}
        </>
    );
}


function List({ list, updateList }:{
    list: any[],
    updateList: any,
}) {

    return (
        <View>
            {list.map((item: {name: string, done: boolean }, index: number) => (
                <View style={styles.item} key={index}>
                    <MaterialIcons name="radio-button-unchecked" size={20} color="darkgray" />
                    <Text style={[ styles.text, styles.itemText ]}>{ item.name }</Text>

                    <Pressable
                        style={({pressed}) => [styles.button, styles.cancelButton, pressed && styles.pressedButton]}
                        onPress={() => updateList(index)}
                    >
                        <MaterialIcons name="close" size={11} color="darkslategray" />
                    </Pressable>
                </View>
            ))}
        </View>
    );

}

const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 2,
        marginBottom: 15,
    },

    input: {
        alignSelf: 'flex-start',
        flex: 1,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingVertical: 2,
        marginBottom: 0,
    },

    text: {
        fontFamily: 'Virgil',
    },

    button: {
        backgroundColor: 'gainsboro',
        paddingVertical: 3,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressedButton: {
        backgroundColor: 'lightgrey',
    },

    inlineButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    blockButton: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 15,
        flexDirection: 'row',
    },


    item: {
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
        marginBottom: 3,
    },

    itemText: {
        marginLeft: 10,
        flex: 1,
    },

    cancelButton: {
        backgroundColor: 'gainsboro',
        width: 13,
        aspectRatio: 1,
        borderRadius: 100,
        marginRight: 30,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
})