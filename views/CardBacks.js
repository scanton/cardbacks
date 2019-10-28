(function() {
	var componentName = 'card-backs';
	var s = `
		<div :class="{'is-modal-dialog-visible': isModalDialogVisible, 'is-side-bar-visible': isSideBarVisible}" class="` + componentName + `">
			<top-nav-bar></top-nav-bar>
			<main-viewport></main-viewport>
			<side-nav-bar></side-nav-bar>
			<footer-bar></footer-bar>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			isModalDialogVisible: function() {
				return store.state.isModalDialogVisible;
			},
			isSideBarVisible: function() {
				return store.state.isSideBarVisible;
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
