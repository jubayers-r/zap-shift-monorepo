import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const LogIn = () => {
  const { user, login } = useAuth();

  const location = useLocation();
  console.log(location);
  const from = location.state.from;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(from) || "/";
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="grid gap-2 w-full mx-auto justify-center items-center h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="   rounded-box w-xs ">
        <h3 className="text-5xl font-bold my-4">Welcome Back</h3>
        <p>Login With Profast</p>
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

export default LogIn;
