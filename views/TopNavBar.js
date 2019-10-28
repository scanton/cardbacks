(function() {
	var componentName = 'top-nav-bar';
	var s = `
		<div class="` + componentName + `">
			<button @click="handleToggleSidebar" class="btn btn-default">
				<span class="glyphicon glyphicon-modal-window sidebar-icon"></span>
			</button>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleToggleSidebar: function(e) {
				e.preventDefault();
				store.commit("toggleSideBar");
			}
		}
	});
})();
