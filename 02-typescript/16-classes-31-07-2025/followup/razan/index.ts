class Book {
    private title: string;
    public author: string;
    public pages: number;
    public genre: "fiction" | "non-fiction" | "other" = "other";

    constructor(title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    describe() {
        console.log(`"${this.title}" is written by ${this.author} and has ${this.pages} pages.`);
    }
}

const book1 = new Book("The Alchemist", "Paulo Coelho", 208);
book1.describe(); // "The Alchemist" is written by Paulo Coelho and has 208 pages.

const book2 = new Book("Sapiens", "Yuval Noah Harari", 443);
book2.genre = "non-fiction";
book2.describe();
