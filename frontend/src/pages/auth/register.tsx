"use client";

import { useState } from "react";
import { useFormik } from "formik";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import postItLogo from "../../assets/images/post-it.png";
import {
  getRegisterValidationSchema,
  registerInitialValues,
  getInputClassName,
  companies,
} from "../../utils/formHelpers";
import { useRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { notify } from "../../utils/notifications";

export default function Register() {
  const [selected, setSelected] = useState(companies[0]);
  const [useSubdomain, setUseSubdomain] = useState(false);
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: getRegisterValidationSchema(useSubdomain),
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
        company: useSubdomain ? values.subdomain : selected,
      };
      register(payload, {
        onSuccess: () => {
          notify("Account created successfully", "success");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        },
        onError: () => {
          notify("Account creation failed", "error");
        },
      });
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={postItLogo}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={getInputClassName(
                    formik.touched.name,
                    formik.errors.name
                  )}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={getInputClassName(
                    formik.touched.email,
                    formik.errors.email
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={getInputClassName(
                    formik.touched.password,
                    formik.errors.password
                  )}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={getInputClassName(
                    formik.touched.confirmPassword,
                    formik.errors.confirmPassword
                  )}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="block text-sm/6 font-medium text-gray-900">
                  Company
                </span>
                <button
                  type="button"
                  onClick={() => setUseSubdomain(!useSubdomain)}
                  className="text-sm font-semibold text-amber-600 hover:text-amber-500 cursor-pointer"
                >
                  {useSubdomain ? "Select from list" : "Use subdomain"}
                </button>
              </div>

              {useSubdomain ? (
                <div className="mt-2">
                  <div
                    className={`flex rounded-md bg-white outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 ${
                      formik.touched.subdomain && formik.errors.subdomain
                        ? "outline-red-500 focus-within:outline-red-500"
                        : "outline-gray-300 focus-within:outline-amber-600"
                    }`}
                  >
                    <input
                      id="subdomain"
                      name="subdomain"
                      type="text"
                      placeholder="your-company"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subdomain}
                      className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <span className="flex items-center pr-3 text-gray-500 sm:text-sm">
                      .localhost
                    </span>
                  </div>
                  {formik.touched.subdomain && formik.errors.subdomain && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.subdomain}
                    </p>
                  )}
                </div>
              ) : (
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-600 sm:text-sm/6">
                      <span className="col-start-1 row-start-1 flex items-center pr-6">
                        <span className="block truncate">{selected.name}</span>
                      </span>
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                      {companies.map((company) => (
                        <ListboxOption
                          key={company.id}
                          value={company}
                          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-amber-500 data-focus:text-white data-focus:outline-hidden"
                        >
                          <span className="block truncate font-normal group-data-selected:font-semibold">
                            {company.name}
                          </span>

                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-amber-600 group-not-data-selected:hidden group-data-focus:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-amber-600 hover:text-amber-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
