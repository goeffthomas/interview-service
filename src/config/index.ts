const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.NODE_ENV === 'development' ? 3004 : 8080,
};

export = config;
