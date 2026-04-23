const invoices = [
  {
    id: 'RT3080',
    description: 'Website Redesign',

    createdAt: '2021-08-01',
    paymentDue: '2021-08-19',
    paymentTerms: 30,

    clientName: 'Jensen Huang',
    clientEmail: 'jensen@example.com',

    senderAddress: {
      street: '123 GPU Street',
      city: 'Santa Clara',
      postCode: '95050',
      country: 'USA',
    },

    clientAddress: {
      street: '42 Silicon Ave',
      city: 'San Jose',
      postCode: '94088',
      country: 'USA',
    },

    items: [
      { name: 'UI Design', quantity: 2, price: 400 },
      { name: 'Frontend Dev', quantity: 2, price: 500 },
    ],

    total: 1800.9,
    status: 'paid',
  },

  {
    id: 'XM9141',
    description: 'Graphic Design',

    createdAt: '2021-08-21',
    paymentDue: '2021-09-20',
    paymentTerms: 30,

    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@email.com',

    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },

    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },

    items: [
      { name: 'Banner Design', quantity: 1, price: 156 },
      { name: 'Email Design', quantity: 2, price: 200 },
    ],

    total: 556.0,
    status: 'pending',
  },

  {
    id: 'RG0314',
    description: 'Mobile App',

    createdAt: '2021-09-15',
    paymentDue: '2021-10-01',
    paymentTerms: 30,

    clientName: 'John Morrison',
    clientEmail: 'john@example.com',

    senderAddress: {
      street: '12 Tech Park',
      city: 'New York',
      postCode: '10001',
      country: 'USA',
    },

    clientAddress: {
      street: '77 Broadway',
      city: 'New York',
      postCode: '10002',
      country: 'USA',
    },

    items: [
      { name: 'App Design', quantity: 5, price: 1000 },
      { name: 'Backend Dev', quantity: 4, price: 2000 },
    ],

    total: 14002.33,
    status: 'paid',
  },

  {
    id: 'RT2080',
    description: 'SEO Optimization',

    createdAt: '2021-09-30',
    paymentDue: '2021-10-12',
    paymentTerms: 14,

    clientName: 'Alysa Werner',
    clientEmail: 'alysa@example.com',

    senderAddress: {
      street: '55 Market St',
      city: 'San Francisco',
      postCode: '94103',
      country: 'USA',
    },

    clientAddress: {
      street: '99 Mission St',
      city: 'San Francisco',
      postCode: '94105',
      country: 'USA',
    },

    items: [{ name: 'SEO Audit', quantity: 1, price: 102.04 }],

    total: 102.04,
    status: 'pending',
  },

  {
    id: 'AA1449',
    description: 'Brand Identity',

    createdAt: '2021-10-01',
    paymentDue: '2021-10-14',
    paymentTerms: 14,

    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa@example.com',

    senderAddress: {
      street: '88 Design Rd',
      city: 'Manchester',
      postCode: 'M1 1AE',
      country: 'UK',
    },

    clientAddress: {
      street: '22 King St',
      city: 'Manchester',
      postCode: 'M2 4WU',
      country: 'UK',
    },

    items: [
      { name: 'Logo Design', quantity: 3, price: 2000 },
      { name: 'Brand Guide', quantity: 2, price: 3000 },
    ],

    total: 14002.33,
    status: 'pending',
  },

  {
    id: 'TY9141',
    description: 'E-commerce Website',

    createdAt: '2021-10-10',
    paymentDue: '2021-10-31',
    paymentTerms: 30,

    clientName: 'Thomas Wayne',
    clientEmail: 'thomas@wayneenterprises.com',

    senderAddress: {
      street: '100 Gotham St',
      city: 'Gotham',
      postCode: '10007',
      country: 'USA',
    },

    clientAddress: {
      street: '1 Wayne Tower',
      city: 'Gotham',
      postCode: '10005',
      country: 'USA',
    },

    items: [
      { name: 'Store Setup', quantity: 3, price: 1500 },
      { name: 'Payment Integration', quantity: 2, price: 1000 },
    ],

    total: 6155.91,
    status: 'pending',
  },

  {
    id: 'V2353',
    description: 'Landing Page',

    createdAt: '2021-10-05',
    paymentDue: '2021-10-12',
    paymentTerms: 7,

    clientName: 'Anita Wainwright',
    clientEmail: 'anita@example.com',

    senderAddress: {
      street: '45 Web Lane',
      city: 'Leeds',
      postCode: 'LS1 4AP',
      country: 'UK',
    },

    clientAddress: {
      street: '10 River St',
      city: 'Leeds',
      postCode: 'LS2 7HY',
      country: 'UK',
    },

    items: [{ name: 'Landing Page Design', quantity: 2, price: 1500 }],

    total: 3102.04,
    status: 'draft',
  },
];

export default invoices;
