import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// export type LoginForm = {
//   email: string;
//   password: string;
// };

// cara praktis
export type LoginForm = z.infer<typeof loginSchemaForm>;
