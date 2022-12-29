import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import service from './services/service';
import bodyParser from 'body-parser';

const app: Express = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/messages', (req: Request, res: Response) => {
  res.send(service.getMessages());
});

app.get('/users', (req: Request, res: Response) => {
  res.send(service.getUsers());
});

app.get('/:id', (req: Request, res: Response) => {
  const userId = req.params.id.slice(3);
  res.send(service.getUsersDetails(userId));
});

app.post('/new-message', bodyParser.json(), (req: Request, res: Response) => {
  const newMessage = req.body;
  service.addNewMessage(newMessage);
  res.send('success');
});

app.post('/change-like', bodyParser.json(), (req: Request, res: Response) => {
  service.changeLike(req.body);
  res.send('success');
});
