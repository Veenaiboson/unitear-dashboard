var Chrome = VueColor.Chrome;
colorpicker_vue=Vue.component('colorpicker', {
	components: {
		'chrome-picker': Chrome,
	},
	template: `
<div class="input-group color-picker" ref="colorpicker">
	<input type="text" class="form-control" v-model="colorValue" @focus="showPicker()" @input="updateFromInput" />
	<span class="input-group-addon color-picker-container">
		<span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
		<chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker" />
	</span>
</div>`,
	props: ['color'],
	data() {
		return {
			colors: {
				hex: '#000000',
			},
			colorValue: '',
			displayPicker: false,
		}
	},
	mounted() {
		this.setColor(this.color || '#000000');
	},
	methods: {
		setColor(color) {
			this.updateColors(color);
			this.colorValue = color;
		},
		updateColors(color) {
			if(color.slice(0, 1) == '#') {
				this.colors = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colors = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
		updateFromInput() {
			this.updateColors(this.colorValue);
		},
		updateFromPicker(color) {
			this.colors = color;
			if(color.rgba.a == 1) {
				this.colorValue = color.hex;
			}
			else {
				this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
		documentClick(e) {
			var el = this.$refs.colorpicker,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePicker()
			}
		}
	},
	watch: {
		colorValue(val) {
			if(val) {
				this.updateColors(val);
				this.$emit('input', val);
				//document.body.style.background = val;
			}
		}
	},
});


var datas={
	 preview: "img/white-log.svg",
     file_name:"Select File",
     brand_name:"",
     web_branding_bg: '#003B82',
     web_branding_text_color:'#fff',
	 brand_name_error:"",
	 image_error:"",
     mobile_left_box:false,
     scan_or_loading:false,
     show_web_scanner_link:false,
	 files:"",
	 web_scanner_link:"",
	 backend_error:"",
	 web_scanner_details:JSON.parse(web_scanner_details),
	 type:1, //1-add webscanner,2-update webscanner
	 upload_status:true,
	 tuto_video:false,
}

app=new Vue({
    el: "#app",
    data:datas,
	components: {
		'colorpicker_vue': colorpicker_vue,
	},
	mounted(){
		saved_web_scanner=datas.web_scanner_details;
		if(saved_web_scanner)
		{
			/* console.log(saved_web_scanner.brand_name);
			console.log(saved_web_scanner.background_color);
			console.log(saved_web_scanner.font_color);
			console.log(saved_web_scanner.logo);
			this.brand_name=saved_web_scanner.brand_name;
			this.web_branding_bg=saved_web_scanner.background_color;
			this.web_branding_text_color=saved_web_scanner.font_color;
			this.preview=saved_web_scanner.logo;
			this.type=2; */
			this.test(saved_web_scanner);
		}
	},
    methods: {
		test:function(saved_web_scanner)
		{
			// alert(saved_web_scanner.font_color);
			datas.brand_name=saved_web_scanner.brand_name;
			datas.web_branding_bg=saved_web_scanner.background_color;
			datas.web_branding_text_color=saved_web_scanner.font_color;
			// alert(datas.web_branding_text_color);
			datas.preview=saved_web_scanner.logo;
			datas.type=2;
			this.$refs.background_color.setColor(datas.web_branding_bg);
			this.$refs.loader_and_font_color.setColor(datas.web_branding_text_color);
		},
		previewImage: async function(event)
		{
			datas.image_error="";
			var input = event.target;
			// console.log(input.files);
			// console.log(input.files.length);
			if(input.files.length > 0)
			{
				datas.files=input.files[0];
				datas.file_name=input.files[0].name;
				if(this.isFileImage(input.files[0].name))
				{
					image_dimensions_response=await this.check_image_dimensions(input.files[0]);
				}
				else
				{
					datas.image_error="Only jpg,png and jpeg files are allowed.";
				}
			}
			else
			{
				if(datas.type == 1)
				{
					datas.image_error="Please select an image.";
				}
				else
				{
					datas.image_error="";
				}
				datas.file_name="Select File";
				datas.files="";
			}
		},
		check_file:async function()
		{
			if(this.isFileImage(datas.file_name))
			{
				image_dimensions_response=await this.check_image_dimensions(datas.files);
			}
			else
			{
				datas.image_error="Only jpg,png and jpeg files are allowed.";
				datas.upload_status=false;
			}
		},
		isFileImage: function(filename) 
		{
			// console.log(filename);
			allowedExtensions =/(\.jpg|\.jpeg|\.png)$/i; 
    		if (!allowedExtensions.exec(filename))
			{ 
				return false;
   			}  
			else
			{
				return true;
			}
		},
		check_image_dimensions:function(input_file)
		{
			let img = new Image();
			img.src = window.URL.createObjectURL(input_file);
			return new Promise(function(resolve,reject){
				img.onload=function() {
					// console.log(img.height);
					// console.log(img.width);
					if(img.height <=500 && img.width <=500)
					{
						// if(img.height == img.width)
						// {
							datas.preview=URL.createObjectURL(input_file);
							datas.image_error="";
							resolve(true);
						/* }
						else
						{
							datas.image_error="Image height and width should be same.";
							datas.upload_status=false;
							resolve(false);
						} */
					}
					else
					{
						datas.image_error="Image height and width should be 500 px or below.";
						datas.upload_status=false;
						resolve(false);
					}
				}
			})
		},
		check_validation:async function()
		{
			datas.backend_error="";
			// console.log(datas.brand_name);
			brand_name=datas.brand_name.trim();
			datas.upload_status=true;
			if(brand_name)
			{
				if(brand_name.match(/^[0-9a-z-]+$/))
				{
					first_character=brand_name.charAt(0);
					if(!first_character.match(/^[0-9-]+$/))
					{
						datas.brand_name_error="";
					}
					else
					{
						datas.brand_name_error="First character has to be alphabet.";
						datas.upload_status=false;
					}
				}
				else
				{
					datas.brand_name_error="Only Alphabets,numbers and '-' allowed.";
					datas.upload_status=false;
				}
			}
			else
			{
				datas.brand_name_error="Please select a brand name.";
				datas.upload_status=false;
			}
			
			// console.log(datas.file_name);
			if(datas.type == 1)
			{
				if(datas.file_name=="Select File")
				{
					datas.image_error="Please select an image.";
					datas.upload_status=false;
				}
				else
				{
					await this.check_file();
				}
			}
			else if(datas.type == 2)
			{
				if(datas.file_name!="Select File")
				{
					await this.check_file();
				}
			}
			
			// console.log(datas.upload_status);
			if(datas.upload_status)
			{
				$('.spinner-border').removeClass('d-none');
				form_data = new FormData();                  
				form_data.append('logo',datas.files);
				form_data.append('brand_name',datas.brand_name);
				form_data.append('background_color',datas.web_branding_bg);
				form_data.append('font_color',datas.web_branding_text_color);
				form_data.append('loader_color',datas.web_branding_text_color);
				// console.log(form_data);
				$.ajax({
					url: base_url+'web_scanner/custom_web_scanner',
					data: form_data,                         
					type: 'post',
					processData: false,
					contentType: false,
					success: function(data){
						response=JSON.parse(data);
						// console.log(response);
						$('.spinner-border').addClass('d-none');
						if(response.status)
						{
							datas.web_scanner_link=response.web_scanner_link;
							datas.show_web_scanner_link=true;
							// datas.brand_name="";
							datas.file_name="Select File";
							datas.files="";
							$('#my-file').val('');
							datas.type=2;
						}
						else
						{
							datas.backend_error=response.message;
						}
					},
				})
			}
		}
    }
});


  