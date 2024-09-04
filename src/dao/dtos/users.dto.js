export function censoredUser(user) {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.rol,
    }
}
