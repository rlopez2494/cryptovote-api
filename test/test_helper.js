const mongoose = require('mongoose')

before((done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/cryptovote_test', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
});

beforeEach((done) => {
    const { users, candidates, plates } = mongoose.connection.collections

    Promise.all([users.drop(), candidates.drop(), plates.drop()])
        .then(() => done())
        .catch(() => done())

});