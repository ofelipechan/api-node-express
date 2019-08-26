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
		let fakeUser = {
			email: 'fake@fake.com',
			senha: 'fakepass'
		};

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(userRepository, 'findOne').callsFake((params) => {
				if (params.email == fakeUser.email) {
					let response = {
						email: params.email,
						senha: generateHash(fakeUser.senha)
					};
					return Promise.resolve(response);
				}
			});
		});

		afterEach(() => {
			sandbox.restore();
		});

		it(`should return invalid user message when email doesn't exist`, async () => {
			try {
				await user.checkUser('invalid@email.com', fakeUser.senha);
			} catch (error) {
				expect(error).to.be.equal('Usuário e/ou senha inválidos');
			}
		});

		it('should return user data', async () => {
			let response = await user.checkUser(fakeUser.email, fakeUser.senha);
			expect(response).to.not.be.undefined;
			expect(response).to.have.property('email');
		});

	});

});