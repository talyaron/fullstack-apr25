export interface Fighter {
    name: string;
    age: number;
    weight_class: string;
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    gym: string;
    fight_style: string;
    nationality: string;
    active: boolean;
    created_at?: Date;
    updated_at?: Date;
}