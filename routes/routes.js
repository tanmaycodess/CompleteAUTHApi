import signUpRouter from './signUp.routes.js'
import loginRouter from './login.routes.js'

const routes = (app) => {
    app.use('/api/v1/signinauth' , signUpRouter)
    app.use('/api/v1/loginauth' , loginRouter)
}

export default routes