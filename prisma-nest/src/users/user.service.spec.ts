import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';

const userArray = [{
  id: 1,
  name: 'Demo1',
  email: 'demo1@gmail.com'
}, {
  id: 2,
  name: 'Demo2',
  email: 'demo2@gmail.com'
},{
  id: 3,
  name: 'Demo3',
  email: 'demo3@gmail.com'
}
]
const oneUser = userArray[0]

//mockResolvedValue vs mockReturnValue
const db = {
  user: {
    findUnique: jest.fn().mockResolvedValue(oneUser),
    findMany: jest.fn().mockResolvedValue(userArray),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(userArray[1]),
    delete: jest.fn().mockResolvedValue(oneUser),
  }
}


describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide: PrismaService,
        useValue: db,
      }]
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //not too sure how this work why i have to pass an empty object
  it('should get one user', async ()=>{
    expect(await service.user({id:1})).toEqual(oneUser)
  })
  it('should get all users', async ()=>{
    expect(await service.users({})).toEqual(userArray)
  })
  it('should create a user', async ()=>{
    expect(await service.createUser({
      name: 'Demo1',
      email: 'demo1@gmail.com'
    })).toEqual(oneUser)
  })
  it('should update a user', async ()=>{
    expect(await service.updateUser({
        where: {id:1},
        data: { name: 'Demo2',
      email: 'demo2@gmail.com'} 
      })).toEqual(userArray[1])
  })
  it('should delelte user',async () => {
    expect(await service.deleteUser({})).toEqual(oneUser)
  })

});
