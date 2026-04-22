import { prisma } from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userExists) {
        return res
        .status(400)
        .json({
            error: "User already exists with this email"
        });
    }

    // Hash password sent by user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    // Generate JWT token
    const token = generateToken(user.id, res);

    res
    .status(201)
    .json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        },
        token
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user email exists in the table
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return res
        .status(401)
        .json({
            error: "Invalid email or password"
        });
    }

    // Verify the password sent by user
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res
        .status(401)
        .json({
            error: "Invalid email or password"
        });
    }

    // Generate JWT token
    const token = generateToken(user.id, res);

    res
    .status(201)
    .json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email
            },
            token, 
        }
    });
};


export { register, login };