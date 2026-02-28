import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "@/config";
import { useProductStore } from "@/store/useProduct";

const fabricOptions = [
  "Banarasi Silk",
  "Chanderi",
  "Velvet & Net",
  "Cotton",
  "Georgette",
  "Kanjivaram Silk",
  "Art Silk",
  "Rayon",
  "Organza",
  "Linen",
  "Net",
  "Crepe",
];
const categoryOptions = [
  { label: "Suits", value: "suits" },
  { label: "Sarees", value: "saree" },
  { label: "Lehenga", value: "lehenga" },
  { label: "Ready-made", value: "readymade" },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCat ? [initialCat] : [],
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const { fetchProducts, products, isLoading } = useProductStore();

  const toggleFilter = (
    arr: string[],
    val: string,
    setter: (v: string[]) => void,
  ) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category))
        return false;
      if (selectedFabrics.length && !selectedFabrics.includes(p.fabric))
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [products, search, selectedCategories, selectedFabrics, priceRange]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {categoryOptions.map((c) => (
            <label
              key={c.value}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={selectedCategories.includes(c.value)}
                onCheckedChange={() =>
                  toggleFilter(
                    selectedCategories,
                    c.value,
                    setSelectedCategories,
                  )
                }
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={20000}
          step={500}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Fabric</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {fabricOptions.map((f) => (
            <label
              key={f}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={selectedFabrics.includes(f)}
                onCheckedChange={() =>
                  toggleFilter(selectedFabrics, f, setSelectedFabrics)
                }
              />
              {f}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl font-bold mb-2">Shop</h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} products found
              </p>
            </motion.div>

            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl max-w-sm"
              />
              <Button
                variant="outline"
                className="md:hidden rounded-xl gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="flex gap-8">
              {/* Desktop filter sidebar */}
              <div className="hidden md:block w-56 shrink-0">
                <FilterPanel />
              </div>

              {/* Mobile filter overlay */}
              {showFilters && (
                <div className="fixed inset-0 z-40 bg-background p-6 overflow-y-auto md:hidden">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-semibold">
                      Filters
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <FilterPanel />
                  <Button
                    className="w-full mt-6 rounded-xl"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              )}

              {/* Product grid */}
              <div className="flex-1">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg mb-2">No products found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
