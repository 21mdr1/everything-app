import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SectionList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeData, getData } from '@/utils/storageUtils';
import { IDailyTaskInputs, dailyTasksKey, ITasks, ITaskCompletion } from '@/utils/types';

const data = {
    inputs: {
        '1': '',
        '2': '', '3': '', '4': '', 
        '5': '', '6': '', '7': '', '8': '', '9': '',
        '10': '', '11': '', '12': '', '13': '', '14': '',
        '15': '',
    },
    completed: {
        '1': false,
        '2': false, '3': false, '4': false, 
        '5': false, '6': false, '7': false, '8': false, '9': false,
        '10': false, '11': false, '12': false, '13': false, '14': false,
        '15': false,
    }
}

const items: IDailyTaskInputs[] = [
    {
        title: 'Today\'s Focus',
        name: 'focus',
        data: [
            {placeholder: 'focus goes here', key: '1'},
        ],
    },
    {
        title: 'My gamechanger goal:',
        name: 'gamechanger',
        data: [
            {placeholder: 'first goal', key: '2'},
            {placeholder: 'second goal', key: '3'},
            {placeholder: 'third goal', key: '4'},
        ]
    },
    {
        title: 'Personal',
        name: 'personal',
        data: [
            {placeholder: 'item 1', key: '5'},
            {placeholder: 'item 2', key: '6'},
            {placeholder: 'item 3', key: '7'},
            {placeholder: 'item 4', key: '8'},
            {placeholder: 'item 5', key: '9'},
        ]
    },
    {
        title: 'Work',
        name: 'work',
        data: [
            {placeholder: 'item 1', key: '10'},
            {placeholder: 'item 2', key: '11'},
            {placeholder: 'item 3', key: '12'},
            {placeholder: 'item 4', key: '13'},
            {placeholder: 'item 5', key: '14'},
        ]
    },
    {
        title: 'Notes',
        name: 'notes',
        data: [
            {placeholder: 'notes here', key: '15'},
        ],
    },
]

function Item({item: { placeholder, key }, index, section}: 
    {
        item: {placeholder: string, key: dailyTasksKey}
        index: number, 
        section: IDailyTaskInputs,
    }, 
    inputs: ITasks, 
    updateInputs: (i: string, j: string) => void,
    storeInputs: () => Promise<void>, 
    completed: ITaskCompletion, 
    updateCompleted: (i: string, j: boolean) => void,
    storeCompleted: () => Promise<void>,
) {
    return (
        <>
        {section.name === 'focus' ? 
        (<TextInput 
            style={dailyStyles.focusInput}
            placeholder={placeholder}
            value={inputs[key]}
            onChangeText={(value) => {updateInputs(key, value)}}
            onBlur={storeInputs}
        />) : section.name === 'notes' ? 
        (<TextInput 
            style={dailyStyles.sectionParagraph}
            placeholder={ placeholder }
            value={inputs[key]}
            onChangeText={(value) => {updateInputs(key, value)}}
            onBlur={storeInputs}
            multiline
        />) :
        (<View style={
            index === 0 ? dailyStyles.sectionItemFirstBox : 
            index === section.data.length - 1 ? dailyStyles.sectionItemLastBox :
            dailyStyles.sectionItemBox}
        >
            <Pressable 
                style={({ pressed }) => [dailyStyles.sectionItemCheck, pressed && dailyStyles.sectionItemCheckBackground] }
                onPressIn={() => {updateCompleted(key, !completed[key])}}
                onPressOut={storeCompleted}
            >
                { completed[key] && <Ionicons name="checkmark-outline" size={20} color="black" /> }
            </Pressable>
            <TextInput 
                // style={[dailyStyles.sectionItemText, completed[key] && dailyStyles.sectionItemTextDec]}
                style={dailyStyles.sectionItemText}
                placeholder={placeholder}
                value={inputs[key]}
                onChangeText={(value) => {updateInputs(key, value)}}
                onBlur={storeInputs}
            />
        </View>)}
        </>
    );
}

export default function daily() {
    const [ inputs, setInputs ] = useState(data.inputs);
    const [ completed, setCompleted ] = useState(data.completed);

    const router = useRouter();

    useEffect(() => {
        getData('dailyInputs', setInputs);
        getData('dailyCompleted', setCompleted);
    },[getData]);


    function updateInputs(name: string, value: string) {
        setInputs(prev => ({...prev, [name]: value}));
    }

    function updateCompleted(name: string, value: boolean) {
        setCompleted(prev => ({...prev, [name]: value}))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={dailyStyles.main}>
            <Pressable onPress={() => router.push('/')} style={dailyStyles.menu}>
                <IconSymbol size={30} name="line.3.horizontal" color='black' />
            </Pressable>
            <View style={dailyStyles.scroller}>
                <SectionList 
                    keyboardDismissMode='on-drag'
                    sections={items}
                    renderSectionHeader={({section: {title}}) => 
                        <Text style={dailyStyles.sectionLabel}>{ title }</Text>}
                    ItemSeparatorComponent={() => 
                        <View style={dailyStyles.separator} />}
                    renderItem={({ item, index, section }) => Item({ item, index, section }, inputs, updateInputs, () => storeData('dailyInputs', inputs), completed, updateCompleted, () => storeData('dailyCompleted', completed))}
                    indicatorStyle='white'
                />

            </View>
        </KeyboardAvoidingView>
    );
}

const dailyStyles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 20,
    },

    scroller: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },

    menu: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 99,
    },

    focusInput: {
        fontFamily: 'Virgil',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    sectionLabel: {
        marginBottom: 5,
        textTransform: "uppercase",
        paddingTop: 10,
    },

    sectionItemBox: {
        flexDirection: 'row',
        borderLeftColor: 'black', 
        borderLeftWidth: 1,
        borderRightColor: 'black', 
        borderRightWidth: 1,
    },

    sectionItemFirstBox: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    sectionItemLastBox: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },

    sectionItemText: {
        fontFamily: 'Virgil',
        borderLeftColor: 'black', 
        borderLeftWidth: 1,
        paddingLeft: 7,
        paddingVertical: 2,
        flex: 1,
    },

    // sectionItemTextDec: {
    //     textDecorationLine: 'line-through',
    //     textDecorationColor: 'black',
    //     textDecorationStyle: 'solid',
    // },

    sectionItemCheck: {
        width: 20,
    },

    sectionItemCheckBackground: {
        backgroundColor: 'gainsboro',
    },

    separator: {
        height: 1,
        backgroundColor: 'black',
    },

    sectionParagraph: {
        fontFamily: 'Virgil',
        minHeight: 80,
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
    }
});