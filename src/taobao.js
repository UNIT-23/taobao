import Core from './core';
const core = new Core()

export default class Taobao {
	constructor(){
		this.core = core
	}
	config(config){
		this.core.config(config)
	}
	updateSession(session) {
		this.core.config({session})
	}
};