"use client";
export const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-bold text-white">
          Ready to transform your finances?
        </h2>
        <p className="mb-10 text-xl text-blue-100">
          Join us and take control of your finance future. Whether you're
          looking to budget better, save more, or invest wisely, we've got you
          covered.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className="transform rounded-xl bg-white px-10 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl"
            onClick={() => {
              window.location.href = "/api/auth/signin";
            }}
          >
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};
