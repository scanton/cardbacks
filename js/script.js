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
		foregroundColor: '#0000AE',
		totalPoints: 8,
		offsetRotation: toRadians(180),
		radiusArray: [155, 50, 100, 25, 125, 66],
		design: ''
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
		renderDesign: function(state, val) {
			var s = `<?xml version="1.0" encoding="utf-8"?>
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" viewBox="0 0 ` + state.stageWidth + ` ` + state.stageHeight + `" enable-background="new 0 0 ` + state.stageWidth + ` ` + state.stageHeight + `" xml:space="preserve">
			<g inkscape:groupmode="layer" inkscape:label="Layer 1">
			<g><path fill="` + state.foregroundColor + '" d="';
			var r, r2, sinSlice, cosSlice;
			var pointArray = [];
			var l = state.radiusArray.length - 1;
			var l2 = state.totalPoints;
			var sliceSize = toRadians(360 / l2);
			var centerX = state.stageWidth / 2;
			var centerY = state.stageHeight / 2;
			for(var i = 0; i < l; i++) {
				r = state.radiusArray[i];
				r2 = state.radiusArray[i + 1];
				for(var j = 0; j < l2; j++) {
					sinSlice = Math.sin((sliceSize * j) + state.offsetRotation) * r;
					cosSlice = Math.cos((sliceSize * j) + state.offsetRotation) * r;
					if(j == 0) {
						pointArray.push("M" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					} else {
						pointArray.push("L" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					}
					sinSlice = Math.sin(((sliceSize * j) + state.offsetRotation) + (sliceSize / 2)) * r2;
					cosSlice = Math.cos(((sliceSize * j) + state.offsetRotation) + (sliceSize / 2)) * r2;
					pointArray.push("L" + (centerX + sinSlice) + "," + (centerY + cosSlice));
				}
			}
			s += pointArray.join(" ");
			s += '" /></g></g></svg>'
			state.design = s;
		},
		setBackgroundColor: function(state, val) {
			store.state.backgroundColor = val;
		},
		setForegroundColor: function(state, val) {
			store.state.foregroundColor = val;
			store.commit("renderDesign");
		},
		setStageHeight: function(state, val) {
			store.state.stageHeight = val;
			store.commit("renderDesign");
		},
		setStageWidth: function(state, val) {
			store.state.stageWidth = val;
			store.commit("renderDesign");
		},
		setTotalPoints: function(state, val) {
			store.state.totalPoints = val;
			store.commit("renderDesign");
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

store.commit("renderDesign");