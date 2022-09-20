import bcrypt from 'bcryptjs'


const users = [
    {
        firstName: 'Admin user',
        lastName: 'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('amigosa123', 10),
        isAdmin: true
    },
    {
        firstName: 'Stoyan',
        lastName: 'Bochukov',
        email: 'stoyan@gmail.com',
        password: bcrypt.hashSync('amigosa123', 10),
        isAdmin: false
    },
    {
        firstName: 'Eva',
        lastName: 'Bochukova',
        email: 'eva@gmail.com',
        password: bcrypt.hashSync('amigosa123', 10),
        isAdmin: false
    },
]

export default users