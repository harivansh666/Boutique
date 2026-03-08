import React from "react";

const SewingMachine = () => {
  return (
    <div className="relative aspect-[4/5]  overflow-hidden">
      <img
        src="/banners/sewing_machine.png"
        alt="Sewing Machine"
        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-48 w-full h-1/4 bg-gradient-to-t from-background to-transparent ">
        <h1 className="text-2xl font-bold text-primary">Custom Stitch</h1>
        <p className="text-sm text-muted-foreground">
          Get your outfit tailored to perfection
        </p>
      </div>
    </div>
  );
};

export default SewingMachine;
