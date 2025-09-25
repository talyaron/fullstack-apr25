import { Fact } from "../model/fact.model";
import { FactModel } from "../model/fact.model";

export const getAllFacts = async (): Promise<Fact[]> => {
    return FactModel.find().populate("userId", "name");
};

export const getFactById = async (id: string): Promise<Fact | null> => {
    return FactModel.findById(id).populate("userId", "name");
};

export const createFact = async (fact: Fact): Promise<Fact> => {
    const newFact = new FactModel(fact);
    const savedFact = await newFact.save();
    return savedFact.populate("userId", "name");
};

export const updateFact = async (id: string, fact: Fact): Promise<Fact | null> => {
    return FactModel.findByIdAndUpdate(id, fact, { new: true }).populate("userId", "name");
};

export const deleteFact = async (id: string): Promise<Fact | null> => {
    return FactModel.findByIdAndDelete(id);
};
