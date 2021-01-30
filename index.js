const server =  require('./api/server')

const PORT = process.env.PORT || 5000;

if (!module.parent) {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
      });}
    module.exports = server

// server.listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
// })