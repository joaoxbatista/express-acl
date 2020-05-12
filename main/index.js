const { Router } = require('express') ;
const jwt = require('jsonwebtoken');
const router = Router();
const SECRET_KEY = '412d12312s1-orkljflkaw';
const acl = require('express-acl');
acl.config({
	filename: './acl.json',
	baseUrl: '/'
});

// ============= MIDDLEWARES =====================
// Middleware para simular o usuário autenticado
router.use(async (req, res, next) => {

	const user = {
		id: Math.random().toString(36).substr(2, 12),
		email: 'admin@admin.com',
		password: '123123123',
		role: 'user'
	};

	const token = jwt.sign(user, SECRET_KEY); 
	req.headers['X-Access-Token'] = token; 
	next();
});

// Middleware para verificar se a request possui token
router.use( async (req, res, next) => {
	const token = req.headers['X-Access-Token'];
	if(!token) {
		return res.status(404).end();
	}

	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if(err) {
			return res.status(404).json({ err });
		}
		req.decoded = decoded;
		next();
	});

});

router.use(acl.authorize);

// ============= MIDDLEWARES =====================









router.get('/', async(req, res) => {
	return res.json({msg: 'Hello main route'});
});

router.get('/info', async(req, rest) => {
	return res.json({msg: "Information of user"});
})

module.exports = router;
