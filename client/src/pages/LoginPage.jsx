import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useUserData } from "../context/UserContext";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants/constant";

const MyForm = () => {
  const router = useNavigate();
  const { user, setUser } = useUserData();

  useEffect(() => {
    if (user) return router("/");
  }, []);

  const handleSubmit = async (values) => {
    // Make a POST request using fetch
    try {
      const response = await fetch(`${BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message);
        setUser(data?.user);
        router("/");
      } else {
        throw new Error(data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong."}`); // Show error message
    }
  };

  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:6/12 w-10/12 shadow-3xl ">
        <div className="text-black bg-gray-200 text-center py-4 font-bold text-2xl">
          PDF FORGE
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
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
          <Form className="p-6 md:p-12">
            <div className="flex flex-col items-center text-lg mb-2 md:mb-2">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                className="bg-gray-200 pl-12 py-1 md:py-2 focus:outline-none w-full "
                placeholder="Email"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />

            <div className="flex flex-col items-center text-lg mb-2 md:mb-2">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="bg-gray-200 pl-12 py-1 md:py-2 focus:outline-none w-full"
                placeholder="Password"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />

            <button
              type="submit"
              className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full"
            >
              Login
            </button>
          </Form>
        </Formik>
        <div className="text-right text-black font-semibold px-2 py-2">
         Don't have an account
          <Link to={"/register"}  className="font-bold p-1">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
