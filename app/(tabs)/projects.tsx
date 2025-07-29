import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import ProjectForm from '@/components/ProjectForm';
import { MaterialIcons } from '@expo/vector-icons';

import { storeData, getData } from '@/utils/storageUtils';
import { IProject } from '@/utils/types';

function Item({ title, description, picture }: IProject ) {
    return (
        <View style={styles.project.container}>
            <View style={styles.project.infoContainer}>
                <Text style={styles.project.title}>{ title }</Text>
                <Text style={styles.project.description}>{ description }</Text>
            </View>
            <View>
                <Text style={styles.project.image}>{ picture }</Text>
            </View>
        </View>
    );
}


export default function Projects() {
    const [ projectList, setProjectList ] = useState<IProject[]>([]);
    const [ createProject, setCreateProject ] = useState(false);
    const [ viewProject, setViewProject ] = useState(-1);
    const [ editProject, setEditProject ] = useState(-1);

    useEffect(() => {
        getData('projects', setProjectList);
    }, [getData]);


    function updateProjectlist(project: IProject, projectIndex: number = -1) {
        projectIndex >= 0 ? 
            setProjectList(prev => {prev[projectIndex] = project; return prev}) :
            setProjectList(prev => prev.concat([ project ]));
    }

    async function handleProjectCreation(project: IProject) {
        updateProjectlist(project);
        storeData('projects', (await getData('projects')).concat(project));
        setCreateProject(false);
    }

    return (
        <View style={styles.projectList.main}>
            { 
            createProject ? (<ProjectForm saveFunction={(handleProjectCreation)} />) : 
            viewProject >= 0 ? (<></>) :
            editProject >= 0 ? (<></>) :
            (<>
                <FlatList
                    data = {projectList}
                    renderItem = {({item}) => Item(item)}
                    style = {styles.projectList.container}
                />
                <Pressable 
                    style={({pressed}) => [styles.projectList.button, pressed && styles.projectList.pressedButton]}
                    onPress={() => {setCreateProject(true)}}
                >
                    <MaterialIcons style={styles.projectList.plusIcon} name="add" size={24} color="black" />
                    <Text style={styles.projectList.buttonText}> Add Project </Text>
                </Pressable>
            </>)
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
            flex: 1,
        },

        button: {
            backgroundColor: 'green',
            paddingVertical: 15,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        pressedButton: {
            backgroundColor: 'darkgreen',
        },

        buttonText: {
            fontFamily: 'Virgil',
            fontSize: 20,
            textAlign: 'center',
        },

        plusIcon: {
            position: 'absolute',
            left: 80,
        }
    }),
}