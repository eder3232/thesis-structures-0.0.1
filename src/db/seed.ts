import { insertAplication } from './functions/aplications/aplications'
import { insertUser } from './functions/users/users'
import { INewAplication, INewUser } from './schema'

const newUsers: INewUser[] = [
  {
    name: 'eder',
    email: 'eldebar.dk@gmail.com',
    image:
      'https://yt3.ggpht.com/U04RZrD6ZF_78SnJwGHJauNN0XcoThmHUJQzAl9DZv9c2tKoqcLVUi05aqDV9uPJPJIEkwuJLw=s88-c-k-c0x00ffffff-no-rj',
  },
]

const newAplications: INewAplication[] = [
  {
    name: 'Resortes',
    description: 'Aplicacion para resolver sistemas de un grado de libertad.',
    price: 10,
    type: 'free',
  },
  {
    name: 'Armaduras2D',
    description:
      'Aplicacion para resolver sistemas armaduras en dos dimensiones con dos grados de libertad.',
    price: 10,
    type: 'free',
  },
  {
    name: 'Armaduras3D',
    description:
      'Aplicacion para resolver sistemas armaduras en tres dimensiones con tres grados de libertad.',
    price: 10,
    type: 'free',
  },
  {
    name: 'Vigas',
    description:
      'Aplicacion para resolver sistemas de vigas en dos dimensiones con un grado de libertad.',
    price: 10,
    type: 'free',
  },
]

async function main() {
  console.log('Inserting users')
  for (const user of newUsers) {
    console.log('Inserting user', user)
    await insertUser(user)
  }

  console.log('Inserting aplications')
  for (const aplication of newAplications) {
    console.log('Inserting aplication', aplication)
    await insertAplication(aplication)
  }
  console.log('Done')
}

main()
