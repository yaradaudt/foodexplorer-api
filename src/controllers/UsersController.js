class UsersController { // 5 methods to each controller => index (GET), show (GET), Create (POST), Update (PUT), delete (DELETE).
    create(request, response) {
        const { name, email, password } = request.body

        response.json({ name, email, password })
    }
}

module.exports = UsersController