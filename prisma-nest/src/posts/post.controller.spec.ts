import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let mockPostService= {}

  //add provider and override it with a mock object
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService]
    }).overrideProvider(PostService).useValue(mockPostService).compile();

    controller = module.get<PostController>(PostController);
  });

  // test wether the controller is instantiated/defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
