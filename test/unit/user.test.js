const expect = require("chai").expect;
const user = require("./../../src/services/userService");

describe("USER", () =>{

	describe("CHECK USER", () => {
		let fakeEmail = "fake@fake.com";
		let fakePassword = "fakepass";

		before(() => {
			
		});

		it("should return invalid user message", async () => {
			let response = await user.checkUser(fakeEmail, fakePassword);
			expect(response).to.be.equal("Usuário e/ou senha inválidos");
		});

		it("should return user data", async () => {
			let response = await user.getUsuario("12345");
			expect(response).to.not.be.undefined;
		});

		it("should not return user if id was not provided", async () => {

		});

		it("should not return if id has length less than 5", async () => {

		});

		it("should return null if id is invalid", async () => {

		});
        
	});

});