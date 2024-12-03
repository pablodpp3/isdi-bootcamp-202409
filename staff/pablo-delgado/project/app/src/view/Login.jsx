import { PasswordInput, Input, Button, Form, Field, Label } from './library'



import { errors } from 'com'

const { SystemError } = errors



export default function Login(props) {
    console.log('Login -> render')



    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: email }, password: { value: password } } } = event

        try {
            logic.loginUser(email, password)
            .then(() => {
                event.target.reset()

                props.onLoggedIn()
            })
            .catch(error => {
                if (error instanceof SystemError)
                    alert('Sorry, try again later.')
                else 
                    alert(error.message)

                    console.error(error)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
    
    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="text" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <a href="" onClick={handleRegisterClick}>Register</a>
    </main>
}