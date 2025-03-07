"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { advanceFiltersSchema } from "@/zod/broadcast/form";
import { z } from "zod";
import { DialogClose } from "@radix-ui/react-dialog";

export function AudienceFilteringDialog({
  children,
  filters,
  setFilters,
}: {
  children: React.ReactNode;
  filters: z.infer<typeof advanceFiltersSchema>;
  setFilters: React.Dispatch<
    React.SetStateAction<z.infer<typeof advanceFiltersSchema>>
  >;
}) {
  const NumberInput = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (val: number) => void;
  }) => (
    <div className="flex items-center">
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 rounded-full bg-[#4F75E8]/10 hover:bg-[#4F75E8]/20 border-0"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <span className="text-lg text-[#4F75E8]">-</span>
      </Button>
      <span className="w-8 text-center text-sm">{value}</span>
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 rounded-full bg-[#4F75E8]/10 hover:bg-[#4F75E8]/20 border-0"
        onClick={() => onChange(Math.min(999, value + 1))}
      >
        <span className="text-lg text-[#4F75E8]">+</span>
      </Button>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-[80vw] bg-gradient-to-b bg-blue-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Audience Filtering Options
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Skip Inactive Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skip Inactive Contacts</h3>
            <div className="flex items-start space-x-3">
              <Checkbox
                variant="blue"
                checked={filters.skipInactiveContacts.enabled}
                onCheckedChange={(checked) => {
                  const newFilters = {
                    ...filters,
                    skipInactiveContacts: {
                      ...filters.skipInactiveContacts,
                      enabled: checked as boolean,
                    },
                  };
                  setFilters(newFilters);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <Label className="text-gray-600">
                  Skip contacts who haven&apos;t engaged with WhatsApp in the last:
                </Label>
                <div className="flex items-center space-x-2 mt-2">
                  <NumberInput
                    value={filters.skipInactiveContacts.days || 0}
                    onChange={(val) => {
                      const newFilters = {
                        ...filters,
                        skipInactiveContacts: {
                          ...filters.skipInactiveContacts,
                          days: val,
                        },
                      };
                      setFilters(newFilters);
                    }}
                  />
                  <span className="text-gray-600">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Limit Marketing Messages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Limit Marketing Messages</h3>
            <div className="flex items-start space-x-3">
              <Checkbox
                variant="blue"
                checked={filters.limitMarketingMessages.enabled}
                onCheckedChange={(checked) => {
                  const newFilters = {
                    ...filters,
                    limitMarketingMessages: {
                      ...filters.limitMarketingMessages,
                      enabled: checked as boolean,
                    },
                  };
                  setFilters(newFilters);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <Label className="text-gray-600">
                  Skip contacts who have already received:
                </Label>
                <div className="flex items-center space-x-2 mt-2">
                  <NumberInput
                    value={filters.limitMarketingMessages.maxMessages || 0}
                    onChange={(val) => {
                      const newFilters = {
                        ...filters,
                        limitMarketingMessages: {
                          ...filters.limitMarketingMessages,
                          maxMessages: val,
                        },
                      };
                      setFilters(newFilters);
                    }}
                  />
                  <span className="text-gray-600">messages in the last</span>
                  <NumberInput
                    value={filters.limitMarketingMessages.timeRange || 0}
                    onChange={(val) => {
                      const newFilters = {
                        ...filters,
                        limitMarketingMessages: {
                          ...filters.limitMarketingMessages,
                          timeRange: val,
                        },
                      };
                      setFilters(newFilters);
                    }}
                  />
                  <Select
                    value={filters.limitMarketingMessages.timeUnit}
                    onValueChange={(val) => {
                      const newFilters = {
                        ...filters,
                        limitMarketingMessages: {
                          ...filters.limitMarketingMessages,
                          timeUnit: val,
                        },
                      };
                      setFilters(newFilters);
                    }}
                  >
                    <SelectTrigger className="w-[110px] bg-[#EEF2FF] border-0 rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">minutes</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                      <SelectItem value="days">days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Avoid Duplicate Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Avoid Duplicate Contacts</h3>
            <div className="flex items-center space-x-3">
              <Checkbox
                variant="blue"
                checked={filters.avoidDuplicateContacts.enabled}
                onCheckedChange={(checked) => {
                  const newFilters = {
                    ...filters,
                    avoidDuplicateContacts: {
                      ...filters.avoidDuplicateContacts,
                      enabled: checked as boolean,
                    },
                  };
                  setFilters(newFilters);
                }}
              />
              <Label className="text-gray-600">
                Skip if duplicate contacts are found.
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-8">
              Proceed
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
