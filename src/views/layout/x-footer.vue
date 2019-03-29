<template>
	<div class="x_footer">
		<x-footer></x-footer>
		<router-view class="mt4"></router-view>
	</div>
</template>

<script>
import XFooter from '@/components/x-footer'
export default {
	name: 'x-footer-layout',
	components:{
		XFooter
	}
}
</script>

<style scoped>
.mt4{
 	margin-top:40px;
}
</style>
