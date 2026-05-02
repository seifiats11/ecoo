import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "credentials", 
            credentials: {
                email: { label: "email", type: "text", placeholder: "email" },
                password: { label: "password", type: "password", placeholder: "password" }
            },

            authorize: async function (cred) {
                const response = await fetch(process.env.NEXT_BASE_URL + "/api/v1/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cred),
                });
                
                const data = await response.json();

                if (response.ok) {
                    const { token, user } = data;
                    
                    const userData: any = jwtDecode(token); 
                    
                    return {
                        id: userData.id,
                        name: user.name,
                        email: user.email,
                        userToken: token 
                    } as any; 
                }

                throw new Error(data.message || "Invalid email or password");
            }
        })
    ],

    jwt: {
        maxAge: 60 * 60 * 24, 
    },

    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.userToken = user.userToken;
                token.id = user.id;
            }
            return token;
        },
        
        session: async ({ session, token }: any) => {
            if (token) {
                session.user.id = token.id;
                session.user.userToken = token.userToken; 
            }
            return session;
        }
    },

    pages: {
        signIn: "/login",   
    }
}