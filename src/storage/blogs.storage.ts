import { Blog } from 'src/blog/entities/blog.entity';

export const blogsStorage: Blog[] = [
    {
        ID: '536a43c8-76cf-4f6a-9ef6-856565142f51',
        title: 'First blog',
        content: 'This is my first blog',
        likes: 10,
        userID: '7957d287-e4ec-472e-938a-a69a4bbfa288'
    },
    {
        ID: '1e3e1f00-0bf2-4f5d-8cd6-366afc08a12e',
        title: 'Second blog',
        content: 'This is my second blog',
        likes: 3,
        userID: '7957d287-e4ec-472e-938a-a69a4bbfa288'
    },
    {
        ID: '1d5ec66c-3a99-4647-8b8d-951544a5471e',
        title: 'Blog about blog',
        content: 'This is my blog about blogs',
        likes: 42,
        userID: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960'
    }
]
