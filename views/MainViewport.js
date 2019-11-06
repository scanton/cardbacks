(function() {
	var componentName = 'main-viewport';
	var s = `
		<div class="` + componentName + ` text-center" :style="portStyle">
			<div class="background-container">
				<div class="background-layer-1 background-layer"></div>
				<div class="background-layer-2 background-layer"></div>
				<div class="stage" :style="stageStyle">
					<div class="background-design" v-html="design"></div>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			design: function() {
				return store.state.design;
			},
			portStyle: function() {
				var style = 'background-color: ' + store.state.backgroundColor + ';';
				return style;
			},
			stageStyle: function() {
				//background-color: ' + store.state.backgroundColor + '; 
				var style = 'width: ' + store.state.stageWidth + 'px; height: ' + store.state.stageHeight + 'px; border-radius: ' + store.state.stageRadius + 'px;';
				return style;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {

		}
	});
})();
