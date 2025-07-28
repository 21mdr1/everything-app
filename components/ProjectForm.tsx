import { ScrollView, TextInput, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

export default function ProjectForm({ info, saveFunction }: {
    info?: {
        title: string,
        description: string,
        tasks: {name: string, done: boolean}[],
        things: {name: string, done: boolean}[],
        notes: string,
    };
    saveFunction: any;
}) {

    const [ inputs, setInputs ] = useState(info ?  {
        title: info.title,
        description: info.description,
        tasks: info.tasks,
        currentTask: '',
        things: info.things,
        currentThing: '',
        notes: info.notes
        
    } : {
        title: '',
        description: '',
        tasks: [],
        currentTask: '',
        things: [],
        currentThing: '',
        notes: '',

    });

    const [ addTask, setAddTask ] = useState(false);
    const [ addItem, setAddItem ] = useState(false);
    
    function updateInputs(name: string, value: string) {
        if(name === 'tasks') {
            setInputs(prev => {
                prev.tasks.push({name: value, done: false});
                return {...prev, ['tasks']: prev.tasks};
            });
            setInputs(prev => ({...prev, ['currentTask']: ''}))
            return;
        }

        if(name === 'things') {
            setInputs(prev => {
                prev.things.push({name: value, done: false});
                return {...prev, ['things']: prev.things}
            });

            setInputs(prev => ({...prev, ['currentThing']: ''}))
            return;
        }

        setInputs(prev => ({...prev, [name]: value}));
    }

    return (
        <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.form.form}>
            <ScrollView style={styles.form.container} keyboardDismissMode='on-drag'>
            <TextInput 
                style={[styles.form.input, styles.form.title]}
                placeholder='Project Name'
                value={inputs.title}
                onChangeText={(value) => {updateInputs('title', value)}}
            />
            <TextInput
                style={[styles.form.input, styles.form.bigInput]}
                placeholder='write a short description'
                value={inputs.description}
                onChangeText={(value) => {updateInputs('description', value)}}
                multiline
            />

            <Text style={styles.form.text}> To Dos: </Text>
            <View>
                {inputs.tasks.map((task: {name: string, done: boolean }, index: number) => (
                    <View style={styles.form.listItemContainer} key={index}>
                        <Text style={styles.form.listItemText}>{ task.name }</Text>
                        <Pressable
                            style={({pressed}) => [styles.form.listItemCancel, pressed && styles.form.listItemCancelPressed]}
                            onPress={() => {setInputs(prev => {
                                prev.tasks.splice(index, 1);
                                return prev;
                            })}}
                        >
                            <MaterialIcons name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                ))}
            </View>
            {addTask ? (
                <View style={styles.form.singleInputContainer}>
                    <TextInput 
                        style={[styles.form.input, styles.form.singleInput ]}
                        placeholder='enter task'
                        value={inputs.currentTask}
                        onChangeText={(value) => {updateInputs('currentTask', value)}}
                    />
                    <Pressable
                        style={styles.form.singleInputButton}
                        onPress={() => {
                            if(inputs.currentTask !== '') {
                                updateInputs('tasks', inputs.currentTask);
                            }
                            
                            setAddTask(false);

                        }}
                    >
                        <Text style={styles.form.singleInputButtonText}>
                            {inputs.currentTask === '' ? 
                                "Close" :
                                "Add task"
                            }
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable
                    style={({pressed}) => [styles.form.itemButton, pressed && styles.form.itemButtonPressed]}
                    onPress={() => setAddTask(true)}
                >
                    <Text style={styles.form.itemButtonText}>Add Task</Text>
                </Pressable>
            )}

            <Text style={styles.form.text}> Things needed / to get: </Text>
            <View>
                {inputs.things.map((thing: {name: string, done: boolean }, index: number) => (
                    <View style={styles.form.listItemContainer} key={index}>
                        <Text style={styles.form.listItemText}>{ thing.name }</Text>
                        <Pressable
                            style={({pressed}) => [styles.form.listItemCancel, pressed && styles.form.listItemCancelPressed]}
                            onPress={() => {setInputs(prev => {
                                prev.things.splice(index, 1);
                                return prev;
                            })}}
                        >
                            <MaterialIcons name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                ))}
            </View>
            {addItem ? (
                <View style={styles.form.singleInputContainer}>
                <TextInput 
                    style={[styles.form.input, styles.form.singleInput]}
                    placeholder='enter item'
                    value={inputs.currentThing}
                    onChangeText={(value) => {updateInputs('currentThing', value)}}
                />
                <Pressable
                    style={styles.form.singleInputButton}
                    onPress={() => {
                            if(inputs.currentThing !== '') {
                                updateInputs('things', inputs.currentThing);
                            }
                            
                            setAddItem(false);
                        }}
                >
                    <Text style={styles.form.singleInputButtonText}>
                        {inputs.currentThing === '' ? 
                            "Close" :
                            "Add item"
                        }
                    </Text>
                </Pressable>
                </View>
            ) : (
                <Pressable
                    style={({pressed}) => [styles.form.itemButton, pressed && styles.form.itemButtonPressed]}
                    onPress={() => setAddItem(true)}
                >
                    <Text style={styles.form.itemButtonText}>Add Item</Text>
                </Pressable>
            )}
            
            <Text style={styles.form.text}> Notes: </Text>
            <TextInput
                style={[styles.form.input, styles.form.bigInput]}
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

        bigInput: {
            height: 80,
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
        },

        itemButtonPressed: {
            backgroundColor: 'lightgrey',
        },

        itemButtonText: {
            fontFamily: 'Virgil',
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
        },

        listItemText: {
            fontFamily: 'Virgil',
        },

        listItemCancel: {
            backgroundColor: 'gainsboro',
            width: 24,
            aspectRatio: 1,
            padding: 2,
            borderRadius: 100,
        },

        listItemCancelPressed: {
            backgroundColor: 'lightgrey',
        }
    }),
}