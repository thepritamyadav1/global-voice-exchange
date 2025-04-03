
// Simulating a database with localStorage for this demo
// In a real application, this would use a proper database like Firebase, Supabase, etc.

// User types
export interface UserFeedback {
  id: string;
  userId: string;
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
  email?: string;
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
  email?: string;
  role: 'brand' | 'user';
  totalFeedback: number;
  averageRating: number;
  positivePercentage: number;
}

export interface DemoRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  date: string;
  status: 'pending' | 'scheduled' | 'completed';
}

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem('userProfiles')) {
    const defaultUserProfiles = {
      'user1': {
        id: 'user1',
        name: 'Priya',
        email: 'priya@example.com',
        role: 'user',
        totalSubmissions: 0,
        totalEarnings: 0,
        pendingReviews: 0,
        points: 0,
        level: 'Bronze Reviewer',
        nextLevelPoints: 1000,
      }
    };
    localStorage.setItem('userProfiles', JSON.stringify(defaultUserProfiles));
  }

  if (!localStorage.getItem('userFeedback')) {
    localStorage.setItem('userFeedback', JSON.stringify([]));
  }

  if (!localStorage.getItem('brandProfiles')) {
    const defaultBrandProfiles = {
      'brand1': {
        id: 'brand1',
        name: 'Samsung Electronics',
        email: 'samsung@example.com',
        role: 'brand',
        totalFeedback: 0,
        averageRating: 0,
        positivePercentage: 0
      },
      'brand2': {
        id: 'brand2',
        name: 'Apple Inc',
        email: 'apple@example.com',
        role: 'brand',
        totalFeedback: 0,
        averageRating: 0,
        positivePercentage: 0
      }
    };
    localStorage.setItem('brandProfiles', JSON.stringify(defaultBrandProfiles));
  }

  if (!localStorage.getItem('brandProducts')) {
    const defaultBrandProducts = [
      {
        id: 'prod1',
        name: 'Samsung Galaxy S23',
        category: 'Smartphones',
        totalFeedback: 0,
        averageRating: 0,
        brandId: 'brand1'
      },
      {
        id: 'prod2',
        name: 'Sony WH-1000XM4',
        category: 'Audio Equipment',
        totalFeedback: 0,
        averageRating: 0,
        brandId: 'brand1'
      },
      {
        id: 'prod3',
        name: 'Dyson V11 Vacuum',
        category: 'Home Appliances',
        totalFeedback: 0,
        averageRating: 0,
        brandId: 'brand2'
      },
      {
        id: 'prod4',
        name: 'iPhone 15 Pro',
        category: 'Smartphones',
        totalFeedback: 0,
        averageRating: 0,
        brandId: 'brand2'
      }
    ];
    localStorage.setItem('brandProducts', JSON.stringify(defaultBrandProducts));
  }

  if (!localStorage.getItem('demoRequests')) {
    localStorage.setItem('demoRequests', JSON.stringify([]));
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
  // In a real app with proper backend authentication, we would filter by user ID
  // For this demo, we'll return feedback with the matching userId
  return allFeedback.filter((feedback: UserFeedback) => feedback.userId === userId);
};

