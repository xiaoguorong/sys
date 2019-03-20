<template>
<!-- 不带搜索的顶部 -->
	<div class="header_return">
		<mt-header fixed :title="headerName">
			<span @click="$router.go(-1)" slot="left">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "x-header-return",
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
