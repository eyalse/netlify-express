const app = require('./express/server').default;

app.listen(3000, () => console.log('Local app listening on port 3000!'));
