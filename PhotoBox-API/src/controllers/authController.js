import { loginService, registerService } from "../services/authService.js";


export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await registerService(username, password);
        return res.status(201).json({
            message: "Registration successful", user
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { user, token } = await loginService(username, password);
        return res.status(200).json({
            message: "Login successful", token
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};
