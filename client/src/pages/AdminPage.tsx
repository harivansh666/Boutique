import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProductStore } from "@/store/useProduct";
import { useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const adminTabs = ["Dashboard", "Products", "Orders"];

export default function AdminPage() {
  const [tab, setTab] = useState("Dashboard");
  const { user, logout, users, fetchUsers } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast({ title: "Logged out successfully" });
    } catch (error) {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "suits",
    images: "",
    fabric: "",
    sizes: "Free Size",
  });

  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const { orders, fetchAllOrders, updateOrderStatus } = useOrderStore();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        images: productForm.images
          ? productForm.images.split(",").map((i) => i.trim())
          : [],
        sizes: productForm.sizes
          ? productForm.sizes.split(",").map((s) => s.trim())
          : [],
      });
      toast({ title: "Product created successfully!" });
      setIsAddOpen(false);
      setProductForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "suits",
        images: "",
        fabric: "",
        sizes: "Free Size",
      });
    } catch (error) {
      toast({ title: "Failed to create product", variant: "destructive" });
    }
  };

  const handleEditClick = (product: any) => {
    setEditingProductId(product._id || product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      images: product.images.join(", "),
      fabric: product.fabric,
      sizes: product.sizes.join(", "),
    });
    setIsEditOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;

    try {
      await updateProduct(editingProductId, {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        images: productForm.images
          ? productForm.images.split(",").map((i) => i.trim())
          : [],
        sizes: productForm.sizes
          ? productForm.sizes.split(",").map((s) => s.trim())
          : [],
      });
      toast({ title: "Product updated successfully!" });
      setIsEditOpen(false);
      setEditingProductId(null);
    } catch (error) {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast({ title: "Product deleted successfully!" });
      } catch (error) {
        toast({ title: "Failed to delete product", variant: "destructive" });
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
    fetchUsers();
  }, [fetchProducts, fetchAllOrders, fetchUsers]);

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      color: "text-primary",
    },
    {
      label: "Products",
      value: products.length,
      icon: ShoppingBag,
      color: "text-gold",
    },
    {
      label: "Users",
      value: users.length,
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Revenue",
      value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-primary",
    },
  ];

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      toast({ title: `Order updated to ${status}` });
    } catch (e) {
      toast({ title: "Failed to update order", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your boutique
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="rounded-xl gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="flex gap-2 mb-8">
          {adminTabs.map((t) => (
            <Button
              key={t}
              variant={tab === t ? "default" : "outline"}
              className="rounded-xl"
              size="sm"
              onClick={() => setTab(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        {tab === "Dashboard" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {tab === "Products" && (
          <Card className="rounded-xl">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display">Products</CardTitle>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-xl gap-1">
                    <Plus className="h-3.5 w-3.5" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          required
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Product Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={productForm.category}
                          onValueChange={(v) =>
                            setProductForm({ ...productForm, category: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "suits",
                              "saree",
                              "lehenga",
                              "readymade",
                              "kurta",
                              "dresses",
                            ].map((c) => (
                              <SelectItem
                                key={c}
                                value={c}
                                className="capitalize"
                              >
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹)</label>
                        <Input
                          required
                          type="number"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="999"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stock</label>
                        <Input
                          required
                          type="number"
                          value={productForm.stock}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              stock: e.target.value,
                            })
                          }
                          placeholder="10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fabric</label>
                        <Input
                          required
                          value={productForm.fabric}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              fabric: e.target.value,
                            })
                          }
                          placeholder="Cotton"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Sizes (comma seq)
                        </label>
                        <Input
                          value={productForm.sizes}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              sizes: e.target.value,
                            })
                          }
                          placeholder="S, M, L"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium">
                          Image URLs (comma seq)
                        </label>
                        <Input
                          required
                          value={productForm.images}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              images: e.target.value,
                            })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          required
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="A beautiful..."
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full mt-4">
                      Create Product
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Edit Product Dialog */}
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          required
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Product Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={productForm.category}
                          onValueChange={(v) =>
                            setProductForm({ ...productForm, category: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "suits",
                              "saree",
                              "lehenga",
                              "readymade",
                              "kurta",
                              "dresses",
                            ].map((c) => (
                              <SelectItem
                                key={c}
                                value={c}
                                className="capitalize"
                              >
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹)</label>
                        <Input
                          required
                          type="number"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="999"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stock</label>
                        <Input
                          required
                          type="number"
                          value={productForm.stock}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              stock: e.target.value,
                            })
                          }
                          placeholder="10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fabric</label>
                        <Input
                          required
                          value={productForm.fabric}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              fabric: e.target.value,
                            })
                          }
                          placeholder="Cotton"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Sizes (comma seq)
                        </label>
                        <Input
                          value={productForm.sizes}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              sizes: e.target.value,
                            })
                          }
                          placeholder="S, M, L"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium">
                          Image URLs (comma seq)
                        </label>
                        <Input
                          required
                          value={productForm.images}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              images: e.target.value,
                            })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          required
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="A beautiful..."
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full mt-4">
                      Save Changes
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Fabric</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="text-sm font-medium truncate max-w-[150px]">
                              {p.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize text-sm">
                          {p.category}
                        </TableCell>
                        <TableCell className="text-sm">
                          ₹{p.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">{p.fabric}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditClick(p)}
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() =>
                                handleDeleteProduct(p.id || (p as any)._id)
                              }
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {tab === "Orders" && (
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="font-display">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="text-sm font-medium">
                          {o._id || o.id}
                        </TableCell>
                        <TableCell className="text-sm">
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleDateString()
                            : o.date}
                        </TableCell>
                        <TableCell className="text-sm">
                          {o.items.length} items
                        </TableCell>
                        <TableCell className="text-sm">
                          ₹{o.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={o.status}
                            onValueChange={(v) =>
                              handleStatusUpdate(o._id || o.id, v)
                            }
                          >
                            <SelectTrigger className="h-8 w-32 rounded-lg text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "placed",
                                "confirmed",
                                "stitching",
                                "shipped",
                                "delivered",
                              ].map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="capitalize text-xs"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
