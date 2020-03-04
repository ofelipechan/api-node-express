/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const user = require('./../../src/services/userService');
const userRepository = require('./../../src/repositories/userRepository');

function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

describe('USER', () => {
	describe('CHECK USER', () => {
		let sandbox;
		const fakeUser = {
			email: 'fake@fake.com',
			password: 'fakepass'
		};

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(userRepository, 'findOne').callsFake((params) => {
				if (params.email === fakeUser.email) {
					const response = {
						email: params.email,
						password: generateHash(fakeUser.password)
					};
					return Promise.resolve(response);
				}
			});
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('should return invalid user message when email doesnt exist', async () => {
			try {
				await user.checkUser('invalid@email.com', fakeUser.password);
			} catch (error) {
				expect(error).to.be.equal('Invalid e-mail or password');
			}
		});

		it('should return user data', async () => {
			const response = await user.checkUser(fakeUser.email, fakeUser.password);
			expect(response).to.not.be.undefined;
			expect(response).to.have.property('email');
		});
	});
});