import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();

  // Get user info
  const { data: currentUser = {}, isLoading: isUserLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  // Get packages
  const { data: packages = [], isLoading: isPackagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  //  handle Update package
  const handleUpgradePackage = (pkg) => {
    // data
    const paymentData = {
      packageId: pkg._id,
      packageName: pkg.name,
      amount: pkg.price,
    };

    axiosSecure.post("/create-payment-session", paymentData).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Payment session failed. Try again!");
      }
    });
  };

  if (isUserLoading || isPackagesLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 md:px-10 py-8 bg-white">
      <title>AssetVerse | Upgrade-Package</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Upgrade Your Package
        </h1>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          Upgrade your subscription to increase employee limit and unlock
          advanced features for your company.
        </p>
      </motion.div>

      {/* Current Package Info */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-base-100 rounded-xl p-6 border border-base-300">
          <h3 className="text-lg font-bold text-secondary mb-2">
            Your Current Plan
          </h3>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Subscription</p>
              <p className="text-xl font-bold capitalize">
                {currentUser?.subscription || "Basic"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Employee Limit</p>
              <p className="text-xl font-bold">
                {currentUser?.currentEmployees || 0}/
                {currentUser?.packageLimit || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => {
          const packageName = pkg.name.toLowerCase();
          const userPlan = currentUser?.subscription?.toLowerCase() || "basic";

          const isBasicPlan = packageName === "basic";
          const isCurrentPlan = packageName === userPlan;

          return (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border p-6 flex flex-col justify-between shadow-sm
                ${
                  isBasicPlan || isCurrentPlan
                    ? "border-amber-600 bg-amber-50"
                    : "border-base-300 bg-base-100"
                }`}
            >
              {/* Package Info */}
              <div>
                <h2 className="text-2xl font-bold text-primary">{pkg.name}</h2>

                <p className="mt-3 text-4xl font-extrabold text-amber-600">
                  ${pkg.price}
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>

                <p className="mt-2 text-gray-500">
                  Up to{" "}
                  <span className="font-semibold">
                    {pkg.employeeLimit} employees
                  </span>
                </p>

                <ul className="mt-5 space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-amber-600">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                {isBasicPlan ? (
                  <button
                    disabled
                    className="btn btn-outline w-full cursor-not-allowed"
                  >
                    Default Plan
                  </button>
                ) : isCurrentPlan ? (
                  <button
                    disabled
                    className="btn btn-outline w-full cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgradePackage(pkg)}
                    className="btn btn-primary w-full"
                  >
                    Upgrade Now
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePackage;
