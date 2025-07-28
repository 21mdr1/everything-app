import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import ProjectForm from '@/components/ProjectForm';

interface IProject {
    name: string,
    description: string,
    picture: string,
    things: { name: string, done: boolean }[],
    currentThing?: string,
    tasks: {name: string, done: boolean }[],
    currentTask?: string,
    notes: string
}


const projects: IProject[] = [
    {
        name: "Sample project 1",
        description: "this is a sample project",
        picture: "",
        things: [{ name: "motivation", done: false }],
        tasks: [{ name: "Start", done: false }, { name: "make a plan", done: false }],
        notes: "this is a sample project uwu"
    },
    {
        name: "Sample project 2",
        description: "this is another sample project",
        picture: "",
        things: [{ name: "something or other", done: false }],
        tasks: [{name: "finish", done: false }, { name: "think", done: false }],
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
    const [ projectList, setProjectList ] = useState(projects);
    const [ createProject, setCreateProject ] = useState(false);

    async function storeProjects(projects: IProject[] = projectList) {
        try {
            await AsyncStorage.setItem('dailyInputs', JSON.stringify(projects))
        } catch(error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     async function getProjects() {
    //         try {
    //             const jsonValue = await AsyncStorage.getItem('dailyInputs');
    //             jsonValue != null && setProjectList(JSON.parse(jsonValue));
                
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     getProjects();
    // }, []);

    function handleProjectCreation(project: IProject) {
        setProjectList(prev => { 
            prev.push(project); 
            storeProjects(prev);
            return prev;
        });
        
        setCreateProject(false);
    }

    return (
        <View style={styles.projectList.main}>
            { createProject ? 
            (<><FlatList
                data = {projectList}
                renderItem = {({item}) => Item(item)}
                style = {styles.projectList.container}
            />
            <Pressable 
                style={({pressed}) => [styles.projectList.button, pressed && styles.projectList.pressedButton]}
                onPress={() => {setCreateProject(true)}}
            >
                {/* TODO: add plus sign */}
                <Text style={styles.projectList.buttonText}> Add Project </Text>
            </Pressable></>) :
            (<ProjectForm saveFunction={setProjectList} />)
            }
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
            fontSize: 20,
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
            justifyContent: 'space-between',
            paddingBottom: 60,
        },

        container: {
            // backgroundColor: 'red',
            flex: 1,
        },

        button: {
            backgroundColor: 'green',
            paddingVertical: 15,
            borderRadius: 15,
        },

        pressedButton: {
            backgroundColor: 'darkgreen',
        },

        buttonText: {
            fontFamily: 'Virgil',
            fontSize: 20,
            textAlign: 'center',
        }
    }),
}