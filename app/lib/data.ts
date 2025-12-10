// Products data
export const products = [
  {
    id: 1,
    name: "Fresh Whole Milk",
    category: "Milk",
    price: 3.99,
    discountedPrice: 2.99,
    image: "/images/products/Fresh_Whole_Milk.jpg",
    rating: 4.5,
    reviews: 128,
    stock: 45,
    isFlashSale: true,
  },
  {
    id: 2,
    name: "Greek Yogurt",
    category: "Yogurt",
    price: 4.99,
    discountedPrice: 3.49,
    image: "/images/products/Greek_Yogurt.jpg",
    rating: 4.8,
    reviews: 256,
    stock: 32,
    isFlashSale: true,
  },
  {
    id: 3,
    name: "Cheddar Cheese",
    category: "Cheese",
    price: 6.99,
    discountedPrice: 5.49,
    image: "/images/products/Cheddar_Cheese.jpg",
    rating: 4.7,
    reviews: 89,
    stock: 28,
    isFlashSale: false,
  },
  {
    id: 4,
    name: "Butter (Organic)",
    category: "Butter",
    price: 5.99,
    discountedPrice: 4.49,
    image: "/images/products/Butter_Organic.jpg",
    rating: 4.6,
    reviews: 167,
    stock: 55,
    isFlashSale: true,
  },
  {
    id: 5,
    name: "Fresh Cream",
    category: "Cream",
    price: 3.49,
    discountedPrice: 2.49,
    image: "/images/products/Fresh_Cream.jpg",
    rating: 4.4,
    reviews: 95,
    stock: 40,
    isFlashSale: true,
  },
  {
    id: 6,
    name: "Mozzarella Cheese",
    category: "Cheese",
    price: 4.49,
    discountedPrice: 3.49,
    image: "/images/products/Mozzarella_Cheese.jpg",
    rating: 4.5,
    reviews: 132,
    stock: 38,
    isFlashSale: false,
  },
  {
    id: 7,
    name: "Skimmed Milk",
    category: "Milk",
    price: 2.99,
    discountedPrice: 1.99,
    image: "/images/products/Skimmed_Milk.jpg",
    rating: 4.3,
    reviews: 76,
    stock: 60,
    isFlashSale: true,
  },
  {
    id: 8,
    name: "Flavored Yogurt",
    category: "Yogurt",
    price: 2.49,
    discountedPrice: 1.99,
    image: "/images/products/Flavored_Yogurt.jpg",
    rating: 4.6,
    reviews: 203,
    stock: 50,
    isFlashSale: false,
  },
  {
    id: 9,
    name: "Parmesan Cheese",
    category: "Cheese",
    price: 8.99,
    discountedPrice: 6.99,
    image: "/images/products/Parmesan_Cheese.jpg",
    rating: 4.9,
    reviews: 145,
    stock: 22,
    isFlashSale: true,
  },
  {
    id: 10,
    name: "Cottage Cheese",
    category: "Cheese",
    price: 5.49,
    discountedPrice: 3.99,
    image: "/images/products/Cottage_Cheese.jpg",
    rating: 4.6,
    reviews: 112,
    stock: 35,
    isFlashSale: true,
  },
  {
    id: 11,
    name: "Whipped Cream",
    category: "Cream",
    price: 4.29,
    discountedPrice: 2.99,
    image: "/images/products/Whipped_Cream.jpg",
    rating: 4.7,
    reviews: 98,
    stock: 42,
    isFlashSale: true,
  },
];

// Categories data
export const categories = [
  {
    id: 1,
    name: "Milk",
    icon: "🥛",
    description: "Fresh dairy milk products",
  },
  {
    id: 2,
    name: "Cheese",
    icon: "🧀",
    description: "Premium cheese varieties",
  },
  {
    id: 3,
    name: "Yogurt",
    icon: "🥄",
    description: "Creamy yogurt collections",
  },
  {
    id: 4,
    name: "Butter",
    icon: "🧈",
    description: "Fresh butter selections",
  },
  {
    id: 5,
    name: "Cream",
    icon: "🍨",
    description: "Delicious cream products",
  },
  {
    id: 6,
    name: "Ice Cream",
    icon: "🍦",
    description: "Premium ice cream flavors",
  },
];

// Top categories for home
export const topCategories = [
  {
    id: 1,
    name: "Fresh Milk",
    description: "100% Pure and Fresh Dairy Milk",
    image: "/images/categories/Category_Fresh_Milk.jpg",
  },
  {
    id: 2,
    name: "Artisan Cheese",
    description: "Premium Handcrafted Cheese Collection",
    image: "/images/categories/Category_Artisan_Cheese.jpg",
  },
  {
    id: 3,
    name: "Creamy Yogurt",
    description: "Delicious and Nutritious Yogurt Range",
    image: "/images/categories/Category_Creamy_Yogurt.jpg",
  },
];

