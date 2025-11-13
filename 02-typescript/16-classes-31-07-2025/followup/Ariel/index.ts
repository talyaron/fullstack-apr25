class Profile {
    public firstName: string
    public lastName: string
    private fullName: string

    constructor(firstName: string, lastName: string, fullName: string){
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = firstName + lastName
    }

    greet(){
        console.log(`Hi ${this.fullName}!`);
        
    }
}

console.log(new Profile("Ariel", "Izraelov", " "));
