type paths = '/daily' | '/weekly' | '/projects' | '/' //| '/storage' | '/packing' | '/visionBoard';

interface screen {
    name: string;
    path: paths;
}

interface IProject {
    title: string,
    description: string,
    picture?: string,
    things: { name: string, done: boolean }[],
    tasks: {name: string, done: boolean }[],
    notes: string
}

type dailyTasksKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15';

interface IDailyTaskInputs {
    title: string,
    name: string,
    data: {
        placeholder: string,
        key: dailyTasksKey
    }[]
}

interface ITasks extends Record<dailyTasksKey, string> {}
interface ITaskCompletion extends Record<dailyTasksKey, boolean> {}

export { type paths, screen, IProject, IDailyTaskInputs, dailyTasksKey, ITasks, ITaskCompletion }