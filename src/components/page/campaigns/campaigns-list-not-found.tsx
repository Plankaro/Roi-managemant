


export default function CampaignsNotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col bg-backgroundColor">
      <div className="flex flex-1">
 
    
        
          <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-red-500/10 p-4">
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
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Campaign Not Found</h1>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                No Campaign&quot;s found
                </p>
              </div>
             
            </div>
          </div>
       
      </div>
    </div>
  )
}
