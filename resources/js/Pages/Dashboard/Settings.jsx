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
const tiers = [
  {
    name: "Basic",
    id: "tier-100",
    href: "#",
    price: { monthly: "50 EUR", annually: "$144" },
    description: "The essentials to provide your best work for clients.",
    features: ["100 requests"],
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-500",
    href: "#",
    price: { monthly: "250 EUR", annually: "$288" },
    description: "A plan that scales with your rapidly growing business.",
    features: ["500 requests"],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-1000",
    href: "#",
    price: { monthly: "450 EUR", annually: "$576" },
    description: "Dedicated support and infrastructure for your company.",
    features: ["1000 requests"],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing({ auth, menu }) {
  const [frequency, setFrequency] = useState(frequencies[0]);

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
          </div>

          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:col-span-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-primary"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8 xl:p-10"
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-neutral-600" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
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
                    {tier.price[frequency.value]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <a
                  //   href={route("product-checkout") + "?product=" + tier.id}
                  href="#"
                  target="_blank"
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-primary text-white shadow-sm hover:bg-primary/90"
                      : "text-primary ring-1 ring-inset ring-neutral-200 hover:ring-neutral-300",
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                  )}
                >
                  Buy plan
                </a>
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
            ))}
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
          <Button className="mt-4">Manage Billing</Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
