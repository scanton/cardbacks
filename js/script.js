const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const fs = require('fs-extra');

require('./custom_modules/utils/enableContextMenu.js')();

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}
const toDegrees = function (rad) {
	return rad * (180 / Math.PI);
}
const toRadians = function (deg) {
	return deg * (Math.PI / 180);
}

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		modalDialogBody: '',
		modalDialogButtons: [],
		modalDialogTitle: '',
		isModalDialogVisible: false,
		isSideBarVisible: true,
		stageWidth: 400,
		stageHeight: 600,
		stageRadius: 10,
		backgroundColor: '#FFFFFF',
		foregroundColor: '#0000FF',
		totalPoints: 8,
		pointModel: {}
	},
	actions: {
		
	},
	mutations: {
		hideModalDialog: function(state) {
			state.isModalDialogVisible = false;
		},
		hideSideBar: function(state) {
			state.isSideBarVisible = false;
		},
		randomizePointModel: function(state, val) {
			console.log('randomize point model');
		},
		setBackgroundColor: function(state, val) {
			store.state.backgroundColor = val;
		},
		setForegroundColor: function(state, val) {
			store.state.foregroundColor = val;
		},
		setStageHeight: function(state, val) {
			store.state.stageHeight = val;
		},
		setStageWidth: function(state, val) {
			store.state.stageWidth = val;
		},
		setTotalPoints: function(state, val) {
			store.state.totalPoints = val;
		},
		showModalDialog: function(state, args) {
			if(args && args.title && args.body && args.buttons) {
				state.modalDialogTitle = args.title;
				state.modalDialogBody = args.body;
				state.modalDialogButtons = args.buttons;
				state.isModalDialogVisible = true;
			} else {
				console.error("insufficient modal args: ", args);
			}
		},
		showSideBar: function(state) {
			state.isSideBarVisible = true;
		},
		toggleSideBar: function(state) {
			state.isSideBarVisible = !state.isSideBarVisible;
		}
	}
});

const vm = new Vue({
	el: '#main-app',
	store: store
});