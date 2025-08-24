import Link from "next/link";

export const NavigationHint = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        Need detailed insights? Check out your
        <Link href="/budget">
          <button className="mx-1 font-medium text-blue-600 hover:text-blue-800">
            Dashboard
          </button>
        </Link>
        or
        <Link href="/Reports?period=month&viewType=overview">
          <button className="mx-1 font-medium text-blue-600 hover:text-blue-800">
            Reports
          </button>
        </Link>
      </p>
    </div>
  );
};
