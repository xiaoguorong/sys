<template>
<!-- 不带搜索的顶部 -->
	<div class="header">
		<mt-header fixed :title="headerName"></mt-header>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "x-header",
	data() {
		return {};
	},
	created() {},
	computed: {
		...mapState({
			headerName: state => state.headerName
		})
	}
};
</script>

<style scoped>
</style>
