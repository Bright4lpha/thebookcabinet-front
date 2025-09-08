export type BookType = {
    id?: string;
    title: string;
    author: string[];
    genre?: string[];
    url_image?: string;
    isbn?: string;
    language?: string;
    description?: string;
    published_date?: string;
    publisher?: string;
    pages?: number;
};

export type AddBookProps = {
    newBook: (title: string, author: string[], genre: string[], isbn: string, publisher: string, publishedDate: string, pages: number, language: string, description: string, imageURL: string) => void;
};