import { User } from "@/types/User";

export const convertToCSV = (contacts: User[]): string => {
  // En-têtes du CSV
  const headers = ['Prénom', 'Nom', 'Emails', 'Téléphones'];
  
  // Transformation des données en format CSV
  const rows = contacts.map(contact => [
    contact.firstName,
    contact.lastName,
    contact.emails.join('|'),
    contact.phones.join('|')
  ]);
  
  // Combine les en-têtes et les lignes
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
};

export const parseCSV = (csvContent: string) => {
  const lines = csvContent.split('\n');
  if (lines.length < 2) throw new Error('Le fichier CSV est vide ou invalide');

  // Vérifie les en-têtes
  const headers = lines[0].toLowerCase().split(',');
  const expectedHeaders = ['prénom', 'nom', 'emails', 'téléphones'];
  
  const headersValid = expectedHeaders.every(header => 
    headers.some(h => h.replace(/[\"]/g, '').trim().toLowerCase() === header)
  );
  
  if (!headersValid) {
    throw new Error('Format de fichier CSV invalide. Les en-têtes attendus sont : Prénom, Nom, Emails, Téléphones');
  }

  // Parse les lignes de données
  return lines.slice(1)
    .filter(line => line.trim()) // Ignore les lignes vides
    .map(line => {
      const values = line.split(',').map(value => value.replace(/[\"]/g, '').trim());
      
      return {
        firstName: values[0],
        lastName: values[1],
        emails: values[2].split('|').filter(Boolean),
        phones: values[3].split('|').filter(Boolean)
      };
    });
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if ((navigator as any).msSaveBlob) {
    // Pour IE
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};