const userList = [
  {
    username: 'admin',
    password: '123',
    role: 'admin',
    introduction: '管理员',
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    email: 'admin@qq.com',
    createTime: 1623318878699
  },
  {
    username: 'editor',
    password: '456',
    role: 'editor',
    introduction: '搬砖码农',
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    email: 'editor@qq.com',
    createTime: 1623328878699
  }
]

const roleList = [
  { name: 'admin', description: '管理员', level: 0 },
  { name: 'editor', description: '编辑人员', level: 1 }
]

const userMockList = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      let flag = -1
      userList.forEach((item, index) => {
        if (item.username === body.username && item.password === body.password) {
          flag = index
        }
      })
      if (~flag) {
        const data = {
          code: 20000,
          message: '登录成功',
          token: new Date().getTime().toString(32),
          ...userList[flag]
        }
        return data
      } else {
        return {
          code: 40000,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 20000,
        message: 'success',
        data: query
      }
    }
  },
  {
    url: '/api/users',
    method: 'get',
    timeout: 500,
    response: () => {
      const list = userList
      return {
        code: 20000,
        message: 'success',
        list
      }
    }
  },
  {
    url: '/api/roles',
    method: 'get',
    response: () => {
      const list = roleList
      return {
        code: 20000,
        message: 'success',
        list
      }
    }
  }
]

export default userMockList
