const inquirer = require('inquirer');


module.exports = {
	askURL: () => {
		const question = {
			name: 'url',
			type: 'input',
			message: 'Desired URL: '
		}

	return inquirer.prompt(question);
	}
}