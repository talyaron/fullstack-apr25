## Principles of React

All components are built of render functions. They must start with a capital letter.

In each render function, there is a return statement that returns a description of what the UI should look like.

We use a language that is being called JSX, which is a syntax extension for JavaScript. It allows us to write HTML-like code within our JavaScript files, making it easier to create and visualize the structure of our user interfaces.

differences between JSX and HTML:
1. JSX uses camelCase for attributes instead of lowercase.
2. JSX requires the use of `className` instead of `class`.
3. JSX expressions must be wrapped in curly braces `{}`.
4. JSX elements must be properly closed.
5. JSX can only return a single root element, which can be achieved using fragments (`<>...</>`).