create an aaray of objects of type Book with the following properties:
- id: number
- title: string
- imgUrl: string
- yearOfPublication: number

render the array as a list of Card components, passing the appropriate props to each Card.the design should look similar to the example provided, but with different content for each card.
in the UI instead year of publication show the text "Published ${yearsAgo} years ago", where yearsAgo is calculated based on the current year and the yearOfPublication property of each book.


Add a form that allows users to add new books to the list. The form should have input fields for title, imgUrl, and yearOfPublication. When the form is submitted, a new book object should be created with a unique id and added to the array of books, causing the list to re-render with the new book included.