import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/shadcn/ui/button";

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing({ auth, menu, plans, subscriptions }) {
  const [frequency, setFrequency] = useState(frequencies[0]);
  console.log(subscriptions);

  return (
    <AuthenticatedLayout user={auth.user} header="Settings" menu={menu}>
      <Head title="Pricing" />
      <div className="bg-white mt-8">
        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Current plan
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              If you choose to downgrade at any point. Your subscription will be
              active until the end of your next billing cycle.
            </p>
            <div>
              {subscriptions.length > 0 ? (
                <div className="mt-4">
                  <div className="flex items-center">
                    <h3 className="mt-4 text-sm leading-5 text-gray-600">
                      You are subscribed to the <b>{subscriptions[0].name}</b>{" "}
                      plan until{" "}
                      <b>
                        {subscriptions[0].ends_at
                          ? new Date(subscriptions[0].ends_at).toLocaleString()
                          : "you cancel your subscription."}
                      </b>
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mt-4 text-sm leading-5 text-gray-600">
                    You are not subscribed to any plan.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:col-span-4">
            {
              // convert plans to array and map
              Object.values(plans).map((tier) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "ring-2 ring-primary"
                      : "ring-1 ring-gray-200",
                    "rounded-3xl p-8 xl:p-10 relative",
                    subscriptions.length > 0 &&
                      subscriptions[0].name === tier.name
                      ? "ring-2 ring-green-500 bg-green-50"
                      : "bg-white"
                  )}
                >
                  {subscriptions.length > 0 &&
                    subscriptions[0].name === tier.name && (
                      <div className="ring-2 ring-green-500 bg-green-50 absolute top-0 left-0 w-full text-center py-1.5 px-4 rounded-3xl bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                        Current plan
                      </div>
                    )}
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.mostPopular ? "text-neutral-600" : "text-gray-900",
                        "text-lg font-semibold leading-8"
                      )}
                    >
                      {tier.publicName}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {tier.price}$
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      {frequency.priceSuffix}
                    </span>
                  </p>
                  {subscriptions.length > 0 &&
                  subscriptions[0].name === tier.name ? (
                    <a
                      href={route("billing-portal")}
                      // href="#"
                      target="_blank"
                      aria-describedby={tier.name}
                      className={classNames(
                        tier.mostPopular
                          ? "bg-primary text-white shadow-sm hover:bg-primary/90"
                          : "text-primary ring-1 ring-inset ring-neutral-200 hover:ring-neutral-300",
                        "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                      )}
                    >
                      Manage plan
                    </a>
                  ) : (
                    <a
                      href={
                        route("subscription-checkout") + "?plan=" + tier.name
                      }
                      // href="#"
                      target="_blank"
                      aria-describedby={tier.name}
                      className={classNames(
                        tier.mostPopular
                          ? "bg-primary text-white shadow-sm hover:bg-primary/90"
                          : "text-primary ring-1 ring-inset ring-neutral-200 hover:ring-neutral-300",
                        "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                      )}
                    >
                      Buy plan
                    </a>
                  )}
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-neutral-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="mt-8 border-b border-gray-900/10 pb-12">
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Payment Method, Billing History & Usage
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Manage your payment method and billing history
          </p>
          <Button className="mt-4">
            <a href={route("billing-portal")} target="_blank">
              Manage Billing
            </a>
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
