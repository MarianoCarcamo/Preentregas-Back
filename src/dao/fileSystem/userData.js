import fs from 'fs/promises'

const usersFile = './src/db/users.json'
const userNotFound = new Error('Usuario no encontrado')

//Funciones Internas
async function getAllUsers() {
    try {
        const data = await fs.readFile(usersFile, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []
        } else {
            throw error
        }
    }
}

async function nextId() {
    const ids = (await getAllUsers()).map((user) => {
        return user._id
    })
    return isFinite(Math.max(...ids)) ? Math.max(...ids) + 1 : 1
}

//Funciones Externas
export async function createUser(newUser) {
    try {
        let users = await getAllUsers()
        newUser._id = (await nextId()) ?? 1
        users.push(newUser)
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2))
        return newUser
    } catch (error) {
        throw error
    }
}

export async function findUserByEmail(email) {
    try {
        const user = (await getAllUsers()).find((user) => user.email === email)
        if (user) {
            return user
        } else {
            throw userNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function findUserById(id) {
    try {
        const user = (await getAllUsers()).find((user) => user._id === id)
        if (user) {
            return user
        } else {
            throw userNotFound
        }
    } catch (error) {
        throw error
    }
}
