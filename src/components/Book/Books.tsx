import { useEffect, useState } from "react"
import { Book } from "./Book";

import { BookType } from "../../types/types";
import { getAllBooks } from "../../services/BookServices";

export const Books = () => {
    const [books, setBooks] = useState<BookType[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }
        fetchBooks();
    }, [])

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold underline">Bibliothèque</h1>
                <div className="grid grid-cols-4 gap-y-6">
                    {
                        books.map(book => (
                            <Book
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                url_image={book.url_image}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}