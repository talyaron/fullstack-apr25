import { UserModel, User } from "../model/user.model";


export const register = async (name: string, email: string, password: string) : Promise<User> => {

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("This user is already exist");
    }

    const newUser = new UserModel({ name, email, password});
    return newUser.save();
};

export const login = async (email: string, password: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email, password});
    return user;
}