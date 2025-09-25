
export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export type Fact = {
    _id: string;
    title: string;
    description: string;
    category: string;
    userId: string | { _id: string; name: string };
}

export type Comment = {
    _id: string;
    factId: string;
    userId: string;
    text: string;
};