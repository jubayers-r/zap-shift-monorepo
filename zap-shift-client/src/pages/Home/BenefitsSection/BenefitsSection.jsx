import React from "react";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: "/benefits/live-tracking.png", // replace with your image path
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: "/benefits/safe-delivery.png", // replace with your image path
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: "/benefits/support.png", // replace with your image path
  },
];

const BenefitsSection = () => (
  <section className="grid gap-6 my-20">
    <hr className="border-dashed my-20"/>
    {benefits.map((benefit, index) => (
      <BenefitCard key={index} benefit={benefit} />
    ))}
    <hr className="border-dashed my-20"/>

  </section>
);

export default BenefitsSection;