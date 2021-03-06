import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostDTO } from './post.dto';
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


describe('PostController', () => {
  let controller: PostController;
  let mockPostService= {
    updatePost: jest.fn((param)=>{
       posts[param.where.id-1].published = true
       return posts[param.where.id-1]
    }),
    
    posts: jest.fn((param = '')=>{
      if(param==='' || param.where.published ===true) return publishedPost
      let searchedString =param.where.OR[0].title.contains
      return posts.filter(ele=>{
        return ele.title.includes(searchedString) || 
        ele.content.includes(searchedString)
      })
    }),
    post: jest.fn(param=>{
      return posts[param.id]
    }),

    createPost: jest.fn(dto=>{
      return{
        id:1,
        published: false,
        ...dto
      }
    }),

    deletePost: jest.fn(param=>{
      const filtered = posts.filter(ele=>{
        return ele.id !== param.id
      })
      return filtered
    })
  }

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

  it('should get all the posts that are published', async ()=>{
    expect(await controller.getPublishedPosts()).toEqual(
      publishedPost
    )
  })
  it('should get a post by id', async ()=>{
    expect(await controller.getPostById('1')).toEqual(
      posts[1]
    )
  })

  it('should create a post', async ()=>{
    expect(await controller.createDraft({title: "demoTitle", content: 'contentDemo', authorId: '1',})).toEqual({
      id: expect.any(Number),
      title: 'demoTitle',
      content: 'contentDemo',
      published: false,
      authorId: 1
    })
  })

  it('should update post published status', async ()=>{
    // const dto = {content: 'demoContent', title: 'demoTitle', published: false, authorId:1}
    expect(await controller.publishPost('1')).toEqual({
      id: expect.any(Number),
      title: 'title1',
      content: 'content1',
      published: true,
      authorId: 1
    })
  })

  it('should delete a post', async ()=>{
    // const dto = {content: 'demoContent', title: 'demoTitle', published: false, authorId:1}
    expect(await controller.deletePost('1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining(deletedPosts[0]),
        expect.objectContaining(deletedPosts[1])
      ])
    )
  })
  it('should filter out the post with the search string', async ()=>{
    // const dto = {content: 'demoContent', title: 'demoTitle', published: false, authorId:1}
    expect(await controller.getFilteredPosts('1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining(posts[0])
      ])
    )
  })
});
