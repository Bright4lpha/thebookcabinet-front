import axios from 'axios';
import { BookType } from '../types/types';

const API_BASE_URL = process.env.REACT_APP_URL_BACK + '/books';

export const getAllBooks = async (): Promise<BookType[]> => {
    try {
        const response = await axios.get<BookType[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}
