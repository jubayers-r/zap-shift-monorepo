import React from "react";
import delivery from "../../../assets/location-merchant.png"

const BannerCard = () => {
  return (
    <div className="bg-[#03373D] rounded-3xl shadow-lg p-20 flex flex-col lg:flex-row items-center justify-between gap-6 bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat">
      {/* Left Side: Text and CTA Buttons */}
      <div className="flex-1 space-y-4 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>
        <p className="text-[#DADADA]">
          We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao Courier delivers your parcels in every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
          <button className="btn bg-[#CAEB66] rounded-full">Become a Merchant</button>
          <button className="btn btn-outline text-[#CAEB66] rounded-full hover:bg-[#CAEB66] hover:text-black">Earn With ZapShift Courier</button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 max-w-sm">
        <img
          src={delivery} // Replace with your actual image path
          alt="Delivery illustration"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default BannerCard;