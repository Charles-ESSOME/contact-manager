import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { UserCategory } from '@/types/User';

const phoneRegex = /^6[0-9]{8}$/ // Format: 6XXXXXXXX


const userSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must contain at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Name must contain at least 2 characters..",
  }),
  emails: z.array(z.string().email("AInvalid email address")),
  tel: z.string().regex(phoneRegex, 'Phone must be in format: 6XXXXXXXX'),
category: z.string(z.string().min(2, "Invalid category")),
})


interface UserFormProps {
  onSubmit: (data: UserFormValues) => void
  initialData?: UserFormValues
}


export default function ContactForm({ onSubmit, initialData }: UserFormProps) {

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      emails: [""],
      phones: [""],
      category: UserCategory.VIP
    },
    values: initialData || {
      firstName: "",
      lastName: "",
      emails: [""],
      phones: [""],
      category: UserCategory.VIP

    }
  })

  const addField = (field: "emails" | "phones") => {
    const currentValues = form.getValues(field)
    form.setValue(field, [...currentValues, ""])
  }

  const removeField = (field: "emails" | "phones", index: number) => {
    const currentValues = form.getValues(field)
    if (currentValues.length > 1) {
      form.setValue(
        field,
        currentValues.filter((_, i) => i !== index)
      )
    }
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {initialData ? "Update contact" : "New contact"}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Emails */}
          <div className="space-y-2">
            <FormLabel>Emails</FormLabel>
            {form.watch("emails").map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`emails.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeField("emails", index)}
                  disabled={form.watch("emails").length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addField("emails")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add email
            </Button>
          </div>

          {/* Phones */}
          <div className="space-y-2">
            <FormLabel>Phones</FormLabel>
            {form.watch("phones").map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`phones.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeField("phones", index)}
                  disabled={form.watch("phones").length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addField("phones")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add phone
            </Button>
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))} // Conversion en nombre
                      defaultValue={field.value?.toString()} // Conversion en string pour l'affichage
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(UserCategory).map(([key, value]) => (
                            typeof value !== 'number' && <SelectItem key={key} value={value}>
                              Category {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500">
            {initialData ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}