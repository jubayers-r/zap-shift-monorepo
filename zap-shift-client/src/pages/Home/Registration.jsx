import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Registration = () => {
  const { createUser } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(res => console.log(res.user))
    .catch(error => console.log(error))
  };

  return (
    <div className="grid gap-2 w-full mx-auto justify-center items-center h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="   rounded-box w-xs ">
        <h3 className="text-5xl font-bold my-4">Create an Account</h3>
        <p>Register With Profast</p>
        <label className="label">Name</label>
        <input
          {...register("Name", { required: true })}
          type="Name"
          className="input"
          placeholder="Name"
        />
        {errors.Name?.type === "required" && (
          <p className="bg-red-400">must need to be putteen</p>
        )}
        <label className="label">Email</label>

        <input
          {...register("email", { required: true })}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="bg-red-400">must need to be putteen</p>
        )}

        <label className="label">Password</label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          className="input"
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="bg-red-400">must need to be putteen</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="bg-red-400">must need to be putteen</p>
        )}
        <button className="btn btn-neutral mt-4 w-full textsta">
          Continue
        </button>
        <p className="text-center">or</p>
        <button className="btn  mt-4 btn-block">Continue With Google</button>
      </form>
    </div>
  );
};

export default Registration;
