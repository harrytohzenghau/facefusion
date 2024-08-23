import { CheckIcon } from "@heroicons/react/20/solid";
import Card from "../components/UI/Card";

const freeFeatures = [
  "Up to 3 image uploads",
  "Generate animated video",
  "15-second video exports",
  "Up to 3 videos",
  "Downloads in standard SD resolution (1280 x 720)",
];

const proFeatures = [
  "Unlimited image uploads",
  "Audio upload (optional)",
  "Generate animated video",
  "Customisable video length",
  "Up to 10 videos",
  "Downloads in standard HD resolution (1920 x 1080)",
];

export default function Pricing() {
  return (
    <div className="bg-gradient-to-r from-blue-9 to-white">
      <Card>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Straightforward, No-Gimmick Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Simple, Transparent Pricing: No Hidden Fees, Just Clear and Honest
              Plans.
            </p>
          </div>
          <div className="bg-white drop-shadow-lg mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Fusion Free
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Get Started for Free: Transform your images into lifelike
                talking head videos at No Cost! Perfect for testing the waters
                or small projects, our free plan offers everything you need to
                bring your ideas to life.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-blue-2">
                  What’s included
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-2"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Pay once, own it forever
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      $0
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      SGD / mth
                    </span>
                  </p>
                  <a
                    href="#"
                    className="mt-10 block w-full rounded-md bg-blue-2 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transform transition-all duration-200 ease-in-out"
                  >
                    Subscribe
                  </a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white drop-shadow-lg mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Fusion Pro
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Upgrade to Pro: Unlock the Full Potential of AI Video Creation!
                With our Pro Plan, you gain access to advanced features, higher
                resolution downloads, faster processing, and premium support.
                Perfect for professionals and businesses, this plan empowers you
                to create stunning, lifelike videos that stand out—taking your
                content to the next level.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-blue-2">
                  What’s included
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-2"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Pay once, own it forever
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      $5
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      SGD / mth
                    </span>
                  </p>
                  <a
                    href="#"
                    className="mt-10 block w-full rounded-md bg-blue-2 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transform transition-all duration-200 ease-in-out"
                  >
                    Subscribe
                  </a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
