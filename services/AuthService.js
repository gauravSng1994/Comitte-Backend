const crypto = require('crypto');

module.exports = {

	/**
	 * This method decrypts the cryptext
	 *
	 * @param {String} cryptText crypt text
	 *
	 * @return {String|Object|Error} The data or Error object
	 *
	 * */

	decrypt: function (cryptText) {
		let data = null;
		try {
			const decipher = crypto.createDecipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET);
			data = JSON.parse(decipher.update(cryptText, 'hex') + decipher.final());
		} catch (c) {
			c.message = "Unable to decode the cryptext. Tampered input! Or Invalid Secret! " + c.message;
			return new Error(c);
		}
		if (data && data.payload) {
			return data.payload;
		} else {
			return new Error("Unable to parse. Bad data or secret.");
		}
	},

	/**
	 * Generate the cryptext from data
	 *
	 * @param {Object} data the data token has to carry
	 *
	 * @return {String|Error} The access token or Error object
	 * */
	encrypt: function (data) {
		const json = JSON.stringify({payload: data});
		try {
			const cipher = crypto.createCipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET);
			return cipher.update(json, 'binary', 'hex') + cipher.final('hex');
		} catch (c) {
			return new Error(c);
		}
	},
	setPassword: function (password, workFactor = 10) {
		return new Promise((resolve, reject) => {
			try {
				this.encrypt(password);
				resolve();
			}catch (e) {
				reject(e);
			}
		})
	},
	verifyPassword: function (password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, this.password, (error, result) => {
				if (error) return reject(error)
				resolve(result)
			});
		})
	}
};
