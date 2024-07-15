export function censoredUser(user) {
    return (censoredUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.rol,
    })
}
