import { User, UserCategory } from "@/types/User";

export const users: User[] = [
  {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    emails: ['john.doe@example.com'],
    phones: ['+1 123 456 7890'],
    status: true,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-20T10:30:00Z',
    updatedAt: '2024-11-20T10:30:00Z',
  },
  {
    id: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    emails: ['jane.smith@example.com'],
    phones: ['+1 987 654 3210'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-11-21T11:00:00Z',
    updatedAt: '2024-11-21T11:00:00Z',
  },
  {
    id: 'user3',
    firstName: 'David',
    lastName: 'Lee',
    emails: ['david.lee@example.com'],
    phones: ['+1 555 123 4567'],
    status: false,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-22T12:30:00Z',
    updatedAt: '2024-11-22T12:30:00Z',
  },
  {
    id: 'user4',
    firstName: 'Sarah',
    lastName: 'Jones',
    emails: ['sarah.jones@example.com'],
    phones: ['+1 555 987 6543'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-11-23T13:00:00Z',
    updatedAt: '2024-11-23T13:00:00Z',
  },
  {
    id: 'user5',
    firstName: 'Michael',
    lastName: 'Brown',
    emails: ['michael.brown@example.com'],
    phones: ['+1 555 555 5555'],
    status:true,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-24T14:30:00Z',
    updatedAt: '2024-11-24T14:30:00Z',
  },
  {
    id: 'user6',
    firstName: 'Emily',
    lastName: 'Davis',
    emails: ['emily.davis@example.com'],
    phones: ['+1 555 123 4567', '+1 555 987 6543'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-11-25T15:00:00Z',
    updatedAt: '2024-11-25T15:00:00Z',
  },
  {
    id: 'user7',
    firstName: 'Daniel',
    lastName: 'Moore',
    emails: ['daniel.moore@example.com', 'daniel_moore@example.org'],
    phones: ['+1 555 555 5555'],
    status: false,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-26T16:30:00Z',
    updatedAt: '2024-11-26T16:30:00Z',
  },
  {
    id: 'user8',
    firstName: 'James',
    lastName: 'Wilson',
    emails: ['james.wilson@example.com', 'james.wilson@example.com'],
    phones: [],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-11-27T17:00:00Z',
    updatedAt: '2024-11-27T17:00:00Z',
  },
  {
    id: 'user9',
    firstName: 'Robert',
    lastName: 'Taylor',
    emails: ['robert.taylor@example.com'],
    phones: ['+1 555 123 4567'],
    status:true,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-28T18:30:00Z',
    updatedAt: '2024-11-28T18:30:00Z',
  },
  {
    id: 'user10',
    firstName: 'Charles',
    lastName: 'Anderson',
    emails: ['charles.anderson@example.com'],
    phones: ['+1 555 987 6543'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-11-29T19:00:00Z',
    updatedAt: '2024-11-29T19:00:00Z',
  },
  {
    id: 'user11',
    firstName: 'Christopher',
    lastName: 'White',
    emails: ['christopher.white@example.com'],
    phones: ['+1 555 555 5555'],
    status: false,
    category: UserCategory.CLASSIC,
    createdAt: '2024-11-30T20:30:00Z',
    updatedAt: '2024-11-30T20:30:00Z',
  },
  {
    id: 'user12',
    firstName: 'Daniel',
    lastName: 'Lewis',
    emails: ['daniel.lewis@example.com'],
    phones: ['+1 555 123 4567'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-12-01T21:00:00Z',
    updatedAt: '2024-12-01T21:00:00Z',
  },
  {
    id: 'user13',
    firstName: 'Matthew',
    lastName: 'Clark',
    emails: ['matthew.clark@example.com'],
    phones: ['+1 555 987 6543'],
    status:true,
    category: UserCategory.CLASSIC,
    createdAt: '2024-12-02T22:30:00Z',
    updatedAt: '2024-12-02T22:30:00Z',
  },
  {
    id: 'user14',
    firstName: 'Anthony',
    lastName: 'Hall',
    emails: ['anthony.hall@example.com'],
    phones: ['+1 555 555 5555'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-12-03T23:00:00Z',
    updatedAt: '2024-12-03T23:00:00Z',
  },
  {
    id: 'user16',
    firstName: 'Donald',
    lastName: 'King',
    emails: ['donald.king@example.com'],
    phones: ['+1 555 987 6543'],
    status: true,
    category: UserCategory.VIP,
    createdAt: '2024-12-05T01:00:00Z',
    updatedAt: '2024-12-05T01:00:00Z',
  },
  {
    id: 'user17',
    firstName: 'David',
    lastName: 'Wright',
    emails: ['david.wright@example.com'],
    phones: ['+1 555 555 5555'],
    status: false,
    category: UserCategory.CLASSIC,
    createdAt: '2024-12-06T02:30:00Z',
    updatedAt: '2024-12-05T01:00:00Z',
  }
];