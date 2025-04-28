import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CampaignNotAvailable() {
  return (
    <div className="w-full h-[calc(100vh-110px)] rounded-sm  flex flex-col items-center justify-center p-4 bg-backgroundColor text-white">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-gray-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Campaign Not Available</h2>
        <p className="text-gray-400 mb-6">The campaign data you&apos;re looking for is currently not available.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/campaigns">
          <Button className="bg-blue-600 hover:bg-blue-700">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
