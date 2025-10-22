import { userModel, User } from "../model/user.model";


export const register = async (name: string, email: string, password: string): Promise<User> => {

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("This user is already exist");
    }

    const newUser = new userModel({ name, email, password });
    return newUser.save();
};

export const login = async (email: string, password: string): Promise<User | null> => {
    const user = await userModel.findOne({ email, password });
    return user;
};
