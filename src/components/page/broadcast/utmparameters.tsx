import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UTMParameter {
  key: string;
  label: string;
  enabled: boolean;
  value: string;
  placeholder: string;
}

const initialUTMParameters: UTMParameter[] = [
  {
    key: "utm_source",
    label: "UTM source (The referrer – eg: Google, Newsletter)",
    enabled: false,
    value: "roi_magnet",
    placeholder: "ROI Magnet",
  },
  {
    key: "utm_medium",
    label: "UTM medium (Marketing medium – eg: cpc, banner, email)",
    enabled: false,
    value: "whatsapp",
    placeholder: "Whatsapp",
  },
  {
    key: "utm_campaign",
    label:
      "UTM campaign name (Product, promo code or slogan – eg: spring_sale)",
    enabled: false,
    value: "test_campaign",
    placeholder: "ABC Broadcast",
  },
  {
    key: "utm_id",
    label: "UTM ID (The ads campaign ID)",
    enabled: false,
    value: "",
    placeholder: "",
  },
  {
    key: "utm_term",
    label: "UTM term (Identify the paid keywords)",
    enabled: false,
    value: "",
    placeholder: "",
  },
];

interface UTMParametersDialogProps {
  children: React.ReactNode;
}

export function UTMParametersDialog({ children }: UTMParametersDialogProps) {
  const [utmParameters, setUtmParameters] = useState<UTMParameter[]>(
    initialUTMParameters
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newParams = [...utmParameters];
    newParams[index].enabled = checked;
    // Clear value if unchecked
    if (!checked) {
      newParams[index].value = "";
    }
    setUtmParameters(newParams);
  };

  const handleInputChange = (index: number, rawValue: string) => {
    // Transform: replace spaces with underscores and convert to lowercase
    const transformedValue = rawValue.toLowerCase().replace(/\s+/g, "_");
    const newParams = [...utmParameters];
    newParams[index].value = transformedValue;
    setUtmParameters(newParams);
  };

  // Compute preview URL: append enabled parameters with a nonempty value.
  const activeParams = utmParameters.filter(
    (p) => p.enabled && p.value.trim() !== ""
  );
  const previewURL =
    "{your_link}" +
    (activeParams.length > 0
      ? "?" +
        activeParams
          .map((p) => `${p.key}=${encodeURIComponent(p.value)}`)
          .join("&")
      : "");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            UTM Parameters
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6 w-full">
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="max-w-3xl p-3 bg-transparent rounded-lg border break-words ">
              {previewURL}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              UTM Parameter Settings
            </h3>
            <div className="space-y-4">
              {utmParameters.map((param, index) => (
                <div
                  key={param.key}
                  className="flex items-start space-x-3 w-full"
                >
                  <Checkbox
                    id={param.key}
                    variant="blue"
                    checked={param.enabled}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange(index, checked)
                    }
                  />
                  <div className="space-y-1.5 w-full">
                    <Label htmlFor={param.key} className="text-base">
                      {param.label}
                    </Label>
                    {["utm_id", "utm_term"].includes(param.key) ? (
                      <></>
                    ) : (
                      <Input
                        placeholder={param.placeholder || "Enter value"}
                        value={param.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="border-blue-500 focus:ring-blue-500 w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="outline">Exit</Button>
          </DialogTrigger>
          <Button>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
