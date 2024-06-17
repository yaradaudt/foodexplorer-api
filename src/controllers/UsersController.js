const AppError =  require("../utils/AppError")

class UsersController { // 5 methods to each controller => index (GET), show (GET), Create (POST), Update (PUT), delete (DELETE).
    create(request, response) {
        const { name, email, password } = request.body

        if(!name) {
            throw new AppError("Nome é obrigatório!")
        }

        response.status(201).json({ name, email, password })
    }
}

module.exports = UsersController