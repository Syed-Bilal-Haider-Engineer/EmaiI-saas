"use client";
import PricingCard from "@/shared/components/cards/PricingCard";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const Pricing = () => {
  const [active, setActive] = useState("Monthly");

  return (
    <div className="w-full bg-[#fec8eb]">
      <div className="w-[95%] m-auto py-5">
        <div className="w-full md:flex justify-between">
          <div className="p-4">
            <h3 className="text-center lg:text-left uppercase text-cyber-ink text-3xl md:text-7xl lg:text-4xl xl:text-5xl max-w-4xl">
              Pricing
            </h3>
            <p className="text-3xl">Simple. Predictable. Built for you.</p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <Button
              className={`${
                active === "Monthly"
                  ? "bg-[#3843D0] text-white"
                  : "bg-white text-black"
              } rounded-r-none p-7 text-2xl px-16 border border-black`}
              onClick={() => setActive("Monthly")}
            >
              Monthly
            </Button>
            <Button
              className={`${
                active === "Yearly"
                  ? "bg-[#3843D0] text-white"
                  : "bg-white text-black"
              } rounded-l-none p-7 text-2xl px-16 border border-black`}
              onClick={() => setActive("Yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
        <PricingCard active={active} />
      </div>
    </div>
  );
};

export default Pricing;
