"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useFormik } from "formik";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import postItLogo from "../../assets/images/post-it.png";
import {
  loginValidationSchema,
  loginInitialValues,
  getInputClassName,
} from "../../utils/formHelpers";
import { useLoadCompanies, useLogin } from "../../hooks/useAuth";
import { notify } from "../../utils/notifications";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import type { Company } from "../../types/global";

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: companiesData, isLoading: isLoadingCompanies } =
    useLoadCompanies();
  const { login: loginContext } = useAuth();
  const companies = useMemo(
    () => companiesData?.data || [],
    [companiesData?.data]
  );
  const [selected, setSelected] = useState<Company | null>(null);
  const hasInitialized = useRef(false);

  // Get email and company_id from location state (passed from register page)
  const locationState = location.state as { email?: string; company_id?: number } | null;
  const prefillEmail = locationState?.email || "";
  const prefillCompanyId = locationState?.company_id;

  // Initialize selected company when companies data loads from API
  useEffect(() => {
    if (companies.length > 0 && !hasInitialized.current) {
      // If company_id is provided from register, select that company
      if (prefillCompanyId) {
        const company = companies.find((c) => c.id === prefillCompanyId);
        if (company) {
          setSelected(company);
          hasInitialized.current = true;
        } else {
          // Fallback to first company if not found
          setSelected(companies[0]);
          hasInitialized.current = true;
        }
      } else {
        // Default to first company
        setSelected(companies[0]);
        hasInitialized.current = true;
      }
    }
  }, [companies, prefillCompanyId]);
  
  const formik = useFormik({
    initialValues: {
      ...loginInitialValues,
      email: prefillEmail,
    },
    validationSchema: loginValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!selected) {
        notify("Please select a company", "error");
        return;
      }
      const payload = {
        email: values.email,
        password: values.password,
        company_id: selected.id.toString(),
      };
      login(payload, {
        onSuccess: (data) => {
          loginContext(data.token);
          notify(data.message, "success");
          // Clear location state
          navigate("/dashboard", { replace: true });
        },
        onError: () => {
          notify("Invalid credentials", "error");
          formik.resetForm();
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
          <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Listbox
              value={selected}
              onChange={setSelected}
              disabled={isLoadingCompanies || companies.length === 0}
            >
              <Label className="block text-sm/6 font-medium text-gray-900">
                Select your company
              </Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-600 sm:text-sm/6 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="col-start-1 row-start-1 flex items-center pr-6">
                    <span className="block truncate">
                      {isLoadingCompanies
                        ? "Loading companies..."
                        : selected?.name || "Select a company"}
                    </span>
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
                  {companies.map((company: Company) => (
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-amber-600 hover:text-amber-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
