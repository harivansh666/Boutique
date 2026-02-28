import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Ruler, Package, Heart, LogOut, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useOrderStore } from "@/store/useOrderStore";
import ProductCard from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "measurements", label: "Measurements", icon: Ruler },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

const orderStatusSteps = [
  "placed",
  "confirmed",
  "stitching",
  "shipped",
  "delivered",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, logout, measurements, saveMeasurements } = useAuthStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const navigate = useNavigate();
  const [editMeasurements, setEditMeasurements] = useState(false);
  const [mForm, setMForm] = useState(
    measurements || {
      bust: 0,
      waist: 0,
      hip: 0,
      shoulder: 0,
      armLength: 0,
      height: 0,
    },
  );

  const { orders, fetchUserOrders } = useOrderStore();
  const userOrders = orders;

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSaveMeasurements = () => {
    saveMeasurements(mForm);
    setEditMeasurements(false);
    toast({ title: "Measurements saved!" });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              My Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className="rounded-xl gap-2 shrink-0"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </Button>
          ))}
        </div>

        {/* Profile */}
        {activeTab === "profile" && (
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="font-display">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="font-medium">{user.phone || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Role</label>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Measurements */}
        {activeTab === "measurements" && (
          <Card className="rounded-xl">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display">Saved Measurements</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl gap-1"
                onClick={() => setEditMeasurements(!editMeasurements)}
              >
                <Edit2 className="h-3.5 w-3.5" />{" "}
                {editMeasurements ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(
                  [
                    "bust",
                    "waist",
                    "hip",
                    "shoulder",
                    "armLength",
                    "height",
                  ] as const
                ).map((key) => (
                  <div key={key}>
                    <label className="text-sm text-muted-foreground capitalize">
                      {key === "armLength" ? "Arm Length" : key}
                    </label>
                    {editMeasurements ? (
                      <Input
                        type="number"
                        value={mForm[key]}
                        onChange={(e) =>
                          setMForm({ ...mForm, [key]: Number(e.target.value) })
                        }
                        className="rounded-xl mt-1"
                      />
                    ) : (
                      <p className="font-medium">
                        {mForm[key] ? `${mForm[key]}"` : "Not set"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {editMeasurements && (
                <Button
                  className="mt-4 rounded-xl gap-2"
                  onClick={handleSaveMeasurements}
                >
                  <Save className="h-4 w-4" /> Save
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No orders yet
              </p>
            ) : (
              userOrders.map((order) => {
                const statusIndex = orderStatusSteps.indexOf(order.status);
                return (
                  <Card key={order.id} className="rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div>
                          <p className="text-sm font-semibold">
                            {order._id || order.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : order.date}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-primary">
                          ₹{order.total.toLocaleString()}
                        </p>
                      </div>
                      {/* Progress */}
                      <div className="flex items-center gap-1 mb-2">
                        {orderStatusSteps.map((s, i) => (
                          <div key={s} className="flex items-center flex-1">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                                i <= statusIndex
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {i <= statusIndex ? "✓" : i + 1}
                            </div>
                            {i < orderStatusSteps.length - 1 && (
                              <div
                                className={`flex-1 h-0.5 mx-1 ${i < statusIndex ? "bg-primary" : "bg-border"}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        {orderStatusSteps.map((s) => (
                          <span key={s} className="capitalize">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2 overflow-x-auto">
                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex gap-2 items-center shrink-0 text-xs"
                          >
                            <img
                              src={item.product.images[0]}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span>
                              {item.product.name} ×{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlistItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                Your wishlist is empty
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {wishlistItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
