/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Users } from "lucide-react";
import { useGetSegmentsQuery } from "@/store/features/apislice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { isValidPhoneNumber } from "@/lib/isvalidphoneno";
function SelectContactDialog({
  children,
  setSelectedContacts,
  selectContacts,
}: {
  children: React.ReactNode;
  selectContacts: any;
  setSelectedContacts: (data: any) => void;
}) {
  const { data: segments } = useGetSegmentsQuery({});
  const excelbuttonref = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [excelData, setExcelData] = useState<any[]>([]);
  const [validContactsCount, setValidContactsCount] = useState(0);

  const setShopifyContact = (id: string) => {
    setSelectedContacts({
      type: "shopify",
      id,
      total_count: segments.find((segments: any) => segments.id === id)
        ?.totalCount,
    });
    setExcelData([]);
    setFileName("");
  };

  const setExcelContact = (selectedField: string) => {
    const validContacts = excelData.filter((contact) =>
      isValidPhoneNumber(contact[selectedField])
    );
    setSelectedContacts({
      type: "excel",
      data: excelData,
      selectedField,
      validContacts: validContacts,
      total_count: validContacts.length,
    });
  };
  const openExcelUploader = () => {
    if (excelbuttonref.current) {
      excelbuttonref.current.click();
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    setExcelData(jsonData as any[]);
  };

  useEffect(() => {
    if (selectContacts?.type === "excel" && selectContacts.selectedField) {
      const validContacts = excelData.filter((contact) =>
        isValidPhoneNumber(contact[selectContacts.selectedField])
      );
      setValidContactsCount(validContacts.length);
    } else if (selectContacts?.type === "shopify" && segments) {
      const selectedSegment = segments.find(
        (segment: any) => segment.id === selectContacts.id
      );
      setValidContactsCount(selectedSegment ? selectedSegment.totalCount : 0);
    }
  }, [selectContacts, excelData, segments]);

  // const validContacts = excelData.filter(
  //   (contact) => selectedField && isValidPhoneNumber(contact[selectedField])
  // );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-2xl md:p-5 p-3 max-w-[90vw] md:h-[85vh] h-[80vh]  overflow-auto no-scrollbar rounded-sm bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl  font-bold text-blue-800">
            Select Recipients
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="segments" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50 ">
            <TabsTrigger
              value="segments"
              className=" data-[state=active]:bg-blue-600 data-[state=active]:text-white text-black py-2"
            >
              <Users className="w-4 h-4 sm:block hidden" />
              <span className="md:text-base text-xs">Shopify Segments</span>
            </TabsTrigger>
            <TabsTrigger
              value="excel"
              className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 text-black md:text-base text-sm"
            >
              <Upload className="w-4 h-4 sm:block hidden" />
              <span className="md:text-base text-xs">Excel Upload</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="segments" className="mt-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <Input
                  placeholder="Search segments..."
                  className="pl-9 border-blue-200 focus:border-blue-500"
                />
              </div>

              <ScrollArea className="h-[45vh] rounded-md border border-blue-200 sm:p-4">
                <RadioGroup
                  value={selectContacts?.id ?? ""}
                  onValueChange={(value) => setShopifyContact(value)}
                >
                  {segments?.map((segment: any) => (
                    <div
                      key={segment.id}
                      className="flex items-center space-x-2 py-2 px-2 rounded-lg hover:bg-blue-100"
                    >
                      <RadioGroupItem
                        value={segment.id}
                        id={`${segment.id}`}
                        className="text-blue-500"
                      />
                      <Label
                        htmlFor={`${segment.id}`}
                        className="flex-1 flex items-center justify-between cursor-pointer gap-5"
                      >
                        <span className="text-blue-800 md:text-base text-sx sm:text-sm">
                          {segment.name}
                        </span>
                        <span className="sm:text-sm text-blue-500 text-xs flex gap-1">
                          ({segment.totalCount}
                          <span className="sm:block hidden"> members</span>)
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="excel" className="mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-blue-400" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-blue-800">
                      Upload Excel File
                    </p>
                    <p className="text-sm text-blue-600">
                      Drag and drop your Excel file here, or click to browse
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="gap-2 border-blue-300 hover:bg-blue-100 text-blue-700"
                  onClick={openExcelUploader}
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFile}
                  className="hidden"
                  ref={excelbuttonref}
                />
                <p className="text-xs text-blue-500">
                  Supported formats: .xlsx, .xls (max 5MB)
                </p>
              </div>

              {fileName && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-blue-700">
                    Uploaded file: {fileName}
                  </p>

                  <Select
                    onValueChange={(value) => setExcelContact(value)}
                    value={selectContacts?.selectedField}
                  >
                    <SelectTrigger className="w-full border-blue-200">
                      <SelectValue placeholder="Select contact field" />
                    </SelectTrigger>
                    <SelectContent>
                      {excelData.length > 0 &&
                        Object.keys(excelData[0]).map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="rounded-lg border border-blue-200 p-4 bg-blue-50">
                <h3 className="font-medium mb-2 text-blue-800">Requirements</h3>
                <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
                  <li>
                    Phone number should be a valid and start with its country
                    code
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-blue-600">
          {selectContacts?.type === "excel" && (
            <p>Valid contacts to send: {validContactsCount}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <DialogClose asChild>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={validContactsCount === 0 || !selectContacts?.type}
            >
              Confirm Selection
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectContactDialog;
