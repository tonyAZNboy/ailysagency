// Mock data for development while waiting for Google API approval

export interface MockLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: string;
  rating: number;
  totalReviews: number;
  recentReviews: MockReview[];
  status: 'active' | 'pending' | 'suspended';
  verified: boolean;
  googleLocationId: string;
}

export interface MockReview {
  id: string;
  locationId: string;
  reviewerName: string;
  rating: number;
  text: string;
  date: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  replied: boolean;
}

export interface MockAnalytics {
  totalLocations: number;
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  pendingResponses: number;
  weeklyStats: {
    week: string;
    reviews: number;
    responses: number;
    avgRating: number;
  }[];
}

export const mockLocations: MockLocation[] = [
  {
    id: '1',
    name: 'Downtown Coffee Shop',
    address: '123 Main St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    category: 'Coffee Shop',
    rating: 4.2,
    totalReviews: 156,
    status: 'active',
    verified: true,
    googleLocationId: 'mock_location_1',
    recentReviews: []
  },
  {
    id: '2',
    name: 'Uptown Bakery',
    address: '456 Oak Ave, New York, NY 10002',
    phone: '+1 (555) 234-5678',
    category: 'Bakery',
    rating: 4.7,
    totalReviews: 89,
    status: 'active',
    verified: true,
    googleLocationId: 'mock_location_2',
    recentReviews: []
  },
  {
    id: '3',
    name: 'Garden Restaurant',
    address: '789 Pine St, New York, NY 10003',
    phone: '+1 (555) 345-6789',
    category: 'Restaurant',
    rating: 4.0,
    totalReviews: 234,
    status: 'active',
    verified: false,
    googleLocationId: 'mock_location_3',
    recentReviews: []
  }
];

export const mockReviews: MockReview[] = [
  {
    id: '1',
    locationId: '1',
    reviewerName: 'Sarah Johnson',
    rating: 5,
    text: 'Amazing coffee and friendly staff! The atmosphere is perfect for working or catching up with friends.',
    date: '2024-01-10T10:30:00Z',
    sentiment: 'positive',
    replied: true,
    response: 'Thank you so much for your kind words, Sarah! We\'re thrilled you enjoyed your experience.',
    responseDate: '2024-01-10T14:20:00Z'
  },
  {
    id: '2',
    locationId: '1',
    reviewerName: 'Mike Chen',
    rating: 2,
    text: 'Coffee was cold and service was slow. Waited 20 minutes for my order.',
    date: '2024-01-09T15:45:00Z',
    sentiment: 'negative',
    replied: false
  },
  {
    id: '3',
    locationId: '2',
    reviewerName: 'Emily Davis',
    rating: 5,
    text: 'Best croissants in the city! Fresh pastries every morning.',
    date: '2024-01-08T08:15:00Z',
    sentiment: 'positive',
    replied: true,
    response: 'We\'re so happy you love our croissants, Emily! Thank you for being a loyal customer.',
    responseDate: '2024-01-08T12:30:00Z'
  },
  {
    id: '4',
    locationId: '3',
    reviewerName: 'David Wilson',
    rating: 4,
    text: 'Good food and nice ambiance. The garden seating is lovely in good weather.',
    date: '2024-01-07T19:20:00Z',
    sentiment: 'positive',
    replied: false
  },
  {
    id: '5',
    locationId: '3',
    reviewerName: 'Lisa Brown',
    rating: 1,
    text: 'Terrible experience. Food was overpriced and under-seasoned. Will not return.',
    date: '2024-01-06T20:10:00Z',
    sentiment: 'negative',
    replied: false
  }
];

// Update locations with their recent reviews
mockLocations[0].recentReviews = mockReviews.filter(r => r.locationId === '1');
mockLocations[1].recentReviews = mockReviews.filter(r => r.locationId === '2');
mockLocations[2].recentReviews = mockReviews.filter(r => r.locationId === '3');

export const mockAnalytics: MockAnalytics = {
  totalLocations: mockLocations.length,
  totalReviews: mockReviews.length,
  averageRating: 4.1,
  responseRate: 60,
  pendingResponses: mockReviews.filter(r => !r.replied && r.sentiment === 'negative').length,
  weeklyStats: [
    { week: '2024-01-01', reviews: 12, responses: 8, avgRating: 4.2 },
    { week: '2024-01-08', reviews: 15, responses: 12, avgRating: 4.0 },
    { week: '2024-01-15', reviews: 18, responses: 14, avgRating: 4.3 },
    { week: '2024-01-22', reviews: 21, responses: 18, avgRating: 4.1 }
  ]
};

export const getMockLocationsByTenant = (tenantId: string): MockLocation[] => {
  // For now, return all mock locations for any tenant
  return mockLocations;
};

export const getMockReviewsByLocation = (locationId: string): MockReview[] => {
  return mockReviews.filter(review => review.locationId === locationId);
};

export const getMockAnalyticsByTenant = (tenantId: string): MockAnalytics => {
  return mockAnalytics;
};