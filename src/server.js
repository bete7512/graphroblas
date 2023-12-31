import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';        

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '200mb' }));
app.use(cors()); 
app.get('/', (req, res) => {
  res.json({
    congratulation:'You did it '
  })
});

app.post('/:route', async  (req, res) => {
  try {
    console.log("am from trial");
    const handler = require(`./controller/${req.params.route}`);
    console.log('from here handler');
    console.log(await handler);
    if (!handler) {
      return res.status(400).json({
        message: 'path not found',
      });
    }
   handler(req, res);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: 'unexpected error occurred'+e,
    });
  }
});


app.listen(3000, () => {
  console.log('on the moon');
});
