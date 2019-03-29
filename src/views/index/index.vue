<template>
	<div class="teaching_material_detail">
		<div class="pdf_header d-flex">
			<span class="pdf_name pl2">书名</span>
			<span class="pdf_page">{{pageNum}}/{{numPages}}</span>
			<span class="pdf_download pr2" @click="downloadFile">
				<icon class="fz14" name="iconxiazai1"></icon>
			</span>
		</div>
		<!-- <div class="pdf_box">
			<pdf 
				v-for="i in numPages"
				:key="i"
				:src="pdfUrl"
				:page="i"
				>
			</pdf>
		</div> -->
	</div>
</template>
<script>
// import pdf from 'vue-pdf'
//download.js v3.0, by dandavis; 2008-2014. [CCBY2] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support

// data can be a string, Blob, File, or dataURL

		 
						 
						 
function download(data, strFileName, strMimeType) {
	
	var self = window, // this script is only for browsers anyway...
		u = "application/octet-stream", // this default mime also triggers iframe downloads
		m = strMimeType || u, 
		x = data,
		D = document,
		a = D.createElement("a"),
		z = function(a){return String(a);},
		
		
		B = self.Blob || self.MozBlob || self.WebKitBlob || z,
		BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
		fn = strFileName || "download",
		blob, 
		b,
		ua,
		fr;

	//if(typeof B.bind === 'function' ){ B=B.bind(self); }
	
	if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
		x=[x, m];
		m=x[0];
		x=x[1]; 
	}
	
	
	
	//go ahead and download dataURLs right away
	if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
		return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
			navigator.msSaveBlob(d2b(x), fn) : 
			saver(x) ; // everyone else can save dataURLs un-processed
	}//end if dataURL passed?
	
	try{
	
		blob = x instanceof B ? 
			x : 
			new B([x], {type: m}) ;
	}catch(y){
		if(BB){
			b = new BB();
			b.append([x]);
			blob = b.getBlob(m); // the blob
		}
		
	}
	
	
	
	function d2b(u) {
		var p= u.split(/[:;,]/),
		t= p[1],
		dec= p[2] == "base64" ? atob : decodeURIComponent,
		bin= dec(p.pop()),
		mx= bin.length,
		i= 0,
		uia= new Uint8Array(mx);

		for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

		return new B([uia], {type: t});
	 }
	  
	function saver(url, winMode){
		
		
		if ('download' in a) { //html5 A[download] 			
			a.href = url;
			a.setAttribute("download", fn);
			a.innerHTML = "downloading...";
			D.body.appendChild(a);
			setTimeout(function() {
				a.click();
				D.body.removeChild(a);
				if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
			}, 66);
			return true;
		}
		
		//do iframe dataURL download (old ch+FF):
		var f = D.createElement("iframe");
		D.body.appendChild(f);
		if(!winMode){ // force a mime that will download:
			url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
		}
		 
	
		f.src = url;
		setTimeout(function(){ D.body.removeChild(f); }, 333);
		
	}//end saver 
		

	if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
		return navigator.msSaveBlob(blob, fn);
	} 	
	
	if(self.URL){ // simple fast and modern way using Blob and URL:
		saver(self.URL.createObjectURL(blob), true);
	}else{
		// handle non-Blob()+non-URL browsers:
		if(typeof blob === "string" || blob.constructor===z ){
			try{
				return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  ); 
			}catch(y){
				return saver( "data:" +  m   + "," + encodeURIComponent(blob)  ); 
			}
		}
		
		// Blob but not URL:
		fr=new FileReader();
		fr.onload=function(e){
			saver(this.result); 
		};
		fr.readAsDataURL(blob);
	}	
	return true;
} /* end download() */

export default {
	name: 'teaching-material-detail',
	components:{
		// pdf
	},
	data(){
		return {
			pdfUrl:"",
			pageNum:1,
			pageTotalNum:1,
			numPages:1,
		}
	},
	created(){
		this.pdfUrl = "http://static.solearn.cn/2.pdf";
		// download(this.pdfUrl, "d00.pdf", "application/pdf" );
		// this.pdfTask(this.pdfUrl)
	},
	mounted() {
		// alert(this.pdfUrl)
		console.log(this.pdfUrl)
		// var x=new XMLHttpRequest();
		// x.open("GET", this.pdfUrl, true);
		// x.responseType = 'blob';
		// x.onload=function(e){
		// 	 alert(x.response)
		// 	download(x.response, "1.pdf", "application/pdf" ); 
		// }
		// x.send();
		 	
	},
	methods: {
		pdfTask(pdfUrl){
			var self = this
			var loadingTask = pdf.createLoadingTask(pdfUrl)  
				loadingTask.then(pdf => {
				self.pdfUrl = loadingTask
				self.numPages = pdf.numPages
			}).catch((err) => {
				console.error('pdf加载失败')
			})
		},
		pdfClick(pdfUrl,index){
			if(index == this.activeIndex)return
				this.activeIndex = index
				this.pdfUrl = null
				this.pdfTask(pdfUrl)
		},
	
  		downloadFile(fileName, content){
			  console.log("789")
			  console.log(this.pdfUrl)
			  alert(this.pdfUrl)
			window.location.href = this.pdfUrl
		}
        
  }
}
</script>		

<style scoped>
.pdf_header{
	background:rgb(0, 0, 0,1);
	color:#fff;
	line-height:44px;
	border-top:6px solid #efefef;
	position: fixed;
	top:40px;
	z-index:1;
}
.pdf_name{
	width:40vw;
	box-sizing: border-box;
}
.pdf_page{
	width:20vw;
	text-align: center
}
.pdf_download{
	width:40vw;
	text-align: right;
	box-sizing: border-box;
}
.pdf_box{
	margin-top:84px;
}
</style>

