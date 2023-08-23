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
        slug: 'add',
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
        name: 'Orders List',
        slug: 'orders',
        description: '',
      },
      {
        name: 'Subscriptions',
        slug: 'subscriptions',
        description: '',
      },
      {
        name: 'Custom Orders',
        slug: 'custom',
        description: '',
      },
      {
        name: 'Incremental Static Regeneration',
        slug: 'isr',
        description: 'Get the best of both worlds between static & dynamic',
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
        name: 'Leads',
        slug: 'leads',
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
