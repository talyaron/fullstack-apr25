console.log('Hello, TypeScript with Node.js!');

const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting('World...4434634564'));

function makeDiv():void {
  const div = document.createElement('div');
  div.textContent = 'This is a div created by TypeScript!';
  document.body.appendChild(div);
}

