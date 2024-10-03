const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('./auth.repository');


//function untuk generate token jwt dari user yang melakukan login
function generateToken(user) {
    return jwt.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

async function register(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
        username,
        email,
        password: hashedPassword,
        role: "USER",
        };
        const newUser = await userRepository.createUser(user);
        return newUser;

    } catch (error) {
        throw new Error('Failed to register user');
    }
}

async function login(username, password) { // menangkap username dan password
    
    const user = await userRepository.findUserByUsername(username);
    
    // Validasi
    if (!user) { //kalau user tidak ada
        throw new Error("Invalid username or password");
    }
    

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    //validasi
    if (!isValidPassword) { //mencocokkan password pada database dengan user input (plain)
        throw new Error("Invalid username or password");
    }

    
    const token = generateToken(user); //Memberikan token untuk user jika berhasil login
    return { user,token }; //hasil dari user
    
    }
    
module.exports = { register, login };