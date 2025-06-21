import { View, Text, ScrollView, StyleSheet } from 'react-native';


export default function daily() {
    return (
        <View style={dailyStyles.main}>
            <ScrollView style={dailyStyles.scroller}>
            <View style={dailyStyles.focusContainer}>
                <Text style={dailyStyles.focusText}>
                    Today's Focus
                </Text>
                <Text style={dailyStyles.focusInput}>
                    focus goes here
                </Text>
            </View>
            <View style={dailyStyles.sectionContainer}>
                <Text style={dailyStyles.sectionLabel}>
                    My Gamechanger Goal:
                </Text>
                <View style={dailyStyles.sectionItemContainer}>
                    <Text style={dailyStyles.sectionItem}>
                        first goal
                    </Text>
                    <Text style={dailyStyles.sectionItem}>
                        second goal
                    </Text>
                    <Text style={dailyStyles.sectionItem}>
                        third goal
                    </Text>
                </View>
            </View>
            <View style={dailyStyles.sectionContainer}>
                <Text style={dailyStyles.sectionLabel}>
                    Personal
                </Text>
                <View style={dailyStyles.sectionItemContainer}>
                    <Text style={dailyStyles.sectionItem}>item 1</Text>
                    <Text style={dailyStyles.sectionItem}>item 2</Text>
                    <Text style={dailyStyles.sectionItem}>item 3</Text>
                    <Text style={dailyStyles.sectionItem}>item 4</Text>
                    <Text style={dailyStyles.sectionItem}>item 5</Text>
                </View>
            </View>
            <View style={dailyStyles.sectionContainer}>
                <Text style={dailyStyles.sectionLabel}>Work</Text>
                <View style={dailyStyles.sectionItemContainer}>
                    <Text style={dailyStyles.sectionItem}>item 1</Text>
                    <Text style={dailyStyles.sectionItem}>item 2</Text>
                    <Text style={dailyStyles.sectionItem}>item 3</Text>
                    <Text style={dailyStyles.sectionItem}>item 4</Text>
                    <Text style={dailyStyles.sectionItem}>item 5</Text>
                </View>
            </View>
            <View>
                <Text>Notes</Text>
                <View>
                    <Text>Notes here</Text>
                </View>
            </View>
            </ScrollView>
        </View>
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

    focusContainer: {
        paddingVertical: 5,
    },

    focusText: {
        marginBottom: 5,
    },

    focusInput: {
        fontFamily: 'Virgil',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    sectionContainer: {
        paddingVertical: 5,
    },

    sectionLabel: {
        marginBottom: 5
    },

    sectionItemContainer: {
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
    },

    sectionItem: {
        fontFamily: 'Virgil',
        borderLeftColor: 'black', 
        borderLeftWidth: 1,
        paddingLeft: 7,
        paddingVertical: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});