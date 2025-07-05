import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const handleView = (id) => {
    navigate(`/dashboard/parcels/${id}`);
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Cost (৳)</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No parcels found.
              </td>
            </tr>
          ) : (
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.title}</td>
                <td className="capitalize">{parcel.type}</td>
                <td>{parcel.cost}৳</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      parcel.status === "pending"
                        ? "badge-warning"
                        : parcel.status === "delivered"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="flex gap-1">
                  <button
                    onClick={() => handleView(parcel._id)}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </button>
                 <button
  onClick={() => handlePay(parcel._id)}
  className="btn btn-xs btn-accent"
  disabled={parcel.status !== "pending"}
>
  {parcel.status === "pending" ? "Pay" : "Paid"}
</button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
