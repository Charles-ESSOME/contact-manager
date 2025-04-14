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
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { addNewContact, updateExistingContact, selectedContact, selectContact, removeContact } = useContactsRedux();

  const contacts = useSelector((state: RootState) => state?.contacts?.contacts || []);

  const onEdit = (user: User) => {
    setUser(user);

    setOpen(true);

  }

  const onDelete = (user: User) => {
    toast(`You're about to delete ${user?.firstName} ${user?.lastName}`, {
      description: "This action can't be undone",
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

    toast(`Contact ${data?.firstName} ${data?.lastName} has been ${currUser? 'updated' : 'saved'}`, {
      description: "Action complete",
      duration: 7000
    })

    setUser(null);

    setOpen(false);
  }


  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 w-full max-w-full overflow-hidden">
      <Card className="w-full">
        <div className="flex-1">
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h1 className="text-lg sm:text-xl font-bold">User contact management</h1>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-lime-700 text-sm sm:text-base w-full sm:w-auto justify-center">
                  <Plus size={18} className="mr-2" />
                  New Contact
                </button>
              </DialogTrigger>
              <ContactForm onSubmit={onSubmit} initialData={currUser} />
            </Dialog>
          </div>
          <main className="p-2 sm:p-4 md:p-6 overflow-x-auto">
            <UsersList 
              users={contacts} 
              itemsPerPage={itemsPerPage} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              currentPage={currentPage} 
            />
          </main>
        </div>
      </Card>
    </div>
  );
}
