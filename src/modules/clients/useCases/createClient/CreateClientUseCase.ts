import {prisma} from "../../../../database/prismaClients";
import {hash} from "bcrypt"

interface ICreateClient{
    username: string;
    password: string
}

export class CreateClientUseCase {
    async execute({password,username}: ICreateClient){
  //validar se o usuario existe
  const clientExist = await prisma.clients.findFirst({
    where:{
        username: {
           mode:"insensitive"
        }
    }
  })

  if(clientExist){
    throw new Error("Client already exists")
  }

  const hashPassword = await hash(password,10);
  // criptografar a senha 

  //salvar cliente
 const client = await prisma.clients.create({
    data: {
        username,
        password : hashPassword,
    }
  })

 return client;

    }
}