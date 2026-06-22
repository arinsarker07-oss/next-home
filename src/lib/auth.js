import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
    emailAndPassword: { 
    enabled: true, 
  }, 
   baseURL: process.env.BETTER_AUTH_URL, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        }, 
    },
 account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"], // add your providers
		},
	},

   user: {
        additionalFields: {
            role: {
                default: "tenant"
            },
        }
    },
    // 🎯 GOOGLE FIX: Intercepts social signups right before MongoDB entry
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // If a user registers via Google/GitHub, client-side input is skipped.
          // This block safely injects your default 'seeker' role into MongoDB.
          if (!user.role) {
            user.role = "tenant"; 
          }
          return {
            data: user,
          };
        },
      },
    },
  },
    
});