// KnowledgeShare Type Definitions

export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export type Discovery = {
    _id: string;
    title: string;
    content: string;
    topic: string;
    difficulty: string;
    userId: string | { _id: string; name: string };
}

export type Comment = {
    _id: string;
    discoveryId: string;
    userId: string;
    text: string;
}