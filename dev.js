const app = require('./src/main');

const PORT = process.env.APP_DEV_PORT || 3000;

app.listen(PORT, () => {
    console.info(`App initialized on port ${PORT}`)
})