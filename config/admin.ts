export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Dashboard',
    items: [
      {
        name: 'Overview',
        slug: 'overview',
        description: '',
      },
      {
        name: 'Tasks',
        slug: 'tasks',
        description: '',
      },
      {
        name: 'Financial',
        slug: 'financial',
        description: '',
      },
    ],
  },
  {
    name: 'Solutions',
    items: [
      {
        name: 'Solutions List',
        slug: 'solutions',
        description: '',
      },
      {
        name: 'Add New',
        slug: 'solutions/add',
        description: '',
      },
      {
        name: 'Deals',
        slug: 'deals',
        description: '',
      },
    ],
  },
  {
    name: 'Orders',
    items: [
      {
        name: 'Summary',
        slug: 'summary',
        description: '',
      },
      {
        name: 'Orders List',
        slug: 'orders',
        description: '',
      },
      {
        name: 'Subscriptions',
        slug: 'subscriptions',
        description: '',
      },
    ],
  },
  {
    name: 'Customers',
    items: [
      {
        name: 'User list',
        slug: 'users',
        description:'',
      },
      {
        name: 'Support',
        slug: 'support',
        description:'',
      },
    ],
  },
  {
    name: 'Marketing',
    items: [
      {
        name: 'Subscribers',
        slug: 'subscribers',
        description: '',
      },
      {
        name: 'Campaigns',
        slug: 'campaigns',
        description: '',
      },
      {
        name: 'Funnel flow',
        slug: 'flow',
        description: '',
      },
      {
        name: 'E-mails',
        slug: 'email',
        description: '',
      },
      {
        name: 'SMS',
        slug: 'sms',
        description: '',
      },
    ],
  },
  {
    name: 'Dynamic Pages',
    items: [
      {
        name: 'Site Bulletin',
        slug: 'bulletin',
        description: '',
      },
      {
        name: 'Faqs',
        slug: 'faqs',
        description: '',
      },
      {
        name: 'Stats',
        slug: 'stat',
        description: '',
      },
      {
        name: 'Landing Page',
        slug: 'landing',
        description: '',
      },
    ],
  },
];
