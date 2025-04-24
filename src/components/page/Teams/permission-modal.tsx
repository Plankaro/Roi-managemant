/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUpdateTeamMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"

const permissionSchema = z.object({
  ManageBroadcast: z.boolean(),
  manageTeam: z.boolean(),
  manageCampaign: z.boolean(),
  assignChat: z.boolean(),
})

type PermissionFormValues = z.infer<typeof permissionSchema>

interface PermissionModalProps {
  isOpen: boolean
  onClose: () => void
  teamId: string
  initialData: {
    ManageBroadcast: boolean
    manageTeam: boolean
    manageCampaign: boolean
    assignChat: boolean
    name: string
  }
}

export function PermissionModal({ isOpen, onClose, teamId, initialData }: PermissionModalProps) {
  const [updateTeam] = useUpdateTeamMutation()

  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      ManageBroadcast: initialData.ManageBroadcast,
      manageTeam: initialData.manageTeam,
      manageCampaign: initialData.manageCampaign,
      assignChat: initialData.assignChat,
    },
  })

  const onSubmit = async (data: PermissionFormValues) => {
    try {
      const promise = updateTeam({ id: teamId, body: data }).unwrap()
      toast.promise(promise, {
        loading: "Updating permissions...",
        success: "Permissions updated successfully!",
        error: (error: any) => error?.data?.message || "An unexpected error occurred.",
      })
      await promise
      onClose()
    } catch (error) {
      console.error("Error updating permissions:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A1B] border border-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Permissions</DialogTitle>
          <DialogDescription className="text-gray-400">Update permissions for {initialData.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              {/* Broadcasting Permissions */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Broadcasting Permissions</h3>
                <p className="text-sm text-gray-300">
                  Enable this user to send mass messages or announcements to multiple recipients at once.
                </p>
                <FormField
                  control={form.control}
                  name="ManageBroadcast"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        value={field.value ? "create" : "view"}
                        onValueChange={(value) => field.onChange(value === "create")}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="create" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">Create</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="view" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">View Only</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              {/* Team Management */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Team Management</h3>
                <p className="text-sm text-gray-300">
                  Control user permissions (view only, add, edit, or remove team members.)
                </p>
                <FormField
                  control={form.control}
                  name="manageTeam"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        value={field.value ? "manage" : "view"}
                        onValueChange={(value) => field.onChange(value === "manage")}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="view" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">View</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="manage" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">Manage Teams</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              {/* Campaign Management */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Campaign Management</h3>
                <p className="text-sm text-gray-300">Allow the user to create and manage mass messaging campaigns.</p>
                <FormField
                  control={form.control}
                  name="manageCampaign"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        value={field.value ? "create" : "view"}
                        onValueChange={(value) => field.onChange(value === "create")}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="create" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">Create</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="view" className="text-blue-600" />
                          </FormControl>
                          <FormLabel className="font-normal text-white">View Only</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              {/* Assign Chat */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Assign Chat</h3>
                <p className="text-sm text-gray-300">
                  Allow the user to manage chat assignments and user communication settings.
                </p>
                <FormField
                  control={form.control}
                  name="assignChat"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
