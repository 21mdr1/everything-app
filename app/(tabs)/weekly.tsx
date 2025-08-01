import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { getData } from '@/utils/storageUtils';
import { ITasks } from '@/utils/types';

const data = [
    {
        title: "Today I need to: ",
        name: 'today',
        data: [],
        renderItem: OverrideItem,
    },
    {
        title: "Monday",
        name: "monday",
        data: ["Monday task"],
    },
    {
        title: "Tuesday",
        name: "tuesday",
        data: ["Tuesday task"],
    },
    {
        title: "Wednesday",
        name: "wednesday",
        data: ["Wednesday task"],
    },
    {
        title: "Thursday",
        name: "thursday",
        data: ["Get free Epic Games game"],
    },
    {
        title: "Friday",
        name: "friday",
        data: ["Friday task"],
    },
    {
        title: "Saturday",
        name: "saturday",
        data: ["Saturday task"],
    },
    {
        title: "Sunday",
        name: "sunday",
        data: ["Sunday task"],
    },
]

const weekday: Record<number, string> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
}

function Item({ item }: { item: typeof data[0]}) {
    const [ isShowing, setIsShowing ] = useState(false);
    const [ isToday, _ ] = useState(item.name === weekday[(new Date()).getDay()])

    return (
        <>
            {item.renderItem !== undefined ? (
                <OverrideItem item={item} />
            ) : (
                <View>
                    <Pressable
                        style={({pressed}) => [schedule.button, pressed && schedule.pressedButton, isToday && schedule.todayButton]}
                        onPress={() => setIsShowing(prev => !prev)}
                    >
                        <Text style={[schedule.text, schedule.title, schedule.buttonText, isToday && schedule.todayButtonText]}>{ item.title }</Text>
                    </Pressable>
                    {isShowing &&
                        (<View>
                            {item.data.map((task, index) => (
                                <Text key={index} style={[schedule.text, schedule.list]}>- { task }</Text>
                            ))}
                        </View>)
                    }
                </View>
            )}
        </>
    );
}

function OverrideItem({ item }: { item: typeof data[0]}) {
    return (
        <View style={schedule.topBox}>
            <Text style={[schedule.text, schedule.title, schedule.todayTitle]}>{ item.title }</Text>
            <View>
                {item.data.map((task, index) => (
                    <Text key={index} style={[schedule.text, schedule.list]}>- { task }</Text>
                ))}
            </View>
        </View>
    );
}


export default function Weekly() {
    const [ dailies, setDailies ] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        getData('dailyInputs', (data: ITasks) => {
            let focuses = [];
            for (let item of [data[2], data[3], data[4]]) {
                if(item) { focuses.push(item); }
            }
           setDailies(focuses)
        });
    }, [getData]);

    data[0].data = dailies;

    return (
        <View style={schedule.main}>
            <Pressable onPress={() => router.push('/')} style={schedule.menu}>
                <IconSymbol size={30} name="line.3.horizontal" color='black' />
            </Pressable>
            <FlatList
                style={schedule.flatList}
                data={data}
                renderItem={({item}) => <Item item={item}/>}
            />
        </View>
    );
}

const schedule = StyleSheet.create({
    main: {

    },

    menu: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 99,
    },

    flatList: {
        paddingTop: 30,
    },

    topBox: {
        marginBottom: 5,
    },

    text: {
        fontFamily: 'Virgil',
    },

    button: {
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
    },

    pressedButton: {
        backgroundColor: "gainsboro",
    },

    todayButton: {
        borderColor: 'green',
        borderWidth: 2,
        backgroundColor: 'yellowgreen',
    },

    buttonText: {
        textAlign: 'center',
    },

    todayButtonText: {
        color: 'green',
    },

    title: {
        fontSize: 20,
    },

    todayTitle: {
        marginLeft: 15,
    },

    list: {
        marginLeft: 40,
    },
});