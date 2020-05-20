const express=require('express');
const bp=require('body-parser');
const linkRoute=require('./controllers/link')

const app=express();

app.set('view engine','ejs')

app.use(bp.urlencoded({extended: true}));
app.use(express.static('./assets'))

app.get('/',linkRoute.gethome);
app.post('/link',linkRoute.createlink);
app.get('/:id',linkRoute.getlink);

app.listen(8000,()=>{console.log('connected')})

