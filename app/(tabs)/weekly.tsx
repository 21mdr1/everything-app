import { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { getData } from '@/utils/storageUtils';
import { ITasks } from '@/utils/types';

export default function Weekly() {
    const [ dailies, setDailies ] = useState<string[]>([]);

    useEffect(() => {
        getData('dailyInputs', (data: ITasks) => {
            let focuses = [];
            for (let item of [data[2], data[3], data[4]]) {
                if(item) {
                    focuses.push(item);
                }
            }
           setDailies(focuses)
        });
    }, [getData]);


    return (
        <View>
            <View>
                <Text>Today I need to:</Text>
                {dailies.map((task, index) => (
                    <Text key={index}>{ task }</Text>
                ))

                }
                <Text>stuff goes here</Text>
            </View>
            <View>
                <View>
                    <Text>Monday</Text>
                </View>
                <View>
                    <Text>Tuesday</Text>
                </View>
                <View>
                    <Text>Wednesday</Text>
                </View>
                <View>
                    <Text>Thursday</Text>
                </View>
                <View>
                    <Text>Friday</Text>
                </View>
                <View>
                    <Text>Saturday</Text>
                </View>
                <View>
                    <Text>Sunday</Text>
                </View>
            </View>
        </View>
    );
}

const schedule = StyleSheet.create({

});