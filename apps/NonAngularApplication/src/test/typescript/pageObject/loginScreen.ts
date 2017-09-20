import {Utility} from '../testResources/Utility';

class loginScreen extends Utility {
	
	private static loginScreenObjects = {
		myAccount: {type: 'css', value: '[title="My Account"]'},
		username: {type: 'css', value: '#log'},
		password: {type: 'css', value: '#pwd'},
		loginBtn: {type: 'css', value: '#login'},
		logoutBtn: {type: 'css', value: '#account_logout'},
		errorMessage: {type: 'css', value: '[class="response"]:first-child'}
	};
	
	constructor() {
		super(loginScreen.loginScreenObjects);
	}
}
module.exports = new loginScreen();
