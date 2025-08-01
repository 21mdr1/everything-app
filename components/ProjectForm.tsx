import { ScrollView, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native'; 
import { useState } from 'react';

import Input from '@/components/form/Input';
import ListInput from './form/ListInput';
import { IProject } from '@/utils/types';
import { MaterialIcons } from '@expo/vector-icons';


export default function ProjectForm({ info, saveFunction, goBack }: {
    info?: IProject;
    saveFunction: (_:IProject) => void;
    goBack: () => void
}) {

    const [ inputs, setInputs ] = useState<IProject>(info ?  info : {
        title: '',
        description: '',
        tasks: [],
        things: [],
        notes: '',
    });
    
    function updateInputs(name: string, value: string, index?: number) {
        if(name === 'tasks' || name === 'things') {
            if(index === undefined) {
                setInputs(prev => {
                    prev[name].push({name: value, done: false});
                    return {...prev, [name]: prev[name]}
                })
            } else {
                setInputs(prev =>
                    ({...prev, [name]: prev.tasks.toSpliced(index, 1) }
                ))
            }

            return;
        }

        setInputs(prev => ({...prev, [name]: value}));
    }

    return (
        <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.form.form}>
            <Pressable onPress={goBack} style={styles.form.backButton}>
                <MaterialIcons name="close" size={30} color="black" />
            </Pressable>
            <ScrollView style={styles.form.container} keyboardDismissMode='on-drag'>
            <Input
                style={styles.form.title}
                placeholder='Project Name'
                value={inputs.title}
                onChangeText={(value) => {updateInputs('title', value)}}
            />
            <Input
                placeholder='write a short description'
                value={inputs.description}
                onChangeText={(value) => {updateInputs('description', value)}}
                multiline
            />

            <Text style={styles.form.text}> To Dos: </Text>
            <ListInput 
                list={inputs.tasks}
                updateList={(value: string | number) =>
                    typeof(value) === "string" ? 
                        updateInputs('tasks', value) : 
                        updateInputs('tasks', '', value)
                }
            />

            <Text style={styles.form.text}> Things needed / to get: </Text>
            <ListInput 
                list={inputs.things}
                updateList={(value: string | number) =>
                    typeof(value) === "string" ? 
                        updateInputs('things', value) : 
                        updateInputs('things', '', value)
                }
            />
            
            <Text style={styles.form.text}> Notes: </Text>
            <Input
                placeholder='extra notes'
                value={inputs.notes}
                onChangeText={(value) => {updateInputs('notes', value)}}
                multiline

            />
            </ScrollView>

            <Pressable
                style={({pressed}) => [styles.form.button, pressed && styles.form.pressedButton]}
                onPress={() => {saveFunction(inputs)}}
            >
                <Text style={[styles.form.text, styles.form.buttonText]}>Save project</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}


const styles = {
    form: StyleSheet.create({
        form: {
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: 50,
            paddingHorizontal: 25,
        },

        backButton: {
            position: 'absolute',
            right: 10,
            top: 20,
            zIndex: 99,
        },

        container: {
            flex: 1,
        },

        title: {
            fontSize: 30,
            marginBottom: 10,
        },

        input: {
            fontFamily: 'Virgil',
            paddingHorizontal: 10,
            marginBottom: 5,
            paddingVertical: 2,
            borderColor: 'gainsboro',
            borderWidth: 1,
            borderRadius: 10,
        },

        singleInputContainer: {
            flexDirection: 'row',
            flex: 1,
            marginTop: 2,
            marginBottom: 15,
        },

        singleInput: {
            alignSelf: 'flex-start',
            flex: 1,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            paddingVertical: 2,
            marginBottom: 0,
        },

        singleInputButton: {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'gainsboro',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 2,
        },

        singleInputButtonText: {
            fontFamily: 'Virgil',
        },
        
        text: {
            fontFamily: 'Virgil',
            marginBottom: 5,
        },

        itemButton: {
            backgroundColor: 'gainsboro',
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 3,
            alignSelf: 'flex-start',
            marginTop: 2,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },

        itemButtonPressed: {
            backgroundColor: 'lightgrey',
        },

        itemButtonText: {
            fontFamily: 'Virgil',
            marginLeft: 5,
        },

        button: {
            alignSelf: 'center',
            backgroundColor: 'lightgrey',
            borderRadius: 15,
            paddingHorizontal: 40,
            paddingVertical: 10,
        },

        buttonText: {
            marginBottom: 0,
        },

        pressedButton: {
            backgroundColor: 'grey',
        },

        listItemContainer: {
            flexDirection: 'row',
            marginLeft: 15,
            alignItems: 'center',
            marginBottom: 3,
        },

        listItemText: {
            fontFamily: 'Virgil',
            marginLeft: 10,
            flex: 1,
        },

        listItemCancel: {
            backgroundColor: 'gainsboro',
            width: 13,
            aspectRatio: 1,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 30,
        },

        listItemCancelPressed: {
            backgroundColor: 'lightgrey',
        }
    }),
}