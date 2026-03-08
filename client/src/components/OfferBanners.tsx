import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    image: "/banners/season_sale.png",
    title: "Season Sale",
    subtitle: "Up to 50% Off",
    link: "/shop",
    color: "bg-orange-50",
  },
  {
    id: 2,
    image: "/banners/new_arrivals.png",
    title: "New Arrivals",
    subtitle: "Latest Collections",
    link: "/shop",
    color: "bg-blue-50",
  },
  {
    id: 3,
    image: "/banners/festive_special.png",
    title: "Festive Special",
    subtitle: "Limited Edition",
    link: "/shop",
    color: "bg-rose-50",
  },
];

const OfferBanners = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative border-1 border-primary overflow-hidden rounded-2xl h-48 ${offer.color} border border-border/50 shadow-sm hover:shadow-md transition-all`}
            >
              <div className="absolute inset-0 z-0 ">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {offer.title}
                </h3>
                <p className="text-sm text-foreground/80 mb-3">
                  {offer.subtitle}
                </p>
                <Link
                  to={offer.link}
                  className="inline-flex items-center text-xs font-semibold text-primary gap-1 group/btn"
                >
                  Shop Now
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferBanners;
