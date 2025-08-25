console.log('Hello, TypeScript with Node.js!');

const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting('World...4434634564'));

interface User {
  name: string;
  age: number;
  hobbies: string[];
}

const introduceUser = (user: User): string => {
  return `${user.name} is ${user.age} years old and loves ${user.hobbies.join(', ')}.`;
};

const user1: User = {
  name: 'Nachman',
  age: 25,
  hobbies: ['coding', 'gaming', 'music'],
};

console.log(introduceUser(user1));
