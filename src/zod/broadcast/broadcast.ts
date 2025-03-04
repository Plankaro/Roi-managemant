/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BroadcastDetailResult {
  template:any;
    id: string;
    template_name: string;
    name: string;
    total_contact: number;
    type: "PROMOTIONAL" | "TRANSACTIONAL";
    status: "pending" | "completed" | "running";
    template_language: string;
    description: string;
    createdBy?: string | null;
    createdForId?: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    isScheduled: boolean;
    scheduledDate?: string | null; // ISO date string if scheduled
    price: string;
    creator:{
      name:string
    },
    unique_order_created: number;
    reply_count:number;
    // Orders associated with the broadcast, add more fields as needed
    Order: Array<{
      id: string;
      // Add additional Order fields if necessary
    }>;
    utm_campaign: string ;
    utm_source: string ;
    utm_medium: string ;
    unique_interactions: number;
    // Computed statistics from your endpoint:
    totalMessages: number;
    deliveredCount: number;
    sentCount:number;
    readCount: number;
    skippedCount: number;
    failedCount: number;
    skippedReasonGroups: Array<{
      failedReason: string | null;
      count: number;
    }>;
    failedReasonGroups: Array<{
      failedReason: string | null;
      count: number;
    }>;
  }
  