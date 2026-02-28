import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {items.length} items saved
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
