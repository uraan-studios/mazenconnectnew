"use server"
import { db } from "@/lib/db"
import { z } from "zod";
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";

const campusLoginSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required').max(100, 'Email is too long'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(50, 'Password is too long'),
});

export const login = async (data: z.infer<typeof campusLoginSchema>) => {
    const validResult = campusLoginSchema.safeParse(data);
    if (!validResult.success) {
        return {
            errors: validResult.error.flatten().fieldErrors.email?.[0] || "Validation failed.",
        };
    }

    const existingUser = await db.user.findUnique({
        where: {
            email: validResult.data.email,
        },
    });

    if (!existingUser) {
        return {
            errors: "Invalid email or password.",
        };
    }

    const validPassword = await bcrypt.compare(validResult.data.password, existingUser.password);
    if (!validPassword) {
        return {
            errors: "Invalid email or password.",
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    await (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/')
    
}