export function censoredUser(user) {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.rol,
    }
}

export function importantDataUser(user) {
    return {
        first_name: user.first_name,
        last_name: user.last_name ?? 'N/A',
        email: user.email ?? 'N/A',
        rol: user.rol,
        last_connection: user.last_connection,
    }
}
