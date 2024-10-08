import nodeMailer from 'nodemailer'
import config from '../config/config.js'

//Agregar conexion con el sericio de correo electrónico
const transport = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.email,
        pass: config.emailPassword,
    },
})

export async function sendTicket(ticket) {
    await transport.sendMail({
        from: config.email,
        to: ticket.purchaser,
        subject: 'Confirmacion de compra',
        html: `
        <div>
            <h1>${ticket.purchaser}! Gracias por tu compra!!</h1>
            <div>
                <h2>Monto abonado: $${ticket.amount}</h2>
            </div>
            <div>
                <p>Codigo de compra: ${ticket.code}</p>
                <p>Fecha de compra: ${ticket.purchase_datetime}</p>
            </div>
        </div>
        `,
        attachments: [],
    })
}

export async function sendRecoveryLink(user, link) {
    await transport.sendMail({
        from: config.email,
        to: user.email,
        subject: 'Restablecimiento de contraseña',
        html: `
        <h3>Haga click <a href=${link}>aquí</a> para restablecer su contraseña</h3>
        `,
        attachments: [],
    })
}

export async function sendDeleteConfirmation(user) {
    await transport.sendMail({
        from: config.email,
        to: user.email,
        subject: 'Eliminacion de Cuenta por inactividad',
        html: `
        <h3>Lamentamos informarle que su cuenta fue eliminada por permanecer inactiva</h3>
        `,
        attachments: [],
    })
}

export async function sendAdminDeleteConfirmation(user) {
    await transport.sendMail({
        from: config.email,
        to: user.email,
        subject: 'Su cuenta fue eliminada por el admin',
        html: `
        <h3>Lamentamos informarle que su cuenta fue eliminada por el administrador de la tienda</h3>
        `,
        attachments: [],
    })
}

export async function sendDeleteProductConfirmation(user, product) {
    await transport.sendMail({
        from: config.email,
        to: user.email,
        subject: 'Su producto fue eliminado de la tienda',
        html: `
        <h3>El siguiente producto ha sido eliminado de la tienda</h3>
        <div>
            <p>ID:${product._id}</p>
            <p>CODE:${product.code}</p>
            <p>TITLE:${product.title}</p>
            <p>DESCRIPTION:${product.description}</p>
        </div>
        `,
        attachments: [],
    })
}
