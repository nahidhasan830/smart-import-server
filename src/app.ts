import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import appError from './utils/appError';
import globalErrorHandler from './controller/errorController';

import siteRoutes from './routes/siteRoutes';

const app = express();

app.use(compression());

//CORS SETTINGS
const whitelist = ['http://localhost:3000', 'https://smart-import.vercel.app/'];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: 'To many requests in a minute'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Data sanitize
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/site', siteRoutes);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
