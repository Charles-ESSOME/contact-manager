import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './use-dispacht';
import { User } from '@/types/User';
import { addContact, deleteContact, setSelectedContact, updateContact } from '@/store/userSlice';

export function useContactsRedux() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const selectedContact = useAppSelector((state) => state.contacts.selectedContact);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  const error = useAppSelector((state) => state.contacts.error);

  const addNewContact = useCallback(
    (contactData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newContact: User = {
        ...contactData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addContact(newContact));
    },
    [dispatch]
  );

  const updateExistingContact = useCallback(
    (id: string, contactData: Partial<User>) => {
      const contact = contacts.find((c) => c.id === id);
      if (contact) {
        const updatedContact: User = {
          ...contact,
          ...contactData,
          updatedAt: new Date().toISOString(),
        };
        dispatch(updateContact(updatedContact));
      }
    },
    [dispatch, contacts]
  );

  const removeContact = useCallback(
    (id: string) => {
      dispatch(deleteContact(id));
    },
    [dispatch]
  );

  const selectContact = useCallback(
    (contact: any) => {      
      dispatch(setSelectedContact(contact));
    },
    [dispatch]
  );

  return {
    contacts,
    selectedContact,
    isLoading,
    error,
    addNewContact,
    updateExistingContact,
    removeContact,
    selectContact,
  };
}