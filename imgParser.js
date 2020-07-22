const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const got = require('got');
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('./inquirer.js');


app.listen(5001, err => { 

	if(!err){

		console.log(
		  chalk.yellow(
		    figlet.textSync('Img_Parser', { horizontalLayout: 'full' })
		  )
		);

		console.log(
			chalk.blue('~~~~~Enter the desiered URL below~~~~~')
		);

		const askQuestion = async () => {
			const url = await inquirer.askURL();
			
			console.log('Getting images for..... ' + url.url)
				
			run(url);
		}

		askQuestion();
		
	}else{
		console.log(err);
	}
});

function run(url){
	function renderContent(pics){
		app.get('/', (req, res) => {

			res.set('Content-type', 'text/html');

			res.write('<div id="imgContainer" style="">');
				
			pics.forEach(item => {
				res.write("<img src='"+ item +"' style=''>")
			});
			
			res.write('</div>');

			res.end();
		})
	}

	got(url)
		.then(res => {

			const arr = [];
			const dom = new JSDOM(res.body);
			const elm = dom.window.document.querySelectorAll('img');
			const amount = elm.length;

			elm.forEach(item => {
				console.log(item.src);
				arr.push(item.src);
			});

			renderContent(arr);

			console.log(
				chalk.green('Successfully parsed ' + chalk.red(amount) + ' images')
			);

			console.log(
				chalk.blue('~~~~~Parsed images can be viewed in you browser at "localhost:5001"~~~~~')
			);
		})
		
		.catch(err => console.log(err));
}