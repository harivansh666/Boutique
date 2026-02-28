// import { Product } from "@/types";

// export const products: Product[] = [
//   {
//     id: "1",
//     name: "Royal Banarasi Silk Suit",
//     price: 4599,
//     originalPrice: 5999,
//     images: [
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//     ],
//     category: "suits",
//     fabric: "Banarasi Silk",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     description:
//       "Exquisite Banarasi silk suit with intricate gold zari work. Perfect for weddings and festive occasions.",
//     featured: true,
//     inStock: true,
//   },
//   {
//     id: "2",
//     name: "Elegant Chanderi Saree",
//     price: 3299,
//     originalPrice: 4499,
//     images: [
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//     ],
//     category: "sarees",
//     fabric: "Chanderi",
//     sizes: ["Free Size"],
//     description:
//       "Lightweight Chanderi saree with delicate floral motifs. Ideal for day events and casual gatherings.",
//     featured: true,
//     inStock: true,
//   },
//   {
//     id: "3",
//     name: "Bridal Lehenga Set",
//     price: 12999,
//     originalPrice: 16999,
//     images: [
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//     ],
//     category: "lehenga",
//     fabric: "Velvet & Net",
//     sizes: ["S", "M", "L", "XL"],
//     description:
//       "Stunning bridal lehenga with heavy embroidery and mirror work. A showstopper for your special day.",
//     featured: true,
//     inStock: true,
//   },
//   {
//     id: "4",
//     name: "Cotton Anarkali Kurta",
//     price: 1899,
//     originalPrice: 2499,
//     images: [
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//     ],
//     category: "readymade",
//     fabric: "Cotton",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     description:
//       "Comfortable cotton Anarkali kurta with beautiful block print. Perfect for everyday elegance.",
//     featured: true,
//     inStock: true,
//   },
//   {
//     id: "5",
//     name: "Georgette Palazzo Suit",
//     price: 3499,
//     images: [
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//     ],
//     category: "suits",
//     fabric: "Georgette",
//     sizes: ["S", "M", "L", "XL"],
//     description:
//       "Flowy georgette palazzo suit with elegant embroidery. Great for parties and receptions.",
//     inStock: true,
//   },
//   {
//     id: "6",
//     name: "Kanjivaram Silk Saree",
//     price: 8999,
//     originalPrice: 11999,
//     images: [
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//     ],
//     category: "sarees",
//     fabric: "Kanjivaram Silk",
//     sizes: ["Free Size"],
//     description:
//       "Traditional Kanjivaram silk saree with rich temple border. A timeless classic for every wardrobe.",
//     featured: true,
//     inStock: true,
//   },
//   {
//     id: "7",
//     name: "Designer Lehenga Choli",
//     price: 7999,
//     images: [
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//     ],
//     category: "lehenga",
//     fabric: "Art Silk",
//     sizes: ["S", "M", "L"],
//     description:
//       "Designer lehenga choli with sequin work and flared silhouette. Perfect for sangeet and mehendi.",
//     inStock: true,
//   },
//   {
//     id: "8",
//     name: "Rayon Straight Kurta Set",
//     price: 1499,
//     images: [
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//     ],
//     category: "readymade",
//     fabric: "Rayon",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     description:
//       "Simple yet stylish rayon kurta set with pant. Ideal for office and casual outings.",
//     inStock: true,
//   },
//   {
//     id: "9",
//     name: "Organza Embroidered Suit",
//     price: 5999,
//     originalPrice: 7499,
//     images: [
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//     ],
//     category: "suits",
//     fabric: "Organza",
//     sizes: ["S", "M", "L", "XL"],
//     description:
//       "Premium organza suit with thread embroidery and pearl detailing. A statement piece for celebrations.",
//     inStock: true,
//   },
//   {
//     id: "10",
//     name: "Linen Blend Saree",
//     price: 2799,
//     images: [
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//     ],
//     category: "sarees",
//     fabric: "Linen",
//     sizes: ["Free Size"],
//     description:
//       "Elegant linen blend saree with contrast border. Breathable and perfect for summer events.",
//     inStock: true,
//   },
//   {
//     id: "11",
//     name: "Net Lehenga with Dupatta",
//     price: 6499,
//     images: [
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//       "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
//     ],
//     category: "lehenga",
//     fabric: "Net",
//     sizes: ["S", "M", "L", "XL"],
//     description:
//       "Ethereal net lehenga with shimmer dupatta. Light and graceful for evening celebrations.",
//     inStock: true,
//   },
//   {
//     id: "12",
//     name: "Crepe Printed Kurti",
//     price: 999,
//     originalPrice: 1499,
//     images: [
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
//       "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600",
//     ],
//     category: "readymade",
//     fabric: "Crepe",
//     sizes: ["S", "M", "L", "XL"],
//     description:
//       "Vibrant printed crepe kurti with mandarin collar. Easy, breezy, and chic.",
//     inStock: true,
//   },
// ];
