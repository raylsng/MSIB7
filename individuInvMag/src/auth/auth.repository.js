const prisma = require("../db");

async function createUser(userData) {
    try {
        const newUser = await prisma.user.create({ data: userData });
        return newUser;
    } catch (error) {
        throw new Error('Failed to create user in repository');
    }
}

//Kode untuk mencari user di dalam database berdasarkan username
async function findUserByUsername(username) { //mencari
    return prisma.user.findUnique({ where: { username } }); //mengembalikan
    }

    module.exports = { createUser, findUserByUsername };
