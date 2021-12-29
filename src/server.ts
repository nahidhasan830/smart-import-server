import 'dotenv/config';
import { connect } from 'mongoose';
import app from './app';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

(async (): Promise<void> => {
  await connect(`${process.env.DBURI}`);
  console.log('DB Connected!');
})();

const server = app.listen(process.env.PORT, () =>
  console.log('App is listening on port ' + process.env.PORT)
);

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
