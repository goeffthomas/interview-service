import express from 'express';
import helmet from 'helmet';
import noCache from 'nocache';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import { port } from './config';

export const app = express();

app.use(helmet());
app.use(noCache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use(cors());
app.use('/', routes);

// This "initialized" dance is only needed for tests. The callback is only called once upon actual startup.
let initialized = false;

export default () => {
	if (!initialized) {
		app.listen(port, () => {
			console.log(`Running on port ${port}`);
		});
		initialized = true;
	}
	return app;
};
