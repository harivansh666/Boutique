import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { testimonials } from "@/data/testimonials";
import { useProductStore } from "@/store/useProduct";
import { useEffect } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Index = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const featuredItems = products.filter((p) => p.featured);
  const featured =
    featuredItems.length > 0 ? featuredItems.slice(0, 4) : products.slice(0, 4);

  // Derive categories from DB products dynamically
  const dbCategories = Array.from(new Set(products.map((p) => p.category))).map(
    (cat) => {
      const product = products.find((p) => p.category === cat);
      return {
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        slug: cat.toLowerCase(),
        image: product?.images?.[0] || "",
        description: `Explore our ${cat} collection`,
      };
    },
  );

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            Premium Ethnic Wear
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Elegance in Every
            <br />
            <span className="text-primary">Stitch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-lg mx-auto mb-8 text-sm md:text-base"
          >
            Handcrafted ethnic wear that celebrates tradition with modern
            sophistication. Discover suits, sarees, lehengas & more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button asChild size="lg" className="rounded-xl gap-2 px-8">
              <Link to="/shop">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 px-8"
            >
              <Link to="/custom-stitch">Custom Stitch</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Shop by Category
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore our curated collections
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {dbCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                {...stagger}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block relative overflow-hidden rounded-xl aspect-[3/4]"
                >
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg font-semibold text-primary-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-primary-foreground/70">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Featured Collection
              </h2>
              <p className="text-sm text-muted-foreground">
                Our most loved pieces
              </p>
            </div>
            <Link
              to="/shop"
              className="text-sm font-medium text-primary hover:underline hidden md:block"
            >
              View All →
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm text-muted-foreground">
              Real love from real women
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                {...stagger}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${j < t.rating ? "fill-gold text-gold" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Style Reels
            </h2>
            <p className="text-sm text-muted-foreground">
              Get inspired by our latest looks
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[9/16] rounded-xl bg-muted overflow-hidden group cursor-pointer"
              >
                <img
                  src={products[i - 1]?.images[0]}
                  alt={`Reel ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-primary ml-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-lg mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Stay in the Loop
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Subscribe for exclusive offers, new arrivals, and styling tips.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="rounded-xl flex-1"
              />
              <Button className="rounded-xl gap-2">
                <Send className="h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
