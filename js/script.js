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
		defaultPath: 'flower-' + new Date().getTime() + '.svg',
		modalDialogBody: '',
		modalDialogButtons: [],
		modalDialogTitle: '',
		isModalDialogVisible: false,
		isSideBarVisible: true,
		stageWidth: 800,
		stageHeight: 800,
		stageRadius: 200,
		backgroundColor: '#9595ff',
		foregroundColor: '#ffffff',
		totalPoints: 6,
		offsetRotation: 180,
		dataKey: new Date().getTime(),
		radiusArray: [ 95, 172, 56, 94, 75, 166, 30, 77, 105, 119, 122, 200, 141, 62, 194, 185, 127, 62 ],
		radiusTargets: [ 95, 172, 56, 94, 75, 166, 30, 77, 105, 119, 122, 200, 141, 62, 194, 185, 127, 62 ],
		//radiusArray: [ 95, 172, 56, 94, 75, 166, 30, 77, 105, 119, 122, 200 ],
		//radiusArray: [ 121, 81, 110, 101, 50, 165, 198, 191, 3, 188, 189, 36 ],
		//radiusArray: [ 33, 86, 81, 13, 189, 51, 17, 72, 55, 69, 32, 190 ],
		//radiusArray: [ 170, 151, 24, 159, 31, 119, 192, 47, 127, 112, 26, 2 ],
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: ,
		//radiusArray: [ 200, 170, 70, 44, 123, 146, 183, 200, 75, 40, 110, 131 ],
		//radiusArray: [ 41, 75, 110, 144, 170, 200, 170, 144, 111, 75, 41, 14 ],
		//radiusArray: [ 117, 159, 18, 62, 57, 105, 85, 200, 41, 147, 33, 14 ],
		//radiusArray: [ 107, 34, 164, 137, 146, 119, 41, 73, 95, 168, 75, 39 ],
		//radiusArray: [ 160, 192, 43, 104, 139, 60, 95, 137, 148, 118, 23, 158 ],
		//radiusArray: [ 114, 146, "65", "63", "174", 92, 46, "135", 7, "66", 58, 23 ],
		//radiusArray: [ 87, 86, 174, 47, 71, 104, 8, 173, 42, 65, 66, 191 ],
		//radiusArray: [ 199, 148, 60, 137, 141, 62, 194, 185, 127, 62, 6, 115 ],
		//radiusArray: [ 190, 6, 70, 19, 128, 56, 132, 48, 176, 17, 181, 67 ],
		//radiusArray: [ 98, 35, 125, 43, 146, 99, 46, 79, 152, 193, 119, 47 ],
		//radiusArray: [ 65, 104, 58, 163, 108, 123, 17, 24, 195, 127, 14, 55 ],
		//radiusArray: [ 143, 107, 84, 43, 56, 128, 75, 31, 140, 169, 157, 40 ],
		//radiusArray: [ 189, 90, 16, 182, 134, 165, 19, 157, 141, 34, 11, 178 ],
		//radiusArray: [ 20, 16, 96, 28, 100, 179, 121, 133, 18, 11, 170, 169 ],
		//radiusArray: [ 13, 3, 92, 100, 78, 128, 7, 162, 60, 86, 50, 163 ],
		//radiusArray: [ 97, 173, 112, 168, 26, 101, 87, 9, 27, 168, 39, 103 ],
		//radiusArray: [ 167, 4, 52, 89, 142, 134, 101, 86, 198, 11, 177, 113 ],
		//radiusArray: [ 41, 196, 195, 110, 14, 13, 170, 123, 151, 123, 32, 14 ],
		//radiusArray: [ 59, 158, 57, 125, 107, 184, 89, 160, 100, 183, 112, 139 ],
		//radiusArray: [ 71, 74, 196, 189, 12, 155, 26, 148, 146, 146, 143, 130 ],
		//radiusArray: [ 33, 190, 25, 163, 87, 72, 41, 26, 10, 191, 74, 83 ],
		//radiusArray: [ 170, 2, 59, 151, 165, 189, 60, 37, 86, 51, 139, 47 ],
		//radiusArray: [ 48, 156, 80, 13, 104, 102, 20, 168, 72, 171, 189, 73 ],
		//radiusArray: [ 25, 25, 22, 126, 200, 127, 13, 190, 99, 129, 191, 20 ],
		//radiusArray: [ 99, 88, 79, 15, 46, 11, 36, 187, 111, 159, 132, 161 ],
		//radiusArray: [ 121, 1, 15, 120, 4, 22, 107, 21, 82, 85, 7, 103 ],
		//radiusArray: [ 168, 133, 68, 6, 15, 80, 16, 184, 138, 105, 38, 103 ],
		//radiusArray: [ 25, 20, 104, 24, 126, 82, 182, 68, 73, 165, 154, 186 ],
		//radiusArray: [ 79, 32, 114, 166, 135, 36, 125, 183, 140, 147, 199, 66 ],
		//radiusArray: [ 98, 105, 62, 40, 159, 18, 170, 36, 39, 120, 51, 196 ],
		//radiusArray: [ 4, 32, 73, 106, 15, 178, 51, 109, 188, 130, 12, 39 ],
		//radiusArray: [ 60, 85, 97, 160, 155, 92, 14, 163, 186, 80, 6, 148 ],
		//radiusArray: [153, 42, 129, 145, 118, 157.5, 12.5, 180.5, 46.5, 165.5, 82.5, 192.5],
		//radiusArray: [132, 186, 165, 119, 140, 161, 58, 109, 95, 10, 171, 123],
		//radiusArray: [ 24, 50, 155, 168, 7, 59, 37, 143, 74, 163, 83, 42 ],
		design: '',
		isAutoPlay: true
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
		randomizeValues: function(state) {
			var max = Math.min(state.stageWidth, state.stageHeight) / 2;
			var l = state.radiusArray.length;
			while(l--) {
				state.radiusTargets[l] = Math.round(Math.random() * max);
			}
			//state.dataKey = new Date().getTime();
			//store.commit("renderDesign");
		},
		renderDesign: function(state) {
			var s = `<?xml version="1.0" encoding="utf-8"?>
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" viewBox="0 0 ` + state.stageWidth + ` ` + state.stageHeight + `" enable-background="new 0 0 ` + state.stageWidth + ` ` + state.stageHeight + `" xml:space="preserve">
			<g inkscape:groupmode="layer" inkscape:label="Layer 1">
			<g><path style="fill-rule:evenodd" fill="` + state.foregroundColor + '" d="';
			var r, r2, sinSlice, cosSlice;
			var pointArray = [];
			var l = state.radiusArray.length - 1;
			var l2 = state.totalPoints;
			var sliceSize = toRadians(360 / l2);
			var centerX = state.stageWidth / 2;
			var centerY = state.stageHeight / 2;
			var rotation = toRadians(state.offsetRotation);
			for(var i = 0; i < l; i++) {
				r = state.radiusArray[i];
				r2 = state.radiusArray[i + 1];
				for(var j = 0; j < l2; j++) {
					sinSlice = Math.round(Math.sin((sliceSize * j) + rotation) * r);
					cosSlice = Math.round(Math.cos((sliceSize * j) + rotation) * r);
					if(j == 0) {
						pointArray.push("M" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					} else {
						pointArray.push("L" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					}
					sinSlice = Math.round(Math.sin(((sliceSize * j) + rotation) + (sliceSize / 2)) * r2);
					cosSlice = Math.round(Math.cos(((sliceSize * j) + rotation) + (sliceSize / 2)) * r2);
					pointArray.push("L" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					if(j == l2 - 1) {
						sinSlice = Math.round(Math.sin((sliceSize * 0) + rotation) * r);
						cosSlice = Math.round(Math.cos((sliceSize * 0) + rotation) * r);
						pointArray.push("L" + (centerX + sinSlice) + "," + (centerY + cosSlice));
					}
				}
			}
			s += pointArray.join(" ");
			s += '" /></g></g></svg>'
			state.design = s;
		},
		setBackgroundColor: function(state, val) {
			state.backgroundColor = val;
		},
		setDefaultPath: function(state, val) {
			state.defaultPath = val;
		},
		setForegroundColor: function(state, val) {
			state.foregroundColor = val;
			store.commit("renderDesign");
		},
		setIsAutoPlay: function(state, val) {
			state.isAutoPlay = val;
		},
		setOffsetRotation: function(state, val) {
			state.offsetRotation = val;
			store.commit("renderDesign");
		},
		setRadius: function(state, args) {
			state.radiusArray[args.index] = Number(args.value);
			state.dataKey = new Date().getTime();
			store.commit("renderDesign");
		},
		setStageHeight: function(state, val) {
			state.stageHeight = val;
			store.commit("renderDesign");
		},
		setStageWidth: function(state, val) {
			store.state.stageWidth = val;
			store.commit("renderDesign");
		},
		setTotalPoints: function(state, val) {
			state.totalPoints = val;
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

var tweenCount = 275;
var tweenCounter = setInterval(function() {
	var isMatch = true;
	var l = store.state.radiusTargets.length;
	while(l--) {
		if(store.state.radiusTargets[l] != store.state.radiusArray[l]) {
			isMatch = false;
			break;
		}
	}
	if(!isMatch) {
		l = store.state.radiusTargets.length;
		while(l--) {
			store.state.radiusTargets[l]
			store.state.radiusArray[l] -= (store.state.radiusArray[l] - store.state.radiusTargets[l]) / 50;
		}
		store.state.dataKey = new Date().getTime();
		store.commit("renderDesign");
	}
	if(store.state.isAutoPlay) {
		++tweenCount;
	}
	if(tweenCount > 300) {
		store.commit("randomizeValues");
		tweenCount = 0;
	}

}, 33);