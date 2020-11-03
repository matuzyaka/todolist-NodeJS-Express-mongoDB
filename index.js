const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars')
const todoRotes = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRotes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://Denis:wDSwKFi3wpfKrbL@cluster0.rcuaf.mongodb.net/todos',
            {
            useNewUrlParser: true,
            useFindAndModify: false, 
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}


start()