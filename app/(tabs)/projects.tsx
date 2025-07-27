import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';


const projects = [
    {
        name: "Sample project 1",
        description: "this is a sample project",
        picture: "",
        things: ["motivation"],
        tasks: ["Start", "make a plan"],
        notes: "this is a sample project uwu"
    },
    {
        name: "Sample project 2",
        description: "this is another sample project",
        picture: "",
        things: ["something or other"],
        tasks: ["finish", "think"],
        notes: "we do be sampling"
    }
]

function Item({ name, description, picture }: typeof projects[0] ) {
    return (
        <View style={styles.project.container}>
            <View style={styles.project.infoContainer}>
                <Text style={styles.project.title}>{ name }</Text>
                <Text style={styles.project.description}>{ description }</Text>
            </View>
            <View>
                <Text style={styles.project.image}>{ picture }</Text>
            </View>
        </View>
    );
}


export default function Projects() {
    return (
        <View style={styles.projectList.main}>
            <FlatList
                data = {projects}
                renderItem = {({item}) => Item(item)}
                style = {styles.projectList.container}
            />
        </View>
    );
}

const styles = {
    project: StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderRadius: 25,
            backgroundColor: "mintcream",
            marginVertical: 10,
        },

        infoContainer: {
            flex: 1,
            padding: 10,
            paddingLeft: 20,
            justifyContent: "space-evenly",
        },

        title: {
            fontFamily: 'Virgil',
        },

        description: {
            fontFamily: 'Virgil',
        },

        image: {
            // backgroundColor: 'red',
            width: 120,
            aspectRatio: 1,
            borderRadius: 25,
        }
    }),

    projectList: StyleSheet.create({
        main: {
            flex: 1,
            paddingTop: 50,
            paddingHorizontal: 25,
        },
        container: {
            flex: 1,
        }
    }),
}