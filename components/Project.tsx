import { Text, Pressable, View, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IProject } from "@/utils/types";

export default function Project({ project, goBack, edit, updateItem }: {
    project: IProject;
    goBack: () => void;
    edit: () => void;
    updateItem: (itemType: 'tasks' | 'things', index: number, value: boolean) => void;
}) {
    
    return (
        <ScrollView style={styles.project.main}>
            <View style={styles.project.container}>
                <Pressable
                    style={({ pressed }) => [styles.backButton.container, pressed && styles.backButton.pressedContainer]}
                    onPress={goBack}
                >
                    <MaterialIcons name="arrow-back-ios" size={15} color="black" />
                    <Text style={styles.backButton.text}>Go Back</Text>
                </Pressable>

                <View style={styles.project.content}>

                <View style={styles.project.titleContainer}>
                    <Text style={styles.project.title}>{ project.title }</Text>
                    <Pressable
                        onPress={edit}
                    >
                        <MaterialIcons name="edit" size={30} color="dimgrey" />
                    </Pressable>
                </View>
                
                <Text style={styles.project.description}>{ project.description }</Text>

                <Text style={styles.list.title}>To Dos:</Text>

                {project.tasks.map((task: {name: string, done: boolean }, index: number) => (
                    <Pressable 
                        style={styles.list.item} 
                        key={index}
                        onPress={() => {updateItem('tasks', index, !task.done)}}
                    >
                        {task.done ?
                            <MaterialIcons name="check-circle-outline" size={20} color="darkgray" /> :
                            <MaterialIcons name="radio-button-unchecked" size={20} color="darkgray" />
                        }
                        <Text style={[styles.list.text, task.done && styles.list.crossedOutText]}>{ task.name }</Text>
                    </Pressable>
                ))}

                <Text style={styles.list.title}>Things needed / to get:</Text>

                {project.things.map((thing: {name: string, done: boolean }, index: number) => (
                        <Pressable
                            style={styles.list.item}
                            key={index}
                            onPress={() => {updateItem('things', index, !thing.done)}}
                        >
                            {thing.done ? 
                                <MaterialIcons name="check-circle-outline" size={20} color="darkgray" /> :
                                <MaterialIcons name="radio-button-unchecked" size={20} color="darkgray" />
                            }
                            <Text style={[styles.list.text, thing.done && styles.list.crossedOutText]}>{ thing.name }</Text>
                        </Pressable>
                        
                ))}

                <Text style={styles.list.title}>Notes:</Text>
                <Text style={styles.project.description}>{ project.notes }</Text>
                </View>

                <Pressable
                    style={({pressed}) => [styles.delete.button, pressed && styles.delete.pressedButton]}
                    onPress={() => {}}
                >
                    <Text style={styles.delete.text}>Delete Project</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}


const styles = {
    backButton: StyleSheet.create({
        container: {
            backgroundColor: 'gainsboro',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 15,
            position: 'absolute',
            top: -28,
        },

        pressedContainer: {
            backgroundColor: 'lightgrey',
        },

        text: {
            fontFamily: 'Virgil',
        }
    }),

    project: StyleSheet.create({
        main: {
            flex: 1,
            paddingTop: 50,
        }, 

        container: {
            minHeight: 557,
        },

        content: {
            flex: 1,
        },

        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        title: {
            fontFamily: 'Virgil',
            fontSize: 30,
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 2,
        },

        description: {
            fontFamily: 'Virgil',
            paddingHorizontal: 10,
            marginBottom: 5,
            paddingVertical: 2,
        }
    }),

    list: StyleSheet.create({
        title: {
            fontFamily: 'Virgil',
            marginBottom: 5,
            fontSize: 15,
            marginTop: 10,
        },

        item: {
            flexDirection: 'row',
            marginLeft: 15,
            alignItems: 'center',
            marginBottom: 3,
        },

        text: {
            fontFamily: 'Virgil',
            marginLeft: 10,
            flex: 1,
        },

        crossedOutText: {
            textDecorationColor: 'black',
            textDecorationLine: "line-through",
        },
    }),

    delete: StyleSheet.create({
        button: {
            alignSelf: 'center',
            backgroundColor: '#fad7d8',
            paddingVertical: 7,
            paddingHorizontal: 30,
            borderRadius: 50,
        },

        pressedButton: {
            backgroundColor: '#f5c1c3',
        },

        text: {
            fontFamily: 'Virgil',
            fontSize: 20,
            color: 'firebrick',
            textAlign: 'center',
        },
    })
}