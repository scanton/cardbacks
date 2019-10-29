(function() {
	var componentName = 'main-viewport';
	var s = `
		<div class="` + componentName + ` text-center">
			<div class="stage" :style="stageStyle">
				<div class="background-design" v-html="design"></div>
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
			stageStyle: function() {
				var style = 'background-color: ' + store.state.backgroundColor + '; width: ' + store.state.stageWidth + 'px; height: ' + store.state.stageHeight + 'px; border-radius: ' + store.state.stageRadius + 'px;';
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
