"use client";

import { toast } from "sonner";
import { User } from "@/types/User";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/users/contact-form";
import { useContactsRedux } from "@/hooks/use-user-redux";
import { UsersList } from "@/components/users/contact-list";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";


export default function UserManagement() {
  const [currUser, setUser] = useState<UserFormValues>(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const { addNewContact, updateExistingContact, selectedContact, selectContact, removeContact } = useContactsRedux();

  const contacts = useSelector((state: RootState) => state?.contacts?.contacts || []);

  const onEdit = (user: User) => {
    setUser(user);

    setOpen(true);

  }

  const onDelete = (user: User) => {

    toast(`You're about to delete ${user?.firstName} ${user?.lastName}`, {
      description: "This action can't be undo",
      action: {
        label: "Confirm",
        onClick: () => removeContact(user?.id),
      },
      closeButton: true,
      duration: 20000
    })

  }

  const onSubmit = (data: User) => {
    console.log(data);
    
    if (currUser) {
      updateExistingContact(currUser.id, data);
      selectContact(null);
    } else {
      addNewContact(data);
    }

    toast(`Contact ${data?.firstName} ${data?.lastName} has been ${currUser? 'updated' : 'save'}`, {
      description: "Action complete",
      duration: 70000
    })

    setUser(null);

    setOpen(false);
  }


  return (
    <div className="px-8 py-8 ">
      <Card>
        <div className="flex-1 overflow-auto">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold mb-4">User contact management</h1>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-lime-700">
                  <Plus size={20} className="mr-2" />
                  New Contact
                </button>
              </DialogTrigger>
              <ContactForm onSubmit={onSubmit} initialData={currUser} />
            </Dialog>
          </div>
          <main className="p-6">
            <UsersList users={contacts} itemsPerPage={itemsPerPage} onEdit={onEdit} onDelete={onDelete} currentPage={currentPage} />
          </main>
        </div>
      </Card >
    </ div>
  );
}