import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Ruler, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "@/hooks/use-toast";
import { useProductStore } from "@/store/useProduct";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Using relative or full URL depending on proxy. Assuming full URL for now since no axiosInstance was found.
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`,
        );
        setProduct(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Button asChild variant="outline" className="mt-4 rounded-xl">
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    addItem(product, size);
    toast({
      title: "Added to cart!",
      description: `${product.name} (${size})`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary/30"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              {product.category}
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div>
            <h4 className="text-sm font-semibold mb-2">Fabric</h4>
            <span className="inline-block px-3 py-1 rounded-lg bg-secondary text-sm">
              {product.fabric}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    (selectedSize || product.sizes[0]) === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1 rounded-xl gap-2"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl"
              onClick={() => {
                toggleItem(product);
                toast({
                  title: wishlisted
                    ? "Removed from wishlist"
                    : "Added to wishlist",
                });
              }}
            >
              <Heart
                className={`h-4 w-4 ${wishlisted ? "fill-primary text-primary" : ""}`}
              />
            </Button>
          </div>

          {/* Measurement Guide */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 text-sm text-muted-foreground"
              >
                <Ruler className="h-4 w-4" /> Measurement Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
              <DialogHeader>
                <DialogTitle className="font-display">
                  Size & Measurement Guide
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="grid grid-cols-4 gap-2 text-center font-medium text-foreground">
                  <span>Size</span>
                  <span>Bust</span>
                  <span>Waist</span>
                  <span>Hip</span>
                </div>
                {[
                  ["S", '34"', '28"', '36"'],
                  ["M", '36"', '30"', '38"'],
                  ["L", '38"', '32"', '40"'],
                  ["XL", '40"', '34"', '42"'],
                  ["XXL", '42"', '36"', '44"'],
                ].map(([size, bust, waist, hip]) => (
                  <div
                    key={size}
                    className="grid grid-cols-4 gap-2 text-center py-2 border-t border-border"
                  >
                    <span className="font-medium text-foreground">{size}</span>
                    <span>{bust}</span>
                    <span>{waist}</span>
                    <span>{hip}</span>
                  </div>
                ))}
                <p className="text-xs mt-4">
                  Need a custom fit? Try our{" "}
                  <Link
                    to="/custom-stitch"
                    className="text-primary hover:underline"
                  >
                    Custom Stitch
                  </Link>{" "}
                  service.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}
