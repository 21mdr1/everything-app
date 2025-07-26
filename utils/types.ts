type paths = '/daily' | '/weekly' | '/projects' | '/' | '/storage' | '/packing';

interface screen {
    name: string;
    path: paths;
}

export { type paths, screen }