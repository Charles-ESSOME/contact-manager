// src/components/contacts/CSVActions.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { convertToCSV, parseCSV, downloadCSV } from '@/utils/csv';
import { Upload, Download, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useContactsRedux } from '@/hooks/use-user-redux';
import { useToast } from '@/hooks/use-toast';

export function CSVActions() {
  const { contacts, addNewContact } = useContactsRedux();
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const handleExport = () => {
    try {
      const csvContent = convertToCSV(contacts);
      const filename = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
      downloadCSV(csvContent, filename);

      toast({
        title: "Export successful",
        description: "Your contacts have been successfully exported.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    }
  };

  const handleImport = async (file: File) => {
    setIsImporting(true);
    try {
      const content = await file.text();
      const contacts = parseCSV(content);

      // Confirmation avant import
      return new Promise<void>((resolve, reject) => {
        const dialog = document.createElement('div');
        document.body.appendChild(dialog);

        const importContacts = () => {
          try {
            contacts.forEach(contact => {
              addNewContact(contact);
            });

            toast({
              title: "Import successful",
              description: `${contacts.length}contacts have been imported successfully.`,
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        dialog.remove();
        importContacts();
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error while importing",
        description: error instanceof Error ? error.message : "An error occurred during import.",
      });
    } finally {
      setIsImporting(false);
      setShowImportDialog(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-blue-200'>
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import contacts</DialogTitle>
            <DialogDescription>Select a CSV file containing your contacts.
            The file must have the columns: First Name, Last Name, Emails, Phones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 border-dashed">
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImport(file);
              }}
              disabled={isImporting}
            />
          </div>
          <DialogFooter>
            {isImporting && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Importing...</span>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className=' bg-green-200'>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exporter les contacts</AlertDialogTitle>
            <AlertDialogDescription>
              This action will export all your contacts to a CSV file.
              Do you want to continue?  
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleExport}>
              Exporter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}