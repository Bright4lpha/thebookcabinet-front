import { useEffect, useState } from "react"

import { Book } from "./Book";

import { BookType } from "../../types/types";
import { getAllBooks, addBook } from "../../services/BookServices";
import AddBook from "./AddBook";
import { useNavigate } from "react-router";

export const Books = () => {
    const [books, setBooks] = useState<BookType[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (!localStorage.getItem("authToken")) {
                    navigate("/login");
                    return;
                }
                const data = await getAllBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [])

    function newBook(title: string, author: string[], genre: string[], isbn: string, publisher: string, publishedDate: string, pages: number, language: string, description: string, imageURL: string): void {
        const book: BookType = { title, author, genre, isbn, publisher, published_date: publishedDate, pages, language, description, url_image: imageURL };
        addBook(book);
    }

    return (
        <>
            <div className="container px-4 sm:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold underline">Bibliothèque</h1>
                    <AddBook newBook={newBook} />
                </div>



                <div className="grid grid-cols-4 gap-y-6">

                    {books && books.length === 0 && (
                        <p>No books available.</p>
                    )}
                    {
                        books.map(book => (
                            <Book
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                url_image={book.url_image}
                                isbn={book.isbn}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}