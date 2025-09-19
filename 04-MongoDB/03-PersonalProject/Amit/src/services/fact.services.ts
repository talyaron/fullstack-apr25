import { Fact } from "../model/fact.model";
import { FactModel } from "../model/fact.model";

export const getAllFacts = async (): Promise<Fact[]> => {
    return FactModel.find();
}

export const getFactById = async (id: string): Promise<Fact | null> => {
    return FactModel.findById(id);
}

export const createFact = async (fact: Fact): Promise<Fact> => {
    const newFact = new FactModel(fact);
    return newFact.save();
}

export const updateFact = async (id: string, fact: Fact): Promise<Fact | null> => {
    return FactModel.findByIdAndUpdate(id, fact, { new: true });
}

export const deleteFact = async (id: string): Promise<Fact | null> => {
    return FactModel.findByIdAndDelete(id);
}