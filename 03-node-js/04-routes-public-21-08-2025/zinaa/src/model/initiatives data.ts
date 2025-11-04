// Duplicate import removed


export interface initiativesAttrs {
    title: string;
    description: string;
}

export class projects {
    title: string;
    description: string;

    constructor(attrs: initiativesAttrs) {
        this.title = attrs.title;
        this.description = attrs.description;
    }
}

const initiatives = [
    new projects({ title: 'Project A', description: 'Description for Project A' }),
    new projects({ title: 'Project B', description: 'Description for Project B' }),
    new projects({ title: 'Project C', description: 'Description for Project C' }),
    new projects({ title: 'Project D', description: 'Description for Project D' }),
    new projects({ title: 'Project E', description: 'Description for Project E' })
];

export default initiatives;

