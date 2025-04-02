
// Simulating a database with localStorage for this demo
// In a real application, this would use a proper database like Firebase, Supabase, etc.

// User types
export interface UserFeedback {
  id: string;
  productId: string;
  productName: string;
  category: string;
  rating: number;
  feedback: string;
  videoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  reward?: number;
  date: string;
  brandId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'user' | 'brand';
  totalSubmissions: number;
  totalEarnings: number;
  pendingReviews: number;
  points: number;
  level: string;
  nextLevelPoints: number;
}

// Brand types
export interface BrandProduct {
  id: string;
  name: string;
  category: string;
  totalFeedback: number;
  averageRating: number;
  brandId: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  role: 'brand' | 'user';
  totalFeedback: number;
  averageRating: number;
  positivePercentage: number;
}

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem('userProfiles')) {
    const defaultUserProfile: UserProfile = {
      id: 'user1',
      name: 'Priya',
      role: 'user',
      totalSubmissions: 24,
      totalEarnings: 12500,
      pendingReviews: 3,
      points: 4500,
      level: 'Gold Reviewer',
      nextLevelPoints: 5000,
    };
    localStorage.setItem('userProfiles', JSON.stringify({
      'user1': defaultUserProfile
    }));
  }

  if (!localStorage.getItem('userFeedback')) {
    const defaultFeedback: UserFeedback[] = [
      {
        id: 'feedback1',
        productId: 'prod1',
        productName: 'Samsung Galaxy S23',
        category: 'Smartphones',
        rating: 4,
        feedback: 'Great phone with excellent camera quality. Battery life could be better.',
        status: 'approved',
        reward: 500,
        date: '2023-07-15',
        brandId: 'brand1'
      },
      {
        id: 'feedback2',
        productId: 'prod2',
        productName: 'Sony WH-1000XM4',
        category: 'Audio Equipment',
        rating: 5,
        feedback: 'Amazing noise cancellation and sound quality. Very comfortable for long listening sessions.',
        status: 'pending',
        date: '2023-07-20',
        brandId: 'brand1'
      },
      {
        id: 'feedback3',
        productId: 'prod3',
        productName: 'Dyson V11 Vacuum',
        category: 'Home Appliances',
        rating: 4,
        feedback: 'Powerful suction and good battery life. A bit heavy for extended use.',
        status: 'approved',
        reward: 750,
        date: '2023-07-10',
        brandId: 'brand2'
      }
    ];
    localStorage.setItem('userFeedback', JSON.stringify(defaultFeedback));
  }

  if (!localStorage.getItem('brandProfiles')) {
    const defaultBrandProfiles = {
      'brand1': {
        id: 'brand1',
        name: 'Samsung Electronics',
        role: 'brand',
        totalFeedback: 6,
        averageRating: 3.8,
        positivePercentage: 67
      },
      'brand2': {
        id: 'brand2',
        name: 'Apple Inc',
        role: 'brand',
        totalFeedback: 8,
        averageRating: 4.2,
        positivePercentage: 75
      }
    };
    localStorage.setItem('brandProfiles', JSON.stringify(defaultBrandProfiles));
  }

  if (!localStorage.getItem('brandProducts')) {
    const defaultBrandProducts: BrandProduct[] = [
      {
        id: 'prod1',
        name: 'Samsung Galaxy S23',
        category: 'Smartphones',
        totalFeedback: 3,
        averageRating: 4.0,
        brandId: 'brand1'
      },
      {
        id: 'prod2',
        name: 'Sony WH-1000XM4',
        category: 'Audio Equipment',
        totalFeedback: 2,
        averageRating: 4.5,
        brandId: 'brand1'
      },
      {
        id: 'prod3',
        name: 'Dyson V11 Vacuum',
        category: 'Home Appliances',
        totalFeedback: 1,
        averageRating: 4.0,
        brandId: 'brand2'
      }
    ];
    localStorage.setItem('brandProducts', JSON.stringify(defaultBrandProducts));
  }
};

// User functions
export const getUserProfile = (userId: string): UserProfile | null => {
  initializeData();
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  return profiles[userId] || null;
};

export const getUserFeedback = (userId: string): UserFeedback[] => {
  initializeData();
  const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  // In a real app, we would filter by user ID. For this demo, we'll return all feedback
  return allFeedback;
};

export const submitFeedback = (feedback: Omit<UserFeedback, 'id' | 'date' | 'status'>) => {
  initializeData();
  const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  const newFeedback: UserFeedback = {
    ...feedback,
    id: `feedback${allFeedback.length + 1}`,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  
  allFeedback.push(newFeedback);
  localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
  
  // Update user profile
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  if (profiles['user1']) {
    profiles['user1'].totalSubmissions += 1;
    profiles['user1'].pendingReviews += 1;
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
  }
  
  // Update brand product
  const products = JSON.parse(localStorage.getItem('brandProducts') || '[]');
  const productIndex = products.findIndex((p: BrandProduct) => p.id === feedback.productId);
  if (productIndex >= 0) {
    products[productIndex].totalFeedback += 1;
    // Recalculate average rating (simplified)
    products[productIndex].averageRating = (products[productIndex].averageRating * (products[productIndex].totalFeedback - 1) + feedback.rating) / products[productIndex].totalFeedback;
    localStorage.setItem('brandProducts', JSON.stringify(products));
  }
  
  // Update brand profile
  const brandProfiles = JSON.parse(localStorage.getItem('brandProfiles') || '{}');
  if (brandProfiles[feedback.brandId]) {
    brandProfiles[feedback.brandId].totalFeedback += 1;
    // Simplistic recalculation of average rating
    brandProfiles[feedback.brandId].averageRating = (brandProfiles[feedback.brandId].averageRating * (brandProfiles[feedback.brandId].totalFeedback - 1) + feedback.rating) / brandProfiles[feedback.brandId].totalFeedback;
    
    // Recalculate positive percentage (ratings 4 and 5)
    const allBrandFeedback = allFeedback.filter((f: UserFeedback) => f.brandId === feedback.brandId);
    const positiveFeedback = allBrandFeedback.filter((f: UserFeedback) => f.rating >= 4).length;
    brandProfiles[feedback.brandId].positivePercentage = Math.round((positiveFeedback / allBrandFeedback.length) * 100);
    
    localStorage.setItem('brandProfiles', JSON.stringify(brandProfiles));
  }
  
  return newFeedback;
};

// Brand functions
export const getBrandProfile = (brandId: string): BrandProfile | null => {
  initializeData();
  const profiles = JSON.parse(localStorage.getItem('brandProfiles') || '{}');
  return profiles[brandId] || null;
};

export const getBrandFeedback = (brandId: string): UserFeedback[] => {
  initializeData();
  const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  return allFeedback.filter((feedback: UserFeedback) => feedback.brandId === brandId);
};

export const getBrandProducts = (brandId: string): BrandProduct[] => {
  initializeData();
  const products = JSON.parse(localStorage.getItem('brandProducts') || '[]');
  return products.filter((product: BrandProduct) => product.brandId === brandId);
};

// Rating distribution helper
export const getRatingDistribution = (feedback: UserFeedback[]) => {
  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  feedback.forEach(item => {
    if (item.rating >= 1 && item.rating <= 5) {
      distribution[item.rating as keyof typeof distribution] += 1;
    }
  });
  
  return distribution;
};
