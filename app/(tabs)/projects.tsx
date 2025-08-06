import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import ProjectForm from '@/components/ProjectForm';
import Project from '@/components/Project';
import { MaterialIcons } from '@expo/vector-icons';

import { storeData, getData } from '@/utils/storageUtils';
import { IProject } from '@/utils/types';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Projects() {
    const [ projectList, setProjectList ] = useState<IProject[]>([]);
    const [ createProject, setCreateProject ] = useState(false);
    const [ viewProject, setViewProject ] = useState(-1);
    const [ editProject, setEditProject ] = useState(-1);

    const router = useRouter();

    useEffect(() => {
        getData('projects', data => {data && setProjectList(data)});
    }, [getData]);

    function Item({ title, description, picture }: IProject, index: number) {
        return (
            <Pressable 
                style={({pressed}) => [styles.project.container, pressed && styles.project.pressedContainer ]}
                onPress={() => setViewProject(index)}
            >
                <View style={styles.project.infoContainer}>
                    <Text style={styles.project.title}>{ title }</Text>
                    <Text style={styles.project.description}>{ description }</Text>
                </View>
                <View>
                    <Text style={styles.project.image}>{ picture }</Text>
                </View>
            </Pressable>
        );
    }

    function updateProjectlist(project: IProject, projectIndex: number = -1) {
        projectIndex >= 0 ? 
            setProjectList(prev => {prev[projectIndex] = project; return [...prev]}) :
            setProjectList(prev => prev.concat([ project ]));
    }

    async function handleProjectCreation(project: IProject) {
        updateProjectlist(project);
        setCreateProject(false);
        storeData('projects', (await getData('projects')).concat(project));
    }

    async function handleProjectDeletion(projectIndex: number) {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this project? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel" // iOS specific style
                },
                {
                    text: "Yes",
                    onPress: async () => { 
                        setProjectList(prev => {prev.splice(projectIndex, 1); return [...prev]});
                        setViewProject(-1); 
                        storeData('projects', (await getData('projects')).toSpliced(projectIndex, 1));
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.projectList.main}>
            { 
            createProject ? (
                <ProjectForm 
                    saveFunction={handleProjectCreation} 
                    goBack={() => setCreateProject(false)} 
                />) : 
            editProject >= 0 ? (
                <ProjectForm 
                    info={projectList[editProject]} 
                    saveFunction={(project: IProject) => { 
                        updateProjectlist(project, editProject); 
                        setEditProject(-1);
                    }} 
                    goBack={() => setEditProject(-1)}
                />) :
            viewProject >= 0 ? (
                <Project 
                    project={projectList[viewProject]} 
                    goBack={() => setViewProject(-1)} 
                    edit={() => setEditProject(viewProject)}
                    updateItem={(itemType: 'tasks' | 'things', index: number, value: boolean) => {
                        const updatedProject = projectList[viewProject]
                        updatedProject[itemType][index].done = value
                        updateProjectlist(updatedProject, viewProject)
                        setEditProject(-1);
                    }}
                    deleteProject={() => handleProjectDeletion(viewProject)}
                />) :
            (<>
                <Pressable onPress={() => router.push('/')} style={styles.projectList.menu}>
                    <IconSymbol size={30} name="line.3.horizontal" color='black' />
                </Pressable>
                <FlatList
                    data = {projectList}
                    renderItem = {({item, index}) => Item(item, index)}
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
            backgroundColor: "snow",
            marginVertical: 10,
        },

        pressedContainer: {
            backgroundColor: "#ECEAEA",
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
            justifyContent: 'space-between',
            paddingBottom: 60,
        },
        menu: {
            position: 'absolute',
            right: 10,
            top: 20,
            zIndex: 99,
        },

        container: {
            flex: 1,
            paddingTop: 50,
            paddingHorizontal: 25,
        },

        button: {
            backgroundColor: 'burlywood',
            paddingVertical: 15,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 25,
        },

        pressedButton: {
            backgroundColor: 'chocolate',
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