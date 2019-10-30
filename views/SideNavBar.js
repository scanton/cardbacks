(function() {
	var componentName = 'side-nav-bar';
	var s = `
		<div class="` + componentName + `">
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Width
				</div>
				<input type="range" min="50" max="800" v-model="stageWidth" />
				<div class="input-group-addon">
					{{stageWidth}}
				</div>
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Height
				</div>
				<input type="range" min="50" max="800" v-model="stageHeight" />
				<div class="input-group-addon">
					{{stageHeight}}
				</div>
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Background
				</div>
				<input type="color" v-model="backgroundColor" />
				<div class="input-group-addon">
					{{backgroundColor}}
				</div>
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Foreground
				</div>
				<input type="color" v-model="foregroundColor" />
				<div class="input-group-addon">
					{{foregroundColor}}
				</div>
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Points
				</div>
				<input type="range" min="3" :max="20" v-model="totalPoints" />
				<div class="input-group-addon">
					{{totalPoints}}
				</div>
			</div>
			<div class="input-group composite-selector">
				<div class="input-group-addon">
					Rotation
				</div>
				<input type="range" min="0" max="180" v-model="offsetRotation" />
				<div class="input-group-addon">
					{{offsetRotation}}
				</div>
			</div>
			<div v-for="(radius, index) in radiusArray" class="input-group composite-selector">
				<div class="input-group-addon">
					Radius {{index + 1}}
				</div>
				<input @input="handleSliderChange" :data-index="index" :data-key="dataKey" :value="radius" type="range" min="0" :max="Math.floor(Math.min(stageWidth, stageHeight) / 2)" />
				<div class="input-group-addon">
					{{radius}}
				</div>
			</div>
			<div class="button-container">
				<button @click="handleRandomize" class="btn btn-default pull-right">Randomize</button>
				<div class="clear"></div>
			</div>
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
			dataKey: function() {
				return store.state.dataKey;
			},
			foregroundColor: {
				get: function() {
					return store.state.foregroundColor;
				}, 
				set: function(val) {
					store.commit("setForegroundColor", val);
				}
			},
			offsetRotation: {
				get: function() {
					return store.state.offsetRotation;
				},
				set: function(val) {
					store.commit("setOffsetRotation", val);
				}
			},
			radiusArray: function() {
				return store.state.radiusArray;
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
			handleSliderChange: function(e) {
				store.commit("setRadius", {value: e.target.value, index: e.target.getAttribute('data-index')});
			},
			handleRandomize: function(e) {
				e.preventDefault();
				store.commit("randomizeValues");
			}
		}
	});
})();
