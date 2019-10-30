(function() {
	var componentName = 'footer-bar';
	var s = `
		<div class="` + componentName + `">
			<div class="pull-right" :data-key="dataKey">
				{{radiusArray}}
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			dataKey: function() {
				return store.state.dataKey;
			},
			radiusArray: function() {
				return store.state.radiusArray;
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
