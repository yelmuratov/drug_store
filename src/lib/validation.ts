import { z } from "zod"

export const formSchema = z.object({
  username: z.string().min(1,{
    message: "Username is required"
  }).max(50),
  first_name: z.string().min(1,{
    message: "First Name is required"
  }).max(30),
  last_name: z.string().min(1,{
    message: "Last Name is required"
  }).max(30),
 address: z.string().min(0).max(100).optional(),
  email: z.string().email(),
  phone: z.string().min(1).max(15),
  role: z.enum(["admin","buyer","seller"]), 
  password: z.string().min(8,{
    message: "Password must be at least 8 characters"
  }).max(100),
})

export const loginSchema = z.object({
  username: z.string().min(1,{
    message: "Username is required"
  }).max(50),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters"
  }).max(100),
})
