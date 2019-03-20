<template>
	<div class="x_header_search">
		<x-header-search></x-header-search>
		<router-view class="mt4"></router-view>
	</div>
</template>

<script>
import XHeaderSearch from '@/components/x-header-search'
export default {
	name: 'x-header-search-layout',
	components:{
		XHeaderSearch
	}
}
</script>

<style scoped>
.mt4{
 	margin-top:40px;
}
</style>
