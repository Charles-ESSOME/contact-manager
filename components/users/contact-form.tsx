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
import { UserCategory } from '@/types/User'

const phoneRegex = /^6[0-9]{8}$/ // Format: 6XXXXXXXX

const userSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must contain at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Name must contain at least 2 characters..",
  }),
  emails: z.array(z.string().email("AInvalid email address")),
  // tel: z.string().regex(phoneRegex, 'Phone must be in format: 6XXXXXXXX'),
  phones: z.array(z.string().min(9, "Invalid phone number")),
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
    <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-lg sm:text-xl text-center">
          {initialData ? "Update contact" : "New contact"}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name fields - stack on mobile, grid on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-9 sm:h-10 text-sm sm:text-base" 
                      placeholder="Enter first name"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-9 sm:h-10 text-sm sm:text-base" 
                      placeholder="Enter last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Emails */}
          <div className="space-y-2">
            <FormLabel className="text-sm sm:text-base">Emails</FormLabel>
            {form.watch("emails").map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`emails.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          className="h-9 sm:h-10 text-sm sm:text-base" 
                          placeholder="email@example.com"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                  onClick={() => removeField("emails", index)}
                  disabled={form.watch("emails").length === 1}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-8 sm:h-9 mt-1"
              onClick={() => addField("emails")}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add email
            </Button>
          </div>

          {/* Phones */}
          <div className="space-y-2">
            <FormLabel className="text-sm sm:text-base">Phones</FormLabel>
            {form.watch("phones").map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`phones.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel" 
                          className="h-9 sm:h-10 text-sm sm:text-base" 
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                  onClick={() => removeField("phones", index)}
                  disabled={form.watch("phones").length === 1}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-8 sm:h-9 mt-1"
              onClick={() => addField("phones")}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add phone
            </Button>
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)} // Conversion en nombre
                      defaultValue={field.value?.toString()} // Conversion en string pour l'affichage
                    >
                      <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* {Object.entries(UserCategory).map(([key, value], i) => (
                            typeof value !== 'number' && <SelectItem key={i} value={'VIPi '}>
                              Category {value}
                            </SelectItem>
                          ))} */}
                          <SelectItem value={'VIP'} className="text-sm sm:text-base">
                            Category VIP
                          </SelectItem>
                          <SelectItem value={'CLASSIC'} className="text-sm sm:text-base">
                            Category CLASSIC
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 h-9 sm:h-10 text-sm sm:text-base"
            >
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
