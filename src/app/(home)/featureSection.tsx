import { BarChart3, Bell, Lock, Smartphone, Target, Zap } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Get detailed insights into your spending patterns with beautiful charts and reports.",
      color: "blue",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description:
        "Set savings goals and track your progress with visual indicators and milestones.",
      color: "green",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Get notified when you're approaching budget limits or unusual spending patterns.",
      color: "purple",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description:
        "Your financial data is protected with encryption and secure cloud storage.",
      color: "red",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Optimized for mobile with offline sync, so you can track expenses anywhere.",
      color: "indigo",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Add transactions in seconds with smart categorization and receipt scanning.",
      color: "yellow",
    },
  ];
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Everything you need to manage your money
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Powerful features designed to make budgeting simple, insightful, and
            actually enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                    feature.color === "blue"
                      ? "bg-blue-100"
                      : feature.color === "green"
                        ? "bg-green-100"
                        : feature.color === "purple"
                          ? "bg-purple-100"
                          : feature.color === "red"
                            ? "bg-red-100"
                            : feature.color === "indigo"
                              ? "bg-indigo-100"
                              : "bg-yellow-100"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      feature.color === "blue"
                        ? "text-blue-600"
                        : feature.color === "green"
                          ? "text-green-600"
                          : feature.color === "purple"
                            ? "text-purple-600"
                            : feature.color === "red"
                              ? "text-red-600"
                              : feature.color === "indigo"
                                ? "text-indigo-600"
                                : "text-yellow-600"
                    }`}
                  />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
