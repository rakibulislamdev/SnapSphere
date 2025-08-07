import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password = watch("password");

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/signup`,
        formData
      );

      if (response.status === 201) {
        const { accessToken, refreshToken, user } = response.data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          setAuth({ accessToken, refreshToken, user });
        }

        toast.success("Your PhotoBooth account has been created successfully.");
        navigate("/edit-profile");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-300 mb-3">
      <h2 className="text-center font-semibold text-gray-500 text-lg mb-4">
        Sign up to see photos and videos from your friends.
      </h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <Field error={errors.email}>
          <input
            {...register("email", { required: "Email Address is required..!" })}
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Email"
            aria-label="Email"
          />
        </Field>

        <Field error={errors.name}>
          <input
            {...register("name", { required: "Full Name is required..!" })}
            type="name"
            id="name"
            name="name"
            className="form-input"
            placeholder="Full Name"
            aria-label="Full Name"
          />
        </Field>

        <Field error={errors.password}>
          <>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                // pattern: {
                //   value:
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //   message:
                //     "Password must contain uppercase, lowercase, number, and special char",
                // },
              })}
              type={showPassword.password ? "text" : "password"}
              id="password"
              name="password"
              className="form-input"
              placeholder="Password"
              aria-label="Password"
            />

            <button
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !showPassword.password,
                }))
              }
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
            >
              {showPassword.password ? "Hide" : "Show"}
            </button>
          </>
        </Field>

        <Field error={errors.confirmPassword}>
          <>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
            />

            <button
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: !showPassword.confirmPassword,
                }))
              }
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
            >
              {showPassword.confirmPassword ? "Hide" : "Show"}
            </button>
          </>
        </Field>

        <p className="text-red-500 text-xs my-1">
          {errors?.root?.random?.message}
        </p>

        {/* Sign Up Button */}
        <div className="mb-2">
          <Field>
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </Field>
        </div>
      </form>
    </div>
  );
}
