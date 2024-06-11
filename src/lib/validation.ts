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
  role: z.enum(["buyer","seller"]), 
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


export const drugCreateSchema = z.object({
  drug_name: z.string().min(1,{
    message: "Drug name is required"
  }).max(100),
  description: z.string().min(1,{
    message: "Description is required"
  }).max(500),
  price: z.string().min(1,{
    message: "Price is required"
  }).max(100),
  image: z.any().optional(),
  quantity: z.string().min(1,{
    message: "Quantity is required"
  }).max(100),
  category: z.string().min(1,{
    message: "Category is required"
  }).max(100),
  manufacturer_country: z.string().min(1,{
    message: "Country is required"
  }).max(100),
  manufacturer: z.string().min(1,{
    message: "Manufacturer name is required"
  }).max(100),
  active_substance: z.string().min(1,{
    message: "Active substance is required"
  }).max(100),
  type:z.string().min(1,{
    message: "Type is required"
  }).max(100),
  dozens:z.string().min(1,{
    message: "Dozens is required"
  }).max(100),
  expiration_date: z.string().min(1,{
    message: "Expiration date is required"
  }).max(100),
  brand: z.string().min(1,{
    message: "Brand is required"
  }).max(100),
})