export const endpoints = {
  user: {
    logIn: `http://localhost:3000/api/auth/users`,
  },
  socket: `${process.env.API_PATH}/socket`,
}

export const envData = {
  port: `${process.env.API_PATH}`
}