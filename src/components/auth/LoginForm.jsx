import { useState } from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          setAuth({ accessToken, refreshToken, user });
          navigate(from, { replace: true });
        }
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User email ${formData.email} is not found`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field error={errors.email}>
        <input
          {...register("email", { required: "Email Address is required..!" })}
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="Phone number, username, or email"
          aria-label="Phone number, username, or email"
        />
      </Field>

      <Field error={errors.password}>
        <>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-input"
            placeholder="Password"
            aria-label="Password"
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </>
      </Field>

      <div className="mb-4">
        <Field>
          <button type="submit" className="login-button">
            Log in
          </button>
        </Field>
      </div>

      <p className="text-red-500 text-xs mt-1">
        {errors?.root?.random?.message}
      </p>

      <div className="or-separator">OR</div>
      <div className="mb-4">
        <Field>
          <button className="login-button">Log in with Google</button>
        </Field>
      </div>
    </form>
  );
}
