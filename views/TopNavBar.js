(function() {
	var componentName = 'top-nav-bar';
	var s = `
		<div class="` + componentName + `">
			<button @click="handleToggleSidebar" class="btn btn-default">
				<span class="glyphicon glyphicon-modal-window sidebar-icon"></span>
			</button>
			<button @click="handleSaveSvg" class="btn btn-default pull-right">Save SVG</button>
				
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
			handleSaveSvg: function(e) {
				store.commit("showModalDialog", {
					title: "Save File As",
					body: "<div>Pick a location to save an SVG file or copy the text below</div><div><textarea>" + store.state.design + "</textarea></div>",
					buttons: [
						{
							label: "Cancel",
							class: "btn btn-warning",
							handler: function(e) {
								e.preventDefault();
								store.commit("hideModalDialog");
							}
						},
						{
							label: "Save",
							class: "btn btn-success",
							handler: function(e) {
								e.preventDefault();
								console.log("get file name");
							}
						}
					]
				});
			},
			handleToggleSidebar: function(e) {
				e.preventDefault();
				store.commit("toggleSideBar");
			}
		}
	});
})();
