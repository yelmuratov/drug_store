import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(1,{
    message: "Username is required"
  }).max(50),
  firstName: z.string().min(1,{
    message: "First Name is required"
  }).max(30),
  lastName: z.string().min(1,{
    message: "Last Name is required"
  }).max(30),
 address: z.string().min(1).max(100)||null,
  email: z.string().email(),
  phone: z.string().min(1).max(15),
  role: z.enum(["admin","buyer","seller"]), 
  password: z.string().min(8,{
    message: "Password must be at least 8 characters"
  }).max(100),
})

export default formSchema