import jest from "jest";
import { getUrlParams } from "../uri";
// const { getUriParams } = require("./../uri")

delete window.location;
window = Object.create(window);
window.location = {
  port: '9000',
  protocol: 'http:',
  hostname: 'localhost'
};

describe('Get uri params', function() {
	beforeAll(() => {
		window.location.href = encodeURI("http://localhost:9000/?project=test&asset=awssffOw\\")
	})

	it('Test if query params can be transformed into objects with urlencoded chars', function() {
		const expected = {
			project: "test",
			asset: "awssffOw\\"
		}
		expect(JSON.stringify(getUrlParams())).toBe(JSON.stringify(expected));
	});

	it('Test if query params can be transformed into objects without any url encoded chars', function() {
		window.location.href = "http://localhost:9000/?project=test&asset=awssffOw"
		const expected = {
			project: "test",
			asset: "awssffOw"
		}
		expect(JSON.stringify(getUrlParams())).toBe(JSON.stringify(expected));
	});
});
