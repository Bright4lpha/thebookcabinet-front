import axios from 'axios';
import { BookType } from '../types/types';

const API_BASE_URL = process.env.REACT_APP_URL_BACK + '/books';

export async function getAllBooks(): Promise<BookType[]> {
    try {
        const response = await axios.get<BookType[]>(API_BASE_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("authToken")
            }
        });
        console.log('Books fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export async function addBook(book: BookType): Promise<void> {
    try {
        const response = await axios.post<BookType>(API_BASE_URL, book, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("authToken")
            }
        });
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}
