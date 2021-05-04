import config from './config';
import startExpressApp from './express-app';

const {
	env,
} = config;

console.log(`env: ${env}`);
process.on('uncaughtException', (err: Error) => {
	console.log(err);
	process.exit(1);
});

startExpressApp();
