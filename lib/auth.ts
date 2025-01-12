import { Lucia, TimeSpan } from "lucia";
import { adapter } from "@/lib/db";


export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		},
		
	},
	sessionExpiresIn: new TimeSpan(1.5, "h"),
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			fkid: attributes.fkId,
			isSuperUser: attributes.isSuperUser,
			name: attributes.name
		};
	},
	
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
    fkId: number;
	isSuperUser: boolean;
	name: string;
}
