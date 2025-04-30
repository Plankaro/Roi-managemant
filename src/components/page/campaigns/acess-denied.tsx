import React from 'react';
import { Shield, ArrowLeft, } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AccessDenied: React.FC = () => {
  
  return (
    <div className="min-h-[85vh] bg-backgroundColor flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-transparent border-0 text-white  rounded-xl  overflow-hidden transform transition-all">
        <div className="relative">
          <div className="absolute inset-0 opacity-10 z-0"></div>
          <div className="p-6 relative z-10 flex flex-col items-center">
            <div className="bg-red-100 p-3 rounded-full mb-4 animate-pulse">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 text-center">Access Denied</h1>
            <p className="text-gray-400 text-center mb-6">
              You don&apos;t have permission to access to create or edit campaign. Please contact your business administrator to request access.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full mt-2">
                <Link href={"/campaigns"}>
              <Button 
              
                variant="secondary"
                className="flex items-center justify-center gap-2 "
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              </Link>
              <Button 
               
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600" 
               
              >
              
                Contact Admin
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessDenied;