import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/User';

interface UserState {
    contacts: User[];
    isLoading: boolean;
    error: string | null;
    selectedContact: User | null;
}

const initialState: UserState = {
    contacts: [],
    isLoading: false,
    error: null,
    selectedContact: null,
};

export const usersSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<User[]>) => {
            state.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<User>) => {
            state.contacts.push(action.payload);
        },
        updateContact: (state, action: PayloadAction<User>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        setSelectedContact: (state, action: PayloadAction<User | null>) => {
            state.selectedContact = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    setContacts,
    addContact,
    updateContact,
    deleteContact,
    setSelectedContact,
    setError,
    setLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
