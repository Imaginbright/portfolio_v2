export interface Product {
  slug: string;
  name: string;
  price: string;
  image: string;
  description: string[];
  checkoutUrl: string;
}
// Verified against store.imaginbright.com. Add products here only when their real data is available.
export const PRODUCTS: Product[] = [
  {
    slug: "perfect-laptop",
    name: "How To Always Buy The Perfect Laptop",
    price: "NGN0.00+",
    image: "/optimized/laptop-guide.webp",
    description: [
      "I have purchased a total of 4 laptops in my lifetime. The first one couldn’t edit pictures properly. I bought the second one cause I saw it had a dedicated graphics card and completely ignored the fact that it uses a 5th generation intel Core i7 chip.",
      "The third did fare okay for sometime before it wasn’t able properly support my workflow. The 4th laptop is on its way to me currently but I do feel good about it cause I actually did put in the time and effort to research and figure out what actually makes a good laptop good.",
      "I also decided to make a guide out of everything I learnt so you don’t have to make 3 mistakes before getting it right.",
    ],
    checkoutUrl:
      "https://store.imaginbright.com/checkout/buy/2c268f83-5af2-48f2-adb5-c2f20ede6bca",
  },
];
