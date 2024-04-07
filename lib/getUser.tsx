import { User } from "@prisma/client";

const  getUser = async (): User => {
    const response = await fetch("/api/auth/user");
    const data = await response.json();
    return data;
}


export default getUser;