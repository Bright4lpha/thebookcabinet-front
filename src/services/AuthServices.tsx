import axios from "axios";
import { UserType } from "../types/types";

const API_BASE_URL = process.env.REACT_APP_URL_BACK + '/users';

export type LoginResponse = {
    token: string;
};

export async function getMe(): Promise<UserType | null> {
    try {
        const response = await axios.get<UserType>(`${API_BASE_URL}/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("authToken")
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export const registerUser = async (user: UserType): Promise<void> => {
    try {
        const response = await axios.post<UserType>(API_BASE_URL, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('User registered successfully:', response.data);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export async function loginUser(email: string, password: string): Promise<string | null> {
    try {
        const response = await axios.post<{ token: string }>(`${API_BASE_URL}/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('User logged in successfully:', response.data);
        return response.data.token;
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
}

export const isUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.get<{ exists: boolean }>(`${API_BASE_URL}/username/${username}`);
        if (response.data.exists)
            return true;
        return false;
    } catch (error) {
        console.error('Error checking username existence:', error);
        return false;
    }
};

export const isEmailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await axios.get<{ exists: boolean }>(`${API_BASE_URL}/email/${email}`);
        if (response.data.exists)
            return true;
        return false;
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
};