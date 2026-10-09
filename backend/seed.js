import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Shop from "./models/shop.model.js";
import Item from "./models/item.model.js";

dotenv.config();

const dummyShopsData = [
  {
    name: "Zaika Biryani & Kebab Darbar",
    city: "Serampore",
    state: "West Bengal",
    address: "Grand Trunk Road, Battala, Serampore",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Chicken Dum Biryani (Kolkata Style)",
        price: 230,
        category: "Main Course",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop",
        rating: { average: 4.7, count: 180 },
        availability: true,
      },
      {
        name: "Royal Mutton Biryani Special",
        price: 340,
        category: "Main Course",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop",
        rating: { average: 4.8, count: 125 },
        availability: true,
      },
      {
        name: "Murgh Butter Masala",
        price: 220,
        category: "Main Course",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop",
        rating: { average: 4.5, count: 94 },
        availability: true,
      },
      {
        name: "Shahi Paneer Makhani",
        price: 180,
        category: "Main Course",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop",
        rating: { average: 4.4, count: 68 },
        availability: true,
      },
      {
        name: "Tandoori Chicken (Half)",
        price: 190,
        category: "Snacks",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop",
        rating: { average: 4.6, count: 110 },
        availability: true,
      },
      {
        name: "Garlic Butter Naan",
        price: 45,
        category: "Main Course",
        type: "veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
        rating: { average: 4.3, count: 85 },
        availability: true,
      },
    ],
  },
  {
    name: "Crust & Crumb Pizzeria",
    city: "Serampore",
    state: "West Bengal",
    address: "College More, GT Road, Serampore",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Farmhouse Fresh Veggie Pizza",
        price: 289,
        category: "Pizza",
        type: "veg",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop",
        rating: { average: 4.6, count: 140 },
        availability: true,
      },
      {
        name: "BBQ Smoked Chicken Pizza",
        price: 369,
        category: "Pizza",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
        rating: { average: 4.7, count: 165 },
        availability: true,
      },
      {
        name: "Stuffed Cheesy Garlic Bread",
        price: 139,
        category: "Snacks",
        type: "veg",
        image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=600&auto=format&fit=crop",
        rating: { average: 4.4, count: 72 },
        availability: true,
      },
      {
        name: "Choco Molten Lava Cake",
        price: 99,
        category: "Desserts",
        type: "veg",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop",
        rating: { average: 4.8, count: 210 },
        availability: true,
      },
    ],
  },
  {
    name: "The Burger & Grill Hub",
    city: "Serampore",
    state: "West Bengal",
    address: "Station Road, Near Platform 1, Serampore",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Double Crispy Chicken Cheeseburger",
        price: 199,
        category: "Burgers",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop",
        rating: { average: 4.6, count: 155 },
        availability: true,
      },
      {
        name: "Spicy Paneer Tikka Burger",
        price: 149,
        category: "Burgers",
        type: "veg",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop",
        rating: { average: 4.4, count: 90 },
        availability: true,
      },
      {
        name: "Peri Peri Crinkle Cut Fries",
        price: 89,
        category: "Fast Food",
        type: "veg",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop",
        rating: { average: 4.5, count: 180 },
        availability: true,
      },
      {
        name: "Grilled Chicken Club Sandwich",
        price: 159,
        category: "Sandwiches",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
        rating: { average: 4.3, count: 65 },
        availability: true,
      },
    ],
  },
  {
    name: "Dragon Wok Chinese Express",
    city: "Serampore",
    state: "West Bengal",
    address: "Mahesh Jagannath Mandir Road, Serampore",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Chicken Hakka Noodles",
        price: 140,
        category: "Chinese",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop",
        rating: { average: 4.5, count: 120 },
        availability: true,
      },
      {
        name: "Kolkata Style Chilli Chicken Dry",
        price: 190,
        category: "Chinese",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop",
        rating: { average: 4.7, count: 230 },
        availability: true,
      },
      {
        name: "Veg Manchurian Gravy",
        price: 130,
        category: "Chinese",
        type: "veg",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
        rating: { average: 4.2, count: 58 },
        availability: true,
      },
      {
        name: "Steamed Chicken Momos (8 Pcs)",
        price: 110,
        category: "Snacks",
        type: "non veg",
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&auto=format&fit=crop",
        rating: { average: 4.8, count: 280 },
        availability: true,
      },
    ],
  },
  {
    name: "Madras Cafe & South Flavors",
    city: "Serampore",
    state: "West Bengal",
    address: "Near Serampore Court, Serampore",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Crispy Masala Dosa with Sambar",
        price: 95,
        category: "South Indian",
        type: "veg",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop",
        rating: { average: 4.6, count: 195 },
        availability: true,
      },
      {
        name: "Steamed Idli Sambar (3 Pcs)",
        price: 70,
        category: "South Indian",
        type: "veg",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop",
        rating: { average: 4.4, count: 110 },
        availability: true,
      },
    ],
  },
  {
    name: "Mithai Mahal & Sweet Treats",
    city: "Serampore",
    state: "West Bengal",
    address: "Tinbazar Market, Serampore",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop",
    items: [
      {
        name: "Warm Ghee Gulab Jamun (2 Pcs)",
        price: 50,
        category: "Desserts",
        type: "veg",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop",
        rating: { average: 4.9, count: 320 },
        availability: true,
      },
      {
        name: "Traditional Bengali Samosa (2 Pcs)",
        price: 30,
        category: "Snacks",
        type: "veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
        rating: { average: 4.7, count: 280 },
        availability: true,
      },
    ],
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGOURL);
    console.log("MongoDB connected successfully!");

    // 1. Get or create an owner user
    let owner = await User.findOne({ role: "owner" });
    if (!owner) {
      console.log("No owner found, creating default restaurant partner user...");
      const hashedPassword = await bcrypt.hash("owner123", 10);
      owner = await User.create({
        fullName: "Quick Zaika Partner",
        email: "partner@quickzaika.com",
        password: hashedPassword,
        role: "owner",
        mobile: "9876543210",
      });
      console.log("Created owner:", owner.email);
    } else {
      console.log("Using existing owner:", owner.fullName, `(${owner.email})`);
    }

    // 2. Loop through dummy shops and insert/update
    for (const shopData of dummyShopsData) {
      const { items, ...shopDetails } = shopData;

      // Find or create shop
      let shop = await Shop.findOne({ name: shopDetails.name, city: shopDetails.city });
      if (!shop) {
        shop = await Shop.create({
          ...shopDetails,
          owner: owner._id,
          items: [],
        });
        console.log(`Created Shop: ${shop.name} in ${shop.city}`);
      } else {
        shop.image = shopDetails.image;
        shop.address = shopDetails.address;
        await shop.save();
        console.log(`Updated Shop: ${shop.name}`);
      }

      // Clear existing dummy items for this shop to avoid duplicate accumulation
      await Item.deleteMany({ shop: shop._id });

      const createdItemIds = [];
      for (const itemData of items) {
        const item = await Item.create({
          ...itemData,
          shop: shop._id,
        });
        createdItemIds.push(item._id);
      }

      shop.items = createdItemIds;
      await shop.save();
      console.log(` -> Added ${createdItemIds.length} dishes for ${shop.name}`);
    }

    console.log("\n==========================================");
    console.log("🎉 Seed Data Successfully Added to MongoDB!");
    console.log("==========================================");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
