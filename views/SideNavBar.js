(function() {
	var componentName = 'side-nav-bar';
	var s = `
		<div class="` + componentName + `">
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Width
				</div>
				<input type="range" min="50" max="800" v-model="stageWidth" />
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Height
				</div>
				<input type="range" min="50" max="800" v-model="stageHeight" />
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Background
				</div>
				<input type="color" v-model="backgroundColor" />
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Foreground
				</div>
				<input type="color" v-model="foregroundColor" />
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Points
				</div>
				<input type="range" min="2" max="200" v-model="totalPoints" />
			</div>
			<button @click="handleRandomize" class="btn btn-default pull-right">Randomize</button>
			<button @click="handleSaveSeed" class="btn btn-default pull-right">Save Seed</button>
			<button @click="handleSaveSvg" class="btn btn-default pull-right">Save SVG</button>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			backgroundColor: {
				get: function() {
					return store.state.backgroundColor;
				}, 
				set: function(val) {
					store.commit("setBackgroundColor", val);
				}
			},
			foregroundColor: {
				get: function() {
					return store.state.foregroundColor;
				}, 
				set: function(val) {
					store.commit("setForegroundColor", val);
				}
			},
			stageHeight: {
				get: function() {
					return store.state.stageHeight;
				},
				set: function(val) {
					store.commit("setStageHeight", val);
				}
			},
			stageWidth: {
				get: function() {
					return store.state.stageWidth;
				},
				set: function(val) {
					store.commit("setStageWidth", val);
				}
			},
			totalPoints: {
				get: function() {
					return store.state.totalPoints;
				},
				set: function(val) {
					store.commit("setTotalPoints", val);
				}
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleSaveSeed: function(e) {
				console.log("save seed");
			},
			handleSaveSvg: function(e) {
				console.log("save svg");
			},
			handleRandomize: function(e) {
				e.preventDefault();
				store.commit("randomizePointModel");
			}
		}
	});
})();
