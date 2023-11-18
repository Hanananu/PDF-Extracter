import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await fetch("your-signup-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful!"); // Show success message
        // Handle other success actions, e.g., redirect to login page
      } else {
        throw new Error(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(`Error: ${error.message || "Something went wrong."}`); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
        <div className="text-black bg-gray-200 text-center py-4 font-bold text-2xl">
          PDF FORGE
        </div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is required";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <form className="p-6 md:p-12">
              <div className="flex flex-col items-center text-lg mb-2 md:mb-4">
                <label htmlFor="username" className="mr-2">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="bg-gray-200 px-2 py-1 md:py-2 focus:outline-none w-full"
                  placeholder="Username"
                />
              </div>
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
              <div className="flex flex-col items-center text-lg mb-2 md:mb-4">
                <label htmlFor="email" className="mr-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-200 px-2 py-1 md:py-2 focus:outline-none w-full"
                  placeholder="Email"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <div className="flex flex-col items-center text-lg mb-2 md:mb-4">
                <label htmlFor="password" className="mr-2">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-200 px-2 py-1 md:py-2 focus:outline-none w-full"
                  placeholder="Password"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />{" "}
              <button
                type="submit"
                className={`bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignupPage;