export const submitFeedback = (feedback: Omit<UserFeedback, 'id' | 'date' | 'status'>) => {
  initializeData();
  const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  const newFeedback: UserFeedback = {
    ...feedback,
    id: `feedback${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  
  allFeedback.push(newFeedback);
  localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
  
  // Update user profile
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  if (profiles[feedback.userId]) {
    profiles[feedback.userId].totalSubmissions += 1;
    profiles[feedback.userId].pendingReviews += 1;
    profiles[feedback.userId].points += 150;
    
    // Check if user leveled up
    if (profiles[feedback.userId].points >= profiles[feedback.userId].nextLevelPoints) {
      if (profiles[feedback.userId].level === 'Bronze Reviewer') {
        profiles[feedback.userId].level = 'Silver Reviewer';
        profiles[feedback.userId].nextLevelPoints = 2500;
      } else if (profiles[feedback.userId].level === 'Silver Reviewer') {
        profiles[feedback.userId].level = 'Gold Reviewer';
        profiles[feedback.userId].nextLevelPoints = 5000;
      } else if (profiles[feedback.userId].level === 'Gold Reviewer') {
        profiles[feedback.userId].level = 'Platinum Reviewer';
        profiles[feedback.userId].nextLevelPoints = 10000;
      }
    }
    
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
  }
  
  // Update brand product
  const products = JSON.parse(localStorage.getItem('brandProducts') || '[]');
  const productIndex = products.findIndex((p: BrandProduct) => p.id === feedback.productId);
  if (productIndex >= 0) {
    const product = products[productIndex];
    product.totalFeedback += 1;
    // Recalculate average rating
    product.averageRating = (product.averageRating * (product.totalFeedback - 1) + feedback.rating) / product.totalFeedback;
    products[productIndex] = product;
    localStorage.setItem('brandProducts', JSON.stringify(products));
  }
  
  // Update brand profile
  const brandProfiles = JSON.parse(localStorage.getItem('brandProfiles') || '{}');
  if (brandProfiles[feedback.brandId]) {
    const brandProfile = brandProfiles[feedback.brandId];
    brandProfile.totalFeedback += 1;
    // Recalculate average rating
    brandProfile.averageRating = (brandProfile.averageRating * (brandProfile.totalFeedback - 1) + feedback.rating) / brandProfile.totalFeedback;
    
    // Recalculate positive percentage (ratings 4 and 5)
    const brandFeedback = allFeedback.filter((f: UserFeedback) => f.brandId === feedback.brandId);
    const positiveFeedback = brandFeedback.filter((f: UserFeedback) => f.rating >= 4).length;
    brandProfile.positivePercentage = Math.round((positiveFeedback / brandFeedback.length) * 100);
    
    brandProfiles[feedback.brandId] = brandProfile;
    localStorage.setItem('brandProfiles', JSON.stringify(brandProfiles));
  }
  
  return newFeedback;
};

export const updateFeedbackStatus = (feedbackId: string, status: 'pending' | 'approved' | 'rejected', reward?: number) => {
  initializeData();
  const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  const feedbackIndex = allFeedback.findIndex((f: UserFeedback) => f.id === feedbackId);
  
  if (feedbackIndex >= 0) {
    const feedback = allFeedback[feedbackIndex];
    const oldStatus = feedback.status;
    feedback.status = status;
    
    if (status === 'approved' && reward) {
      feedback.reward = reward;
    }
    
    allFeedback[feedbackIndex] = feedback;
    localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
    
    // Update user profile
    const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    if (profiles[feedback.userId]) {
      // If changing from pending to approved/rejected
      if (oldStatus === 'pending') {
        profiles[feedback.userId].pendingReviews -= 1;
      }
      
      // If approving with reward
      if (status === 'approved' && reward) {
        profiles[feedback.userId].totalEarnings += reward;
      }
      
      localStorage.setItem('userProfiles', JSON.stringify(profiles));
    }
    
    return feedback;
  }
  
  return null;
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

export const getAllProducts = (): BrandProduct[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('brandProducts') || '[]');
};

// Demo requests
export const submitDemoRequest = (request: Omit<DemoRequest, 'id' | 'date' | 'status'>) => {
  initializeData();
  const allRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
  const newRequest: DemoRequest = {
    ...request,
    id: `demo${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  
  allRequests.push(newRequest);
  localStorage.setItem('demoRequests', JSON.stringify(allRequests));
  
  return newRequest;
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

// Get all available users for demo purposes
export const getAllUsers = (): UserProfile[] => {
  initializeData();
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  return Object.values(profiles);
};

// Get all available brands for demo purposes
export const getAllBrands = (): BrandProfile[] => {
  initializeData();
  const profiles = JSON.parse(localStorage.getItem('brandProfiles') || '{}');
  return Object.values(profiles);
};
