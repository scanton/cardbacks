(function() {
	var componentName = 'footer-bar';
	var s = `
		<div class="` + componentName + `">
			<div class="pull-right" :data-key="dataKey">
				{{mapRound(radiusArray)}}
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
			mapRound: function(arr) {
				return arr.map(x => Math.round(x));
			}
		}
	});
})();
