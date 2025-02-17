import { Clock, Send, Check, CheckCircle2, AlertCircle } from "lucide-react";
import { ReactNode } from "react";

type ChatStatus = "pending" | "sent" | "delivered" | "read" | "failed";

export const getStatusIcon = (status: ChatStatus): ReactNode => {
  const icons: Record<ChatStatus, ReactNode> = {
    pending: <Clock className="h-4 w-4" />,
    sent: <Send className="h-4 w-4" />,
    delivered: <Check className="h-4 w-4" />,
    read: <CheckCircle2 className="h-4 w-4" />,
    failed: <AlertCircle className="h-4 w-4" />,
  };

  return icons[status] || null;
};
