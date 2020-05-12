module.exports = (app) => {
	app.use('/users', require('./main'));
}