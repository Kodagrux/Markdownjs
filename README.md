![](https://github.com/Kodagrux/markdownjs/blob/master/logo.png)

## Markdown.js
I couldn't find a very good client side markdown-to-html converter so I decided to make one on my own using JavaScript, jQuery and Regular Expressions. I have tried my best to not introduce my own flavor (or use GitHubs flavor) and keep to [the original ruleset](https://daringfireball.net/projects/markdown/). Check out the ```index.html``` file for a demonstration of the functionallity of the script.




###Functionality
*Most* of the baisc Markdown-features are working:

- Headers (6 levels)
- Bold text
- Italic text
- Strikethrough text
- Unordered lists
- Dividers (thick and thin)
- Inline HTML
- Linebreaks
- Code

####Example
Bellow is an image of what the input from the demo-file looks like:
![](https://github.com/Kodagrux/markdownjs/blob/master/printscreen-input.png)

After runing the script on the div containing the input the result looks like this:
![](https://github.com/Kodagrux/markdownjs/blob/master/printscreen-output.png)

###Key Features

Some other key features of my script are:

- The ability to switch from using default html tags (such as h1, h2, h3 for headers) to spantags with custom classes.
- Two types of dividers, thin (---) and thick (===).
- Relativly fast, the demo-file only takes about 10 ms on a 5 year old MacBook Pro.
- Relativly small, only 6 Kb.
- Allows some *serious* nesting 


###Usage
Add the files ```markdown.js``` and ```jquery.js``` (if you don't already have it) to your project folder and add the following to your html file (before you initialize):

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="markdown.js"></script>
```

To initialize, simply add the following:

```
<script>
	//Change the selection to your div
	$(".div-with-the-original-markdown-text").markdown({
		//Add options here
	});
</script>
```
The script will than take all the take everything in the selected div (your div containing the markdown) and replace it with properly structured html.

####Styling
If you want to use custom span-tags instead of the normal html-tags you might want to include the defualt styling ```markdown_barebone.css``` and optionally (but less likely) the ```markdown_stylesheet.css``` with the following lines:

```
<link rel="stylesheet" href="markdown_barebone.css">
<link rel="stylesheet" href="markdown_stylesheet.css">
```

####Options
Since one of my many goals was to keep the script flexible I added a lot of options. Below is a list of all of them, including thier defaults (sorry for side-scroll):

```//Header
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
		console_print:					true								//Whether to print out time taken or not in console
```


###To-do list
- Ordered lists 
- Multiple levels in lists
- Links
- Check headers - first in line 
- Blockquote 
- Tabs size
- Trigger on start/finish
- Fix bug where text that contains "-" get turned into a list item (such as "time-travel")


### About this project
This project is created by, and currently only maintained by, [Arvid Bräne](http://arvidbrane.com). [MIT license](https://github.com/Kodagrux/URL-Shortener/blob/master/LICENSE.txt).  