// Services/Features data
export const services = [
  {
    id: 1,
    name: "Free Shipping",
    description: "Free shipping on orders over $50",
    icon: "🚚",
  },
  {
    id: 2,
    name: "Order Tracking",
    description: "Track your order in real-time",
    icon: "📍",
  },
  {
    id: 3,
    name: "24/7 Support",
    description: "Round the clock customer support",
    icon: "💬",
  },
  {
    id: 4,
    name: "Money Back Guarantee",
    description: "100% satisfaction guarantee",
    icon: "💰",
  },
  {
    id: 5,
    name: "Fresh Quality",
    description: "Premium fresh dairy products",
    icon: "✨",
  },
];

// Reviews data
export const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing quality milk! Fresh and delicious. Will definitely order again.",
    image: "/images/reviews/Review_Sarah_Johnson.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "The cheese selection is outstanding. Highly recommend Creamio!",
    image: "/images/reviews/Review_Michael_Chen.jpg",
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 4,
    comment: "Great customer service and fast delivery. Very satisfied!",
    image: "/images/reviews/Review_Emma_Davis.jpg",
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 5,
    comment: "Best yogurt I've ever tasted. Worth every penny!",
    image: "/images/reviews/Review_James_Wilson.jpg",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    rating: 5,
    comment: "Excellent quality and reasonable prices. Highly recommended!",
    image: "/images/reviews/Review_Lisa_Anderson.jpg",
  },
  {
    id: 6,
    name: "Robert Brown",
    rating: 4,
    comment: "Very happy with my purchase. Great quality dairy products.",
    image: "/images/reviews/Review_Robert_Brown.jpg",
  },
];

// Blog posts
export const blogPosts = [
  {
    id: 1,
    title: "The Health Benefits of Fresh Dairy",
    excerpt:
      "Discover why fresh dairy products are essential for your health and wellness journey.",
    image: "/images/blog-posts/Health_Benefits_of_Fresh_Dairy.jpg",
    date: "Dec 1, 2024",
    author: "Sarah Miller",
    category: "Health",
    content:
      "Dairy products are a rich source of essential nutrients including calcium, vitamin D, and protein. Fresh dairy from Creamio ensures you get the maximum nutritional benefits. Calcium is crucial for bone health, especially in children and elderly people. Vitamin D helps in calcium absorption and supports immune function. Protein aids in muscle building and repair.",
  },
  {
    id: 2,
    title: "How to Store Cheese Properly",
    excerpt:
      "Learn the best practices for storing different types of cheese to maintain freshness.",
    image: "/images/blog-posts/How_to_Store_Cheese_Properly.jpg",
    date: "Nov 28, 2024",
    author: "James Wilson",
    category: "Tips",
    content:
      "Proper cheese storage extends its shelf life and maintains flavor. Hard cheeses should be wrapped in parchment paper and stored at 50-65°F. Soft cheeses need consistent temperature around 45°F. Always keep cheese away from direct light and strong-smelling foods. Our Creamio cheese collection comes with detailed storage instructions for optimal freshness.",
  },
  {
    id: 3,
    title: "Yogurt: A Probiotic Powerhouse",
    excerpt:
      "Explore how yogurt supports digestive health with beneficial probiotics.",
    image: "/images/blog-posts/Yogurt_A_Probiotic_Powerhouse.jpg",
    date: "Nov 25, 2024",
    author: "Emma Davis",
    category: "Nutrition",
    content:
      "Yogurt is loaded with beneficial probiotics that enhance gut health. These live bacteria improve digestion and boost immune function. Regular consumption of probiotic yogurt can improve gut flora diversity. Creamio's yogurt range includes both plain and flavored options to suit your preferences and dietary needs.",
  },
];

// Notifications/Offers
export const notifications = [
  {
    id: 1,
    title: "Limited Time Offer!",
    description: "Get 30% off on all cheese products this week",
  },
  {
    id: 2,
    title: "Free Shipping Alert",
    description: "Orders over $50 get free shipping nationwide",
  },
  {
    id: 3,
    title: "New Product Launch",
    description: "Try our new Organic Cream Cheese - available now",
  },
  {
    id: 4,
    title: "Member Exclusive",
    description: "Join our loyalty program and get 20% discount",
  },
];

// Languages and Currencies
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
];

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];
