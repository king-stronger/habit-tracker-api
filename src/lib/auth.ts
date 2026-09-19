import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { createDb } from "../db/db.js";
import type { Environment } from "../env.js";
import env from "../env.js";

type AuthEnv = Pick<
	Environment,
	"BETTER_AUTH_SECRET" | "BETTER_AUTH_URL" | "DATABASE_URL"
>;

export function createAuth(env: AuthEnv) {
	return betterAuth({
		baseURL: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(createDb(env), {
			provider: "pg",
		}),
		emailAndPassword: {
			enabled: true,
		},
        plugins: [openAPI()]
	});
}

export const auth = createAuth(env);

export type Auth = ReturnType<typeof createAuth>;