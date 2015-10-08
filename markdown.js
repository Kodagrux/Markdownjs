/*
	Markdown.js

	Version: 			1.0 
	Date: 				08-06-13
 	By: 				Arvid Bräne
 	License: 			MIT 3.0


*/


//Pollyfill for Object.create
if (typeof Object.create !== 'function') {
	Object.create = function(obj) {
		function F() {};
		F.prototype = obj;
		return new F();
	} 
}


//Markdown.js
(function( $, window, document, undefined ) {

	//Useful variabels
	var result;
	var self;
	var options;



	var Markdown = {

		//Initiate
		init: function(element, opt) {

			//Basics
			self = this; 
			options = opt;
			self.element = element;
			self.$element = $( element );
			result = element.innerHTML;

			//Option Parameters
			if (options !== null) {
				self.live_preview = ( typeof options === 'boolean' ) ? options : options.live_preview;
			}
			options = $.extend( {}, $.fn.markdown.options, options );

			//Start main
			self.main(self.element);
		}, 

		//Main
		main: function( element) {
			if (options.console_print) 				var start = new Date().getTime();

			//console.log(index);
			//console.log(escape(result));

			if (options.blockquote)					self.blockquote();					//Blockquote
			if (options.header) 					self.header();						//Headers
			if (options.bold) 						self.bold();						//Bold
			if (options.italic)						self.italic();						//Italic
			if (options.divider) 					self.divider();						//Dividers
			if (options.list) 						self.list();						//Lists
			if (options.strikethrough) 				self.strikethrough();				//Strikethrough
			if (options.code) 						self.code();						//Code

			if (options.wrap_p) 					result = '<pre class="' + options.pre_class + '">' + result +  '</pre>';
			if (options.display_syntax) 			result = '<p class="' + options.p_class + '">' + result +  '</p>';
			if (options.replace_line_breaks) 		result = result.replace(/[\n]/g, '<br>');
			if (options.replace_tabs) 				result = result.replace(/[\t]/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

			//Apply the finished product
			//$(".markdown2").html(result); //
			self.$element.html(result);

			if (options.console_print) 				console.log(new Date().getTime() - start);

		},



		//Headers
		header: function() {

			//Header 6
			if (options.header_levels >= 6) {
				var h6 = result.match(/######(.*)[^\n]/g);
				if(h6 !== null) {
					for (i = 0; h6.length > i; i++) {
						result = result.replace(h6[i], 
							'<' + ((options.header_html) ? "h6" : "span") + //Tag (open)
							' class="' + options.header_h6_class + ' ' + options.header_class + '">' + //Class
							h6[i].replace(/######/g, //Replacement RegExp
							(!options.display_syntax) ? "" : "&#35;&#35;&#35;&#35;&#35;&#35;") + //Display syntax
							'</' + ((options.header_html) ? "h6" : "span") + '>'); //Tag (close)
					}
				}
			}


			//Header 5
			if (options.header_levels >= 5) {
				var h5 = result.match(/#####(.*)[^\n]/g);
				if(h5 !== null) {
					for (i = 0; h5.length > i; i++) {
						if (h5[i].match("#35;") === null) {
							result = result.replace(h5[i], 
								'<' + ((options.header_html) ? "h5" : "span") + //Tag (open)
								' class="' + options.header_h5_class + ' ' + options.header_class + '">' + //Class
								h5[i].replace(/#####/g, //Replacement RegExp
								(!options.display_syntax) ? "" : "&#35;&#35;&#35;&#35;&#35;") + //Display syntax
								'</' + ((options.header_html) ? "h5" : "span") + '>'); //Tag (close)
						}
					}
				}
			}


			//Header 4
			if (options.header_levels >= 4) {
				var h4 = result.match(/####(.*)[^\n]/g);
				if(h4 !== null) {
					for (i = 0; h4.length > i; i++) {
						if (h4[i].match("#35;") === null) {
							result = result.replace(h4[i], 
								'<' + ((options.header_html) ? "h4" : "span") + //Tag (open)
								' class="' + options.header_h4_class + ' ' + options.header_class + '">' + //Class
								h4[i].replace(/####/g, //Repalcement RegExp
								(!options.display_syntax) ? "" : "&#35;&#35;&#35;&#35;") + //Display syntax
								'</' + ((options.header_html) ? "h4" : "span") + '>'); //Tag (close)
						}
					}
				}
			}


			//Header 3
			if (options.header_levels >= 3) {
				var h3 = result.match(/###(.*)[^\n]/g);
				if(h3 !== null) {
					for (i = 0; h3.length > i; i++) {
						if (h3[i].match("#35;") === null) {
							result = result.replace(h3[i], 
								'<' + ((options.header_html) ? "h3" : "span") + //Tag (open)
								' class="' + options.header_h3_class + ' ' + options.header_class + '">' + //Class
								h3[i].replace(/###/g, //Replacement RegExp
								(!options.display_syntax) ? "" : "&#35;&#35;&#35;") + //Display syntax
								'</' + ((options.header_html) ? "h3" : "span") + '>'); //Tag (close)
						}
					}
				}
			}
		

			//Header 2
			if (options.header_levels >= 2) {
				var h2 = result.match(/##(.*)[^\n]/g);
				if(h2 !== null) {
					for (i = 0; h2.length > i; i++) {
						if (h2[i].match("#35;") === null) {
							result = result.replace(h2[i], 
								'<' + ((options.header_html) ? "h2" : "span") + //Tag (open)
								' class="' + options.header_h2_class + ' ' + options.header_class + '">' + //Class
								h2[i].replace(/##/g, //Replacement RegExp
								(!options.display_syntax) ? "" : "&#35;&#35;") + //Display syntax
								'</' + ((options.header_html) ? "h2" : "span") + '>'); //Tag (close)
						}
					}
				}
			}


			//Header 1
			if (options.header_levels >= 1) {
				var h1 = result.match(/#(.*)[^\n]/g);
				if(h1 !== null) {
					for (i = 0; h1.length > i; i++) {
						if (h1[i].match("#35;") === null) {
							result = result.replace(h1[i], 
								'<' + ((options.header_html) ? "h1" : "span") + //Tag (open)
								' class="' + options.header_h1_class + ' ' + options.header_class + '">' + //Class
								h1[i].replace(/#/g, //Replacement RegExp
								(!options.display_syntax) ? "" : "&#35;") + //Display syntax
								'</' + ((options.header_html) ? "h1" : "span") + '>'); //Tag (close)
						}
					}
				}
			}
		}, 



		//Bold
		bold: function() {

			var bold = result.match(/[*][*](.*)[*][*]/gm);
			if(bold !== null) {
				for (i = 0; bold.length > i; i++) {
					result = result.replace(bold[i], 
						'<' + ((options.bold_html) ? "strong" : "span") + //Tag (open)
						' class="' + options.bold_class + '">' + //Class
						bold[i].replace(/[*][*]/g, //Replacement RegExp
						(!options.display_syntax) ? "" : "&#42;&#42;") + //Display syntax
						'</' + ((options.bold_html) ? "strong" : "span") + '>'); //Tag (close)
				}
			}

		}, 



		//Italic
		italic: function() {

			var italic = result.match(/[*](.*)[*]/g);
			if(italic !== null) {
				for (i = 0; italic.length > i; i++) {
					result = result.replace(italic[i], 
						'<' + ((options.italic_html) ? "em" : "span") + //Tag (open)
						' class="' + options.italic_class + '">' + //Class
						italic[i].replace(/[*]/g, //Replacement RegExp
						(!options.display_syntax) ? "" : "&#42;") + //Display syntax
						'</' + ((options.italic_html) ? "em" : "span") + '>'); //Tag (close)
				}
			}

		}, 



		//Lists
		list: function() {

			//Unorderd list
			if (options.list_ul){
				var list = result.match(/-(.*)[^\n]/g);
				if(list !== null) {
					for (i = 0; list.length > i; i++) {
						result = result.replace(list[i], 
							'<ul class="markdown_ul"><li class="' + options.list_li_class + '">' + //Tag(s) (open) and Class
							list[i].replace(/-/g, //Replacement RegExp
							(!options.display_syntax) ? "" : "") + //Display syntax
							'</li></ul>'); //Tag(s) (close)
					}
					
					//Fix multiples
					result = result.replace(/<\/ul>[^]<ul class="markdown_ul">/g, "");
				}
			}


			//Ordered list
			if (options.list_ol){
				var list = result.match(/[^\n][1-9](\.)(.*)/g);
				console.log(list);
				if(list !== null) {
					for (i = 0; list.length > i; i++) {
						result = result.replace(list[i], 
							'<ol class="markdown_ol"><li class="' + options.list_li_class + '">' + //Tag(s) (open) and Class
							list[i].replace(/[^\n][1-9]+\./g, //Replacement RegExp
							(!options.display_syntax) ? "" : "") + //Display syntax
							'</li></ol>'); //Tag(s) (close)
					}
					
					//Fix multiples
					result = result.replace(/<\/ol>[^]<ol class="markdown_ol">/g, "");
				}
				//[^\n][1-9]+\.(.*)
			}

		}, 



		//Dividers
		divider: function() {

			var divider;

			//Thick
			if (options.divider_levels >= 2) {
				divider = result.match(/===/g);
				if(divider !== null) {
					for (i = 0; divider.length > i; i++) {
						result = result.replace(divider[i], 
							'<' + ((options.divider_html) ? "hr" : "div") + //Tag (open)
							' class="' + options.divider_thick_class + ' ' + options.divider_class + '">' + //Class
							divider[i].replace(/===/g, //Replacement RegExp
							(!options.display_syntax) ? "" : "") + //Display syntax
							'</' + ((options.divider_html) ? "hr" : "div") + '>'); //Tag (close)
					}
				}
			}


			//Thin
			if (options.divider_levels >= 1) {
				divider = result.match(/---/g);
				if(divider !== null) {
					for (i = 0; divider.length > i; i++) {
						result = result.replace(divider[i], 
							'<' + ((options.divider_html) ? "hr" : "div") + //Tag (open)
							' class="' + options.divider_thin_class + ' ' + options.divider_class + '">' + //Tag (open) and Class
							divider[i].replace(/---/g, //Replacement RegExp
							(!options.display_syntax) ? "" : "") + //Display syntax
							'</' + ((options.divider_html) ? "hr" : "div") + '>'); //Tag (close)
					}
				}
			}

		}, 



		//Strikethrough
		strikethrough: function() {

			var strike = result.match(/~~(.*)~~/g);
			if(strike !== null) {
				for (i = 0; strike.length > i; i++) {
					result = result.replace(strike[i], 
						'<' + ((options.strikethrough_html) ? "del" : "span") + //Tag (open)
						' class="'+ options.strikethrough_class + '">' + //Class
						strike[i].replace(/~~/g, //Replacement RegExp
						(!options.display_syntax) ? "" : "&#126;&#126;") + //Display syntax
						'</' + ((options.strikethrough_html) ? "del" : "span") + '>'); //Tag (close)
				}
			}

		}, 



		//Code
		code: function() {

			var code = result.match(/```(.*)```/g);
			if(code !== null) {
				for (i = 0; code.length > i; i++) {
					result = result.replace(code[i], 
						'<' + ((options.code_html) ? "code" : "span") + //Tag (open)
						' class="' + options.code_class + '">' + //Class
						code[i].replace(/```/g, //Replacement RegExp
						(!options.display_syntax) ? "" : "&#96;&#96;&#96;") + //Display syntax
						'</' + ((options.code_html) ? "code" : "span") + '>'); //Tag (close)
				}
			}

		}, 



		//Blockquote
		blockquote: function() {

			var blockquote = escape(result).match(/^>[ ](.*)/gm);
			console.log(blockquote);
			if(blockquote !== null) {
				for (i = 0; blockquote.length > i; i++) {
					result = result.replace(blockquote[i], 
						'<' + ((options.blockquote_html) ? "blockquote" : "span") + //Tag (open) 
						' class="' + options.blockquote_class + '">' + //Class
						blockquote[i].replace(/>/g, //Replacement RegExp
						(!options.display_syntax) ? "" : "&#62;") + //Display syntax
						'</' + ((options.blockquote_html) ? "blockquote" : "span") + '>'); //Tag (close)
				}
			}

		}
	};

	//Options
	$.fn.markdown = function( opt ) {

		//Itterate all the DOM-elementents
		return this.each(function() {
			var markdown = Object.create(Markdown);
			markdown.init(this, opt);
		});

	};

	//Options
	$.fn.markdown.options = {
		
		//Header
		header: 						true,								//Whether to use headers or not
		header_levels: 					6,									//The amount of header levels (1-6)
		header_class: 					"markdown_header",					//The name of the class used for every header
		header_h1_class: 				"markdown_h1",						//The name of the class used for the h1-header
		header_h2_class: 				"markdown_h2",						//The name of the class used for the h2-header
		header_h3_class: 				"markdown_h3",						//The name of the class used for the h3-header
		header_h4_class: 				"markdown_h4",						//The name of the class used for the h4-header
		header_h5_class: 				"markdown_h5",						//The name of the class used for the h5-header
		header_h6_class: 				"markdown_h6",						//The name of the class used for the h6-header
		header_html: 					false,								//Whether to use the h1, h2 etc. -tags instead of a span

		//Bold
		bold: 							true,								//Whether to use bold or not
		bold_class: 					"markdown_bold",					//The name of the class used for the bold text
		bold_html: 						false,								//Whether to use the b-tag instead of a span

		//Italic
		italic: 						true,								//Whether to use italic or not
		italic_class: 					"markdown_italic", 					//The name of the class used for the italic text
		italic_html: 					false,								//Whether to use the i-tag instead of a span

		//Blockquote
		blockquote: 					true,								//Whether to use blockquote or not
		blockquote_class: 				"markdown_blockquote",				//The name of the class used for the blockquote
		blockquote_html: 				true,								//Whether to use the blockquote-tag instead of a span

		//Strikethrough
		strikethrough: 					true,								//Whether to use strikethrough or not
		strikethrough_class: 			"markdown_strikethrough",			//The name of the class used for the strikethrough text
		strikethrough_html: 			false,								//Whether to use the del-tag instead of a span

		//Divider
		divider: 						true,								//Whether to use divider or not
		divider_levels: 				2,									//The amount of divider levels (1-2)
		divider_class: 					"markdown_divider",					//The name of the class used for every divider
		divider_thick_class: 			"markdown_divider_thick",			//The name of the class used for the thick divider
		divider_thin_class: 			"markdown_divider_thin",			//The name of the class used for the thin divider
		divider_html: 					false, 								//Whether to use the hr-tag instead of a div

		//List
		list: 							true,								//Whether to use lists or not
		list_class: 					"markdown_list",					//The name of the class used for every list
		list_li_class: 					"markdown_li",						//The name of the class used for every li
		list_ol_class: 					"markdown_ol",						//The name of the class used for every ol
		list_ul_class: 					"markdown_ul",						//The name of the class used for every ul
		list_ol: 						true,								//Whether to use ol-lists or not
		list_ul: 						true, 								//Whether to use ul-lists or not

		//Code
		code: 							true,								//Whether to use code or not
		code_class: 					"markdown_code", 					//The name of the class used for the code-snippets
		code_html: 						false,								//Whether to use the code-tag instead of a span

		//Wrap
		wrap_pre: 						false,								//Whether to wrap the text in a pre-tag or not
		pre_class: 						"markdown_pre",						//The name of the class used for the paragraph-tag
		wrap_p: 						false, 								//Whether to wrap the text in a p-tag or not
		p_class: 						"markdown_p",						//The name of the class used for the pre-tag

		//Misc
		live_preview: 					false,								//Whether to check the text on every key up
		display_syntax: 				false,								//Whether to display the markdown-syntax or not
		replace_line_breaks: 			true,								//Whether to replace line breaks (\n) with a br-tag or not
		replace_tabs: 					true,								//Whether to replace tabs (\t) with a wrapping of the dd-tag or not
		console_print:					false								//Whether to print out time taken or not in console

	};


}( jQuery, window, document));






