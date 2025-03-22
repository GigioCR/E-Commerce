class AuthController {
    constructor(authRepository){
        this.authRepository = authRepository;
    }

    async signup(req, res) {
        try {
            const { email, full_name, password, phone_number, address } = req.body;
            console.log(email);
            if (!email || !password) {
                return res.status(401).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }
            const userExists = await this.authRepository.userExists(email);
            if (userExists) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists'
                });
            }

            const { user: authUser } = await this.authRepository.signUp(email, password);
   
            const userProfile = await this.authRepository.createUser({
                id: authUser.id,
                full_name,
                phone_number,
                address,
                email
            });

            res.status(201).json({
                message: 'User created successfully',
                user: userProfile
            });

        } catch (error) {
            res.status(400).json({
                message: 'Error creating user',
                error: error.message
            });
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(401).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const data = await this.authRepository.login(email, password);
            
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: data
            });

        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    }

    async logout(req, res) {
        try {
            await this.authRepository.logout();
            res.status(200).json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error during logout'
            });
        }
    }

    async getSession(req, res) {
        try {
            const session = await this.authRepository.getSession();
            
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: 'No active session'
                });
            }

            res.status(200).json({
                success: true,
                data: session
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Error getting session'
            });
        }
    }


}

module.exports = AuthController;