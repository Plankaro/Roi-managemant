"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const BroadcastSuccessModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-blue-50">
        <DialogHeader className="text-center">
          <DialogTitle className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-4">
              {/* Circle background */}
              <motion.div
                className="absolute inset-0 bg-green-100 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
              />

              {/* Checkmark circle */}
              <motion.div
                className="absolute inset-0 border-4 border-green-600 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.4,
                }}
              />

              {/* Checkmark */}
              <motion.svg className="absolute inset-0" viewBox="0 0 64 64" initial="hidden" animate="visible">
                <motion.path
                  d="M19 32.5L27 40.5L45 22.5"
                  fill="transparent"
                  stroke="#16a34a"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100,
                    duration: 0.8,
                  }}
                />
              </motion.svg>
            </div>
            <motion.span
              className="text-black"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Broadcast Created Successfully
            </motion.span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-black">Your broadcast message has been sent successfully.</p>

          <Button onClick={() => onOpenChange(false)} className="w-full bg-blue-500 hover:bg-blue-600" variant="default">
            Close
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default BroadcastSuccessModal

