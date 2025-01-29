import { currentUser } from "@clerk/nextjs/server";

export const getUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Authentication failed");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
