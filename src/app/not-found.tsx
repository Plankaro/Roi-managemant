import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col  ">
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="rounded-full bg-primary p-4">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-red-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Page Not Found</h1>
            <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700"
            >
              Go Home
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  )
}
