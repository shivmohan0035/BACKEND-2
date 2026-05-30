const express = require('express');

//importing routes --->server ko pata kara raha hu API create ho gyi hai  or ---> API connect kar raha hu server se
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/post.routes');
const cookieParser=require('cookie-parser'); //cookie parser is used for parsing cookies in the request and response objects.It contains token in cookies and we can easily access it in our API using cookie parser middleware


const app = express();

app.use(express.json());

app.use(cookieParser()); //cookie parser middleware use kar raha hu jisse hum cookies ko easily access kar sakege apne API me

//jo bhi API banegi uska prefix--> /api/auth hoga  or uske baad jo bhi API banegi wo chalegi  for example /register API banayi hai to uska complete path hoga--> /api/auth/register
app.use('/api/auth', authRoutes); //auth.routes.js ke API ko use karege
app.use('/api/posts', postRoutes); //post.routes.js ke API ko use karege








module.exports = app;