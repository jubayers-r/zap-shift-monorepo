import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
// import { warehouses } from "/warehouses"; // Assume JSON is exported from this file
import { useLoaderData } from "react-router";

const AddParcelForm = ({ user }) => {
  const warehouses = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const regions = [...new Set(warehouses.map((w) => w.region))];
  const getServiceCenters = (region) =>
    warehouses.filter((w) => w.region === region).map((w) => w.city);

  const calculateCost = (data) => {
    const isSameCity =
      data.sender_service_center === data.receiver_service_center;
    const weight = parseFloat(data.weight || 0); //why or 0
    let cost = 0;
    let breakdown = "";

    if (data.type === "document") {
      cost = isSameCity ? 60 : 80;
      breakdown = `Document\n${
        isSameCity ? "Within City" : "Outside City"
      }: ৳${cost}`;
    } else {
      if (weight <= 3) {
        cost = isSameCity ? 110 : 150;
        breakdown = `Non-Document (≤3kg)\n${
          isSameCity ? "Within City" : "Outside City"
        }: ৳${cost}`;
      } else {
        const extraKg = weight - 3;
        const base = isSameCity ? 110 : 150;
        const extra = Math.ceil(extraKg) * 40;
        const extraOutside = isSameCity ? 0 : 40; // only for outside city
        cost = base + extra + extraOutside;
        breakdown = `Non-Document (>3kg)\nBase: ৳${base}\nExtra: ৳${extra}\n${
          isSameCity ? "" : "Outside City Fee: ৳40"
        }\nTotal: ৳${cost}`;
      }
    }
    return { cost, breakdown };
  };

  const onSubmit = async (data) => {
    const { cost, breakdown } = calculateCost(data);

    const creation_time = new Date().toISOString();

    const tracking_id = generateTrackingId({
      type: data.type,
      sender: data.sender_service_center,
      receiver: data.receiver_service_center,
      time: creation_time,
    });
    const email = user?.email;

    function generateTrackingId({ type, sender, receiver, time }) {
      const timestamp = new Date(time).getTime().toString(); // milliseconds
      const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

      return `${type.slice(0, 1).toUpperCase()}-${sender
        .slice(0, 3)
        .toUpperCase()}-${receiver
        .slice(0, 3)
        .toUpperCase()}-${timestamp}-${random}`;
    }

    toast.success(`Cost Breakdown:\n${breakdown}`);

    const result = await Swal.fire({
      title: "Proceed with Payment?",
      html: `<pre style="text-align: left">${breakdown}</pre>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Pay",
    });

    if (result.isConfirmed) {
      const parcel = {
        ...data,
        cost,
        creation_time,
        created_by: email,
        tracking_id,
        status: "pending",
      };
      console.log("Saving to DB:", parcel);
      toast.success("Parcel successfully added!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add Parcel</h1>
        <p className="text-gray-500">Please fill out the details below</p>
      </div>

      {/* Parcel Info */}
      <div className="bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
        <div className="flex justify-between items-center  gap-4">
          <div>
            <label className="label">Title</label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">Type:</label>
            <div className="flex gap-6">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
          </div>

          <div>
            <label className="label">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              disabled={parcelType === "document"}
              {...register("weight")}
              className={`input input-bordered w-full ${
                parcelType === "document" ? "bg-gray-100 text-gray-400" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Sender & Receiver */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { role: "Sender", prefix: "sender", regionValue: senderRegion },
          { role: "Receiver", prefix: "receiver", regionValue: receiverRegion },
        ].map(({ role, prefix, regionValue }) => (
          <div key={role} className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{role} Info</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                defaultValue={prefix === "sender" ? user?.name : ""}
                {...register(`${prefix}_name`, { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Contact"
                {...register(`${prefix}_contact`, { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register(`${prefix}_region`, { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register(`${prefix}_service_center`, { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getServiceCenters(regionValue).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Address"
                {...register(`${prefix}_address`, { required: true })}
                className="textarea textarea-bordered w-full"
              />
              <textarea
                placeholder={
                  prefix === "sender"
                    ? "Pickup Instruction"
                    : "Delivery Instruction"
                }
                {...register(`${prefix}_instruction`, { required: true })}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Submit Parcel
        </button>
      </div>
    </div>
  );
};

export default AddParcelForm;
