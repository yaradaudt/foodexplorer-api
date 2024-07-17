const { hash, compare } = require("bcryptjs")
const AppError =  require("../utils/AppError")
const knex = require("../database/knex")

function validatePasswordLength(password) {
    if(password.length < 6) {
        throw new AppError("A senha precisa ter no mínimo 6 caracteres.")
    }
}

class UsersController { // 5 methods to each controller => index (GET), show (GET), Create (POST), Update (PUT), delete (DELETE).
    async create(request, response) {
        const { name, email, password } = request.body

        const checkUserExists = await knex("users").where({ email })

        if(checkUserExists.length > 0){
            throw new AppError("Este e-mail já está em uso.")
        }

        validatePasswordLength(password)

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({ name, email, password: hashedPassword })

        return response.status(201).json()
    }

    //ATUALIZAR DE ACORDO COM O USO DO KNEX COMO DATABASE AO INVES DO SQLITE NA CRIAÇÃO DAS TABELAS


    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id  = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if(!user) {
            throw new AppError("Usuário não encontrado.")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password) {
            validatePasswordLength(password)

            if(!old_password) {
                throw new AppError("Você precisa informar a senha antiga para definir uma nova senha.")
            }

            const checkOldPassword = await compare(old_password, user.password)
        
            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        }

        if (is_admin !== undefined) {
            if (!user.is_admin && user.id !== request.user.id) {
                throw new AppError("Você não tem permissão para atualizar o campo 'is_admin'.", 403)
            }

            user.is_admin = is_admin
        } else {
            user.is_admin = user.is_admin
        }  
        
        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?, 
        password = ?,
        is_admin = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`, 
        [user.name, user.email, user.password, user.is_admin, user_id])

        return response.json()
    }
}

module.exports = UsersController