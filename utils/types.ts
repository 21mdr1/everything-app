type paths = '/daily' | '/weekly' | '/projects' | '/' | '/storage' | '/packing' | '/visionBoard';

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

export { type paths, screen, IProject }