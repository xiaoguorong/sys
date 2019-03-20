<template>
	<div class="x_header">
		<x-header></x-header>
		<router-view class="mt4"></router-view>
	</div>
</template>

<script>
import XHeader from '@/components/x-header'
export default {
	name: 'x-header-layout',
	components:{
		XHeader
	}
}
</script>

<style scoped>
.mt4{
 	margin-top:40px;
}
</style>
