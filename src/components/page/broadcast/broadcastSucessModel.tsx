import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const BroadcastSuccessModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] bg-[#C4CFE5]"
        style={{ backgroundColor: '#C4CFE5' }}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="flex flex-col items-center justify-center">
            <CheckCircle2 className="text-green-600 mb-4" size={64} />
            <span className="text-black">Broadcast Created Successfully</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-black">Your broadcast message has been sent successfully.</p>
          
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full"
            variant="default"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastSuccessModal;