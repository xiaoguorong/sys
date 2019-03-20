<template>
	<div class="x_header_return">
		<x-header-return></x-header-return>
		<router-view class="mt4"></router-view>
	</div>
</template>

<script>
import XHeaderReturn from '@/components/x-header-return'
export default {
	name: 'x-header-return-layout',
	components:{
		XHeaderReturn
	}
}
</script>

<style scoped>
.mt4{
 	margin-top:40px;
}
</style>
