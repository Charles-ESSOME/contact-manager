Contact Manager Application
A modern web application for contact management built with Next.js, Redux, and shadcn/ui.
🚀 Features

✨ Modern and responsive user interface
📝 Dynamic contact management (CRUD)
📱 Multiple emails and phone numbers support
🔍 Advanced search and filtering
📊 Results pagination
📥 CSV Import/Export
💾 Data persistence with Redux
🎨 Elegant design with shadcn/ui

🛠️ Tech Stack

Next.js 14
React
TypeScript
Redux Toolkit
Redux Persist
React Hook Form
Zod
shadcn/ui
Tailwind CSS

📋 Prerequisites

Node.js 18.x or higher
npm 9.x or higher

🚀 Getting Started
bashCopy# Clone the repository
git clone https://github.com/your-username/contact-manager.git

# Navigate to the project directory
cd contact-manager

# Install dependencies
npm install

# Start the development server
npm run dev
📁 Project Structure
Copycontact-manager/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Providers.tsx
│   └── users/
│       ├── data-csv.tsx
│       ├── filters.tsx
│       ├── user-list.tsx
│       └── user-form.tsx
├── hooks/
│   ├── fetch-data.tsx
│   ├── use-dispacht.tsx
│   └── use-toast.tsx
│   └── use-user-redux.tsx
├── store/
│   ├── contactsSlice.ts
│   └── store.ts
├── types/
│   └── Contact.ts
└── utils/
    └── csv.ts
🔧 Configuration
Environment Setup
bashCopy# Create .env.local file
touch .env.local

# Add required environment variables
NEXT_PUBLIC_APP_NAME=Contact Manager
Data Types
typescriptCopyinterface Contact {
  id: string;
  firstName: string;
  lastName: string;
  emails: string[];
  phones: string[];
  createdAt: string;
  updatedAt: string;
}
📝 Usage
Contact Management
typescriptCopy// Add a new contact
const { addNewContact } = useContactsRedux();
addNewContact({
  firstName: "John",
  lastName: "Doe",
  emails: ["john@example.com"],
  phones: ["+1234567890"]
});

// Update a contact
const { updateExistingContact } = useContactsRedux();
updateExistingContact(id, {
  firstName: "John Updated"
});

// Delete a contact
const { removeContact } = useContactsRedux();
removeContact(id);
CSV Import/Export
Expected CSV file format:
csvCopyFirstName,LastName,Emails,Phones
John,Doe,john@example.com|john.work@example.com,+1234567890|+0987654321
🔍 Detailed Features
Contact Form

Real-time field validation
Dynamic email and phone fields addition/removal
Clear error messages
Data preview

Contact Table

Pagination (10 entries per page)
Column sorting
Global search
Advanced filters

Import/Export

CSV file validation
Import preview
Custom export
Error handling

🧪 Testing
bashCopy# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
🚀 Deployment
bashCopy# Create production build
npm run build

# Start production server
npm start
📄 CSV Format
Import
CSV file must follow these requirements:

Encoding: UTF-8
Separator: comma (,)
Multiple values separator: pipe (|)
Required headers: FirstName, LastName, Emails, Phones

Export
Export generates a CSV file with:

Timestamp in filename
All contact data
Format compatible for re-import

🤝 Contributing

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

🔑 Key Components
Redux Store
typescriptCopy// Access store in components
import { useContactsRedux } from '@/hooks/useContactsRedux';

const YourComponent = () => {
  const { contacts, addNewContact, updateExistingContact } = useContactsRedux();
  // Component logic
};
Contact Form
typescriptCopy// Basic form usage
import { ContactForm } from '@/components/contacts/ContactForm';

const App = () => (
  <ContactForm onSubmit={(data) => console.log(data)} />
);
CSV Actions
typescriptCopy// Import CSV Actions component
import { CSVActions } from '@/components/contacts/CSVActions';

const App = () => (
  <div>
    <CSVActions />
    {/* Other components */}
  </div>
);
🔒 Security

Input sanitization for all user inputs
CSV file validation before import
Data validation using Zod schemas
Redux state persistence encryption

📱 Responsive Design

Mobile-first approach
Breakpoints:

Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px



📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

Your Name - Initial work

🙏 Acknowledgments

shadcn/ui for the beautiful components
Next.js community for the excellent framework
All library contributors

🐛 Known Issues

CSV import might be slow with very large files
Some browser variations in date formatting
Mobile keyboard issues with dynamic form fields

🔜 Future Improvements

 Bulk contact operations
 Contact groups/categories
 Advanced search filters
 Contact sharing features
 Data backup/restore