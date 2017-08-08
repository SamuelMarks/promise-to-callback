'use strict';

const isFn = require('is-fn');

module.exports = promise => {
	if (!isFn(promise.then)) {
		throw new TypeError('Expected a promise');
	}

	if (isFn(promise.catch)) {
		return cb => promise.then(data => setImmediate(cb, null, data))
			.catch(err => setImmediate(cb, err));
	}

	return cb => promise.then(
		data => setImmediate(cb, null, data), err => setImmediate(cb, err)
	);
};
