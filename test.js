'use strict';

const equal = require('assert').strictEqual;
const promiseToCallback = require('./');

['q', 'bluebird', 'pinkie-promise'].forEach(name => {
	let Promise = require(name);
	if (Promise.Promise) {
		Promise = Promise.Promise;
	}

	it(name + ': success', done => {
		const success = new Promise(resolve =>
			resolve('success')
		);

		promiseToCallback(success)((err, data) => {
			equal(data, 'success');
			done();
		});
	});

	it(name + ': failure', done => {
		const failure = new Promise((resolve, reject) =>
			reject('failure')
		);

		promiseToCallback(failure)(err => {
			equal(err, 'failure');
			done();
		});
	});
});
