import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db from './index'
import { User, Provider } from './models'

db.connect(process.env.MONGO_URL)
    .then(() => Provider.deleteMany())  // Elimina los datos previos de proveedores
    .then(() => fs.readFile('./providers.csv', 'utf-8'))  // Leemos el archivo CSV de providers
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [name, email, category, location, services] = line.split(',').map(item => item.trim())

            // Aquí creamos el provider con los campos del CSV
            return Provider.create({
                name,
                email,
                category,
                location,
                services: services.split(';')  // Asumiendo que los servicios están separados por punto y coma
            })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())
