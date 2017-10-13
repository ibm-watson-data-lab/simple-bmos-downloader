// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

require('dotenv').config();
const fs = require('fs');
const OSClient = require('./lib/client.js');

// verify that an Object Storage container name and object name have been passed as an input to this utility
if(process.argv.length < 4) {
	console.error('Use this utility to download an object from Bluemix Object Storage.');
	console.error('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <container_name> <object_name>');
	process.exit(1);
}

// verify that Object Storage connection information is defined
if(! process.env.PROJECT_ID || ! process.env.USER_ID || ! process.env.PASSWORD || ! process.env.REGION) {
	console.error('Set environment variables PROJECT_ID, USER_ID, PASSWORD and REGION to identify the Object Storage instance you are trying to access.');
	process.exit(1);
}

const credentials = {
	projectId: process.env.PROJECT_ID,
	userId: process.env.USER_ID,
	password: process.env.PASSWORD,
	region: process.env.REGION
};

const container = process.argv[2];
const objectname = process.argv[3];

var os_client = new OSClient(credentials);

os_client.authenticate(function(err) {
	if(err) {
		console.error('Authentication error. ' + err.statusCode + ' (' + err.statusMessage +'): ' + err.rawEncoded);
	}
	else {
		console.log('Downloading object ' + container + '/' + objectname);
		os_client.downloadObject(container, // container name
			                     objectname, // object name
			                     function(data, response) {
			                     	if(response.statusCode !== 200) {
			                     		console.error('Error downloading object ' + container + '/' + objectname + ':' + response.statusCode + ' (' + response.statusMessage +')');
			                     	}
			                     	else {
			                     		fs.writeFile(objectname, 
			                     					 data, 
			                     					 'utf-8', 
			                     					 function(err) {
			                     					 	if(err) {
			                     					 		console.error('Error saving object ' + objectname + ': ' + err);
			                     					 	}
			                     					 	else {
			                     					 		console.log('Saved object ' + objectname + ' in the current working directory.');
			                     					 	}
			                     					 });
			                     	}
			                     });
	}
});


