import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from './user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {v4 as uuidv4} from 'uuid'

const userId = uuidv4();
describe('UserController and UserService', () => {
  let controller: UserController;
  let mockUserService={
    createUser : jest.fn(dto=>{
      return {
        id: 1,
        ...dto
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideProvider(UserService).useValue(mockUserService)
    .compile();

    controller = module.get<UserController>(UserController);
  });

  //testing if user controller and services are instantiated
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should create a user', async ()=>{
    expect(await controller.signupUser({name: "Demo", email:"demo@gmail.com"})).toEqual({
      id: expect.any(Number),
      name: "Demo",
      email: "demo@gmail.com"
    })
  })
});
