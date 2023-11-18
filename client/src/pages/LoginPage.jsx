import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

const MyForm = () => {
  const handleSubmit = (values) => {
    // Make a POST request using fetch
    fetch("your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:6/12 w-10/12 shadow-3xl">
      <div className="text-black bg-gray-200 text-center py-4 font-bold text-2xl">
          PDF FORGE
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <form className="p-6 md:p-12">
            <div className="flex flex-col items-center text-lg mb-2 md:mb-2">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="bg-gray-200 pl-12 py-1 md:py-2 focus:outline-none w-full "
                placeholder="Username"
              />
            </div>
            <ErrorMessage
              name="username"
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
          </form>
        </Formik>
      </div>
    </div>
  );
};

export default MyForm;
