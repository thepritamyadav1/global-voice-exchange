
// Helper functions to generate mock data for testing and demonstration

export const generateDemographicData = () => {
  return [
    { name: "18-24", value: 20, color: "#8884d8" },
    { name: "25-34", value: 35, color: "#83a6ed" },
    { name: "35-44", value: 25, color: "#8dd1e1" },
    { name: "45-54", value: 15, color: "#82ca9d" },
    { name: "55+", value: 5, color: "#a4de6c" }
  ];
};

export const generateGenderData = () => {
  return [
    { name: "Male", value: 48, color: "#8884d8" },
    { name: "Female", value: 45, color: "#FF8042" },
    { name: "Other", value: 7, color: "#FFBB28" }
  ];
};

export const generateLocationData = () => {
  return [
    { name: "Urban", value: 65, color: "#0088FE" },
    { name: "Suburban", value: 25, color: "#00C49F" },
    { name: "Rural", value: 10, color: "#FFBB28" }
  ];
};

export const generateTimeSeriesData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 50) + 10
    });
  }
  
  return data;
};

export const generateEarningsData = (days = 30) => {
  const data = [];
  const today = new Date();
  let cumulativeValue = 0;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const dailyValue = Math.floor(Math.random() * 100) + 20;
    cumulativeValue += dailyValue;
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: cumulativeValue
    });
  }
  
  return data;
};

export const generateSubmissionStats = (count = 5) => {
  const categories = [
    'Smartphones', 'Electronics', 'Home Appliances', 
    'Audio Equipment', 'Wearables', 'Computers', 'Cameras'
  ];
  
  const brands = [
    'Samsung', 'Apple', 'Sony', 'LG', 'Google', 
    'Microsoft', 'Dell', 'HP', 'Lenovo', 'Asus'
  ];
  
  const results = [];
  
  for (let i = 0; i < count; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    
    results.push({
      category: randomCategory,
      count: Math.floor(Math.random() * 50) + 5,
      average: (Math.random() * 3 + 2).toFixed(1),
      brand: randomBrand
    });
  }
  
  return results;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
