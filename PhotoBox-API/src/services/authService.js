import prisma from "../utils/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerService = async (username, password) => {
    const existingUser = await prisma.user.findUnique({
        where: { username }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
}


export const loginService = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new Error("Username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Wrong password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    return { user, token };
}
