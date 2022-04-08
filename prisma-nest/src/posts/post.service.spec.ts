import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PostService } from './post.service';

const authors =[
  {id: 1,
  name: 'name1',
  email: 'email1'},
  {id: 2,
  name: 'name2',
  email: 'email2'}
]
const posts = [
  {id:1, 
  title: 'title1',
  content: 'content1',
  published: false,
  authorId: 1},
  
  {id:2, 
  title: 'title2',
  content: 'content2',
  published: true,
  authorId: 2},
  
  {id:3, 
  title: 'title3',
  content: 'content3',
  published: false,
  authorId: 2
}]

const deletedPosts = [
  {id:2, 
  title: 'title2',
  content: 'content2',
  published: true,
  authorId: 2},
  
  {id:3, 
  title: 'title3',
  content: 'content3',
  published: false,
  authorId: 2
  }
]

const publishedPost = [
  {id:2, 
  title: 'title2',
  content: 'content2',
  published: true,
  authorId: 2
}]
const db = {
  post: {
    findUnique: jest.fn().mockResolvedValue(posts[0]),
    findMany: jest.fn().mockResolvedValue(posts),
    findFirst: jest.fn().mockResolvedValue(posts[0]),
    create: jest.fn().mockReturnValue(posts[0]),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(publishedPost),
    delete: jest.fn().mockResolvedValue(posts[0]),
  }
}

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, {
        provide: PrismaService,
        useValue: db
      }],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   //not too sure how this work why i have to pass an empty object
  it('should get one post', async ()=>{
    expect(await service.post({id:1})).toEqual(posts[0])
  })
  it('should get all posts', async ()=>{
    expect(await service.posts({})).toEqual(posts)
  })
  it('should create a post', async ()=>{
    expect(await service.createPost({
      id:1, 
      title: 'title1',
      content: 'content1',
      authorId: 1,
    })).toEqual(posts[0])
  })
  it('should update a post', async ()=>{
    expect(await service.updatePost({
        where: {id:1},
        data: { } 
      })).toEqual(publishedPost)
  })
  it('should delelte post',async () => {
    expect(await service.deletePost({id: 1})).toEqual(posts[0])
  })

});
