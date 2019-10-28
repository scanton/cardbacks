(function() {
	var componentName = 'main-viewport';
	var s = `
		<div class="` + componentName + ` text-center">
			<div class="stage" :style="stageStyle">
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
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
