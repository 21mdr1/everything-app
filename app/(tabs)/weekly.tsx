import { View, ScrollView, Text, StyleSheet } from 'react-native';

export default function Weekly() {
    return (
        <View>
            <View>
                <Text>Today I need to:</Text>
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