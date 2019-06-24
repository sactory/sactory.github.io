/*! Transpiled from sandbox.jsb using Sactory v0.102.0. Do not edit manually. */!function(a){if(typeof define=='function'&&define.amd){define(['sactory'], a)}else if(typeof Sactory=='function'){a(Sactory)}else{a(require('sactory'))}}(function(բ, գ, ե, զ, ժ){բ.ready(function(){

var file, key, hash = null;

var tabs = {
	"output": "Output",
	"error": "Errors",
	"warn": "Warnings",
	"code": "Transpiled Code",
	"info": "Info"
};

var debugMode = բ.observable(true, "is_debug");
var alignment = բ.observable("y", "alignment");

var tab = բ.observable("output", "current_tab");

function switchTab(from, to) {
	if(tab.value == from) tab.value = to;
}

var inputs = {};
var outputs = {};

if(window.location.hash) {
	hash = JSON.parse(atob(window.location.hash.substr(1)));
} else {
	file = բ.observable("snippet", "current_snippet");
	key = բ.computedObservable(this, ե, [file], function(){return "storage." + file.value}, []);
}

var defaultContent = {
	content: {
		js: "var count = **0;\n",
		html: "<button +click={ *count++ }>\n\tClicked ${*count} times\n</button>\n\nif(*count > 0) {\n\t<button +click={ *count = 0 }>\n\t\tReset count\n\t</button>\n}\n",
		css: ""
	},
	show: {
		js: true,
		html: true,
		css: false
	},
	mode: {
		js: "code",
		html: "html :logic",
		css: "ssb"
	}
};

var modes = {
	js: ["code"],
	html: ["html", "html :logic", "html :trimmed", "html :logic :trimmed", "text", "text :logic"],
	css: ["css", "css :logic", "ssb"]
};

var content = hash ? բ.observable.deep(hash.content) : բ.observable.deep(defaultContent, key.value);
var showCount = բ.computedObservable(this, ե, [content], function(){return content.value.show.js + content.value.show.html + content.value.show.css}, []);
var result = բ.computedObservable(this, ե, [debugMode, content], function(){return (function(){
	debugMode.value; // just to add it as a dependency
	var result = {source: "", before: "", after: "", info: {time: 0, tags: {}, features: []}, errors: [], warnings: []};
	var transpiler = new Transpiler({namespace: hash ? hash.name : file.value});
	function transpile(type, before, after) {
		before = before ? before + '<!COMMENT start>' : "";
		after = after ? '<!COMMENT end>' + after : "";
		try {
			var info = transpiler.transpile(before + content.value.content[type] + after);
			result.info.time += info.time;
			result.info.variables = info.variables;
			for(var tag in info.tags) {
				result.info.tags[tag] = (result.info.tags[tag] || 0) + info.tags[tag];
			}
			info.features.forEach(function(feature){
				if(result.info.features.indexOf(feature) == -1) result.info.features.push(feature);
			});
			Array.prototype.push.apply(result.warnings, info.warnings);
			var source = info.source.contentOnly;
			if(before) source = source.substr(source.indexOf("/*start*/") + 9);
			if(after) source = source.substring(0, source.lastIndexOf("/*end*/"));
			result[type] = source;
			result.before = info.source.before;
			result.source += info.source.contentOnly;
			result.after = info.source.after;
		} catch(e) {
			console.error(e);
			result.errors.push(e);
		}
	}
	transpile("js");
	if(content.value.show.html) transpile("html", "<:body #" + content.value.mode.html + ">", "</:body>");
	if(content.value.show.css) transpile("css", "<style :head #" + content.value.mode.css + ">", "</style>");
	if(result.errors.length) switchTab("output", "error");
	else switchTab("error", "output");
	return result;
})()}, []);
if(!hash) {
	if(window.localStorage && window.localStorage.getItem(key.value)) {
		content.value = JSON.parse(window.localStorage.getItem(key.value));
	}
	բ.subscribe(ե, file, function(value){
		content.storage.key = key.value;
		var newContent = content.storage.get(defaultContent);
		content.storage.key = "";
		content.value = newContent;
		content.storage.key = key.value;
		for(var type in content.value.content) {
			if(inputs[type]) inputs[type].setValue(content.value.content[type]);
		}
	});
}

function save() {
	content.merge({
		content: {
			js: inputs.js ? inputs.js.getValue() : "",
			html: inputs.html ? inputs.html.getValue() : "",
			css: inputs.css ? inputs.css.getValue() : ""
		}
	});
}
բ(this, գ, ե, զ, [բ.create, "style", {}], [բ.body, ժ, function(գ, զ, ժ){բ.compileAndBindStyle(function(){var եի=բ.root();var fontFamily = "Segoe UI";
var color = {
	red: {
		background: "#D32F2F",
		text: "#F44336"
	}
};
var ել=բ.select(եի, "body"); 
	ել.value("margin", "0");
	ել.value("font-family", (fontFamily));
	ել.value("overflow-y", "hidden");

var եծ=բ.select(եի, ".top"); 
	var եկ=բ.select(եծ, ".filename"); 
		var եհ=բ.select(եկ, "span, input, select"); 
			եհ.value("font-family", (fontFamily));
			եհ.value("height", "26px");
			եհ.value("margin", "4px 0 4px 4px");
			եհ.value("padding", "0 8px");
		
	
	var եղ=բ.select(եծ, ".input"); 
		եղ.value("height", "calc(100% - 34px)");
		var եճ=բ.select(եղ, ".editor .mode"); 
			եճ.value("position", "absolute");
			եճ.value("z-index", "999");
			եճ.value("top", "8px");
			եճ.value("right", "22px");
			եճ.value("padding", "2px 4px");
			եճ.value("font-size, line-height", "12px");
			եճ.value("background", "rgba(187, 187, 187, .3)");
			եճ.value("color", "#333");
			եճ.value("border-radius", "1000px");
			եճ.value("border", "none");
			եճ.value("opacity", ".5");
			եճ.value("transition", "opacity .1s linear");
			var եմ=բ.select(եճ, "&:hover"); 
				եմ.value("opacity", "1");
			
			var եյ=բ.select(եճ, "&:focus"); 
				եյ.value("outline", "none");
			
		
	

var են=բ.select(եի, ".bottom"); 
	var եշ=բ.select(են, "nav"); 
		var եո=բ.select(եշ, ".item"); 
			եո.value("position", "relative");
			եո.value("cursor", "pointer");
			եո.value("padding", "8px");
			var եչ=բ.select(եո, "&:hover::after, &.active::after"); 
				եչ.value("content", "''");
				եչ.value("position", "absolute");
				եչ.value("bottom", "-2px");
				եչ.value("left, right", "0");
				եչ.value("height", "4px");
			
			var եպ=բ.select(եո, "&:not(.active):hover::after"); 
				եպ.value("opacity", ".5");
				եպ.value("background", "darkviolet");
			
			var եջ=բ.select(եո, "&.active::after"); 
				եջ.value("background", "darkviolet");
			
			var եռ=բ.select(եո, ".has-errors &.error, .has-warnings &.warn"); 
				var ես=բ.select(եռ, "&::before"); 
					ես.value("content", "'• '");
					ես.value("color", (color.red.text));
					ես.value("font-weight", "bold");
				
			
		
	
	var ետ=բ.select(են, "section"); 
		ետ.value("height", "calc(100% - 40px)");
	

var եր=բ.select(եի, ".fullscreen"); 
	եր.value("position", "fixed");
	եր.value("top, bottom, left, right", "0");

var եց=բ.select(եի, ".editor"); 
	եց.value("display", "inline-block");
	եց.value("position", "relative");
	եց.value("width", "calc(100% / " + (showCount.value) + ")");
	եց.value("height", "100%");

var եփ=բ.select(եի, ".x"); 
	var եք=բ.select(եփ, ".top, .bottom"); 
		եք.value("display", "inline-block");
		եք.value("width", "50%");
		եք.value("height", "100vh");
	

var եօ=բ.select(եի, ".y"); 
	var եֆ=բ.select(եօ, ".top, .bottom"); 
		եֆ.value("height", "50vh");
	

var եև=բ.select(եի, ".text"); 
	եև.value("padding", "8px");
	եև.value("width, height", "100%");
	եև.value("border", "none");
	եև.value("font-family", "monospace");
	եև.value("resize", "none");
	var զա=բ.select(եև, "&:focus"); 
		զա.value("outline", "none");
	

var զբ=բ.select(եի, ".color-red"); 
	զբ.value("color", (color.red.text));


var զդ=բ.select(եի, ".CodeMirror"); 
	զդ.value("height", "100%");
	զդ.value("border-top, border-bottom", "1px solid silver");
	var զե=բ.select(զդ, ".error::before, .warn::before"); 
		զե.value("position", "absolute");
		զե.value("font-size", ".8em");
	
	var զզ=բ.select(զդ, ".error::before"); 
		զզ.value("content", "'🛑'");
	
	var զէ=բ.select(զդ, ".warn::before"); 
		զէ.value("content", "'⚠️'");
	
return եի.content}, գ, ե, [showCount], [])}], [բ.append, document.head, զ, 0, 0]);բ(this, document.body, ե, զ, [բ.update, {args:[բ.attr(2, "class", alignment), բ.attr(2, "class:has-errors", բ.computedObservable(this, ե, [result], function(){return result.value.errors.length}, [])), բ.attr(2, "class:has-warnings", բ.computedObservable(this, ե, [result], function(){return result.value.warnings.length}, []))]}], [բ.body, ժ, function(գ, զ, ժ){

	բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(0, "class", "top")]}], [բ.body, ժ, function(գ, զ, ժ){
		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(0, "class", "filename")]}], [բ.body, ժ, function(գ, զ, ժ){
			if(hash) {
				բ(this, գ, ե, զ, [բ.create, "span", {args:[բ.attr(1, "textContent", hash.name)]}], [բ.append, գ, զ]);
			} else {
				բ(this, գ, ե, զ, [բ.create, "input", {}], [բ.forms, ["", file]], [բ.append, գ, զ]);
				if(window.localStorage) {
					բ(this, գ, ե, զ, [բ.create, "select", {}], [բ.body, ժ, function(գ, զ, ժ){
						բ.forEach(this, Object.keys(window.localStorage).sort() , function(key) {
							if(key.substr(0, 8) == "storage.") {
								var value = key.substr(8);
								բ(this, գ, ե, զ, [բ.create, "option", {args:[բ.attr(0, "value", value), բ.attr(1, "textContent", value)]}], [բ.append, գ, զ]);
							}
						});
					}], [բ.forms, ["", file]], [բ.append, գ, զ]);
				}
			}
			բ.bindEach(this, գ, ե, զ, content, function(){return content.value.show }, function(գ, ե, զ, type) {
				բ(this, գ, ե, զ, [բ.create, "label", {args:[բ.attr(0, "style", "margin-left:12px")]}], [բ.body, ժ, function(գ, զ, ժ){
					բ(this, գ, ե, զ, [բ.create, "input", {args:[բ.attr(0, "style", "vertical-align:middle"), բ.attr(0, "type", "checkbox")]}], [բ.forms, ["", բ.computedObservable(this, ե, [content], function(){return content.value.show[type]}, [])]], [բ.append, գ, զ]);բ.text(գ, ե, զ, "\n\
					" + (type.toUpperCase()) + "\n\
				");}], [բ.append, գ, զ]);
			});
			բ(this, գ, ե, զ, [բ.create, "label", {args:[բ.attr(0, "style", "margin-left:12px")]}], [բ.body, ժ, function(գ, զ, ժ){բ.text(գ, ե, զ, "\n\
				debug\n\
				");բ(this, գ, ե, զ, [բ.create, "input", {args:[բ.attr(0, "style", "vertical-align:middle"), բ.attr(0, "type", "checkbox")]}], [բ.forms, ["", debugMode]], [բ.append, գ, զ]);
			}], [բ.append, գ, զ]);
			բ(this, գ, ե, զ, [բ.create, "select", {args:[բ.attr(0, "style", "margin-left:12px")]}], [բ.body, ժ, function(գ, զ, ժ){
				բ(this, գ, ե, զ, [բ.create, "option", {args:[բ.attr(0, "value", "y")]}], [բ.body, ժ, function(գ, զ, ժ){բ.text(գ, ե, զ, "Vertical");}], [բ.append, գ, զ]);
				բ(this, գ, ե, զ, [բ.create, "option", {args:[բ.attr(0, "value", "x")]}], [բ.body, ժ, function(գ, զ, ժ){բ.text(գ, ե, զ, "Horizontal");}], [բ.append, գ, զ]);
			}], [բ.forms, ["", alignment]], [բ.append, գ, զ]);
			բ(this, գ, ե, զ, [բ.create, "a", {args:[բ.attr(0, "id", "github"), բ.attr(0, "href", "https://github.com/sactory/sactory"), բ.attr(0, "target", "_blank"), բ.attr(1, "hidden", true)]}], [բ.append, գ, զ]);
			բ(this, գ, ե, զ, [բ.create, "span", {args:[բ.attr(0, "style", "float:right;font-weight:bold;color:darkviolet;cursor:pointer"), բ.attr(1, "textContent", ("Sactory v" + Sactory.VERSION)), բ.attr(3, "click", function(event){ this.previousElementSibling.click() })]}], [բ.append, գ, զ]);
		}], [բ.append, գ, զ]);
		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(0, "class", "input")]}], [բ.body, ժ, function(գ, զ, ժ){
			բ.forEach(this, ["js", "html", "css"] , function(type) {
				բ.bindIfElse(this, գ, ե, զ, [[function(){return (content.value.show[type])}, [content]]], function(գ, ե, զ) {
					բ(this, գ, ե, զ, [բ.create, "div", {args:[բ.attr(0, "id", type), բ.attr(0, "class", "editor")]}], [բ.body, ժ, function(գ, զ, ժ){
						բ(this, գ, ե, զ, [բ.create, "textarea", {args:[բ.attr(1, "value", content.value.content[type])]}], [բ.body, ժ, function(գ, զ, ժ){
							բ.on(this, գ, ե, "documentappend", function(){
								inputs[type] = CodeMirror.fromTextArea(this, {
									lineNumbers: true,
									indentWithTabs: true,
									smartIndent: false,
									lineWrapping: true,
									mode: type == "js" ? "javascript" : (type == "html" ? "htmlmixed" : "css")
								});
								բ.query(this, գ, գ, this.nextElementSibling, false, function(գ, դ){բ(this, գ, ե, զ, [բ.update, {args:[բ.attr(3, (բ.config.shortcut.save)+":prevent", save)]}])})
							});
						}], [բ.append, գ, զ, 0, 0]);
						բ(this, գ, ե, զ, [բ.create, "select", {args:[բ.attr(0, "class", "mode")]}], [բ.body, ժ, function(գ, զ, ժ){
							բ.forEach(this, modes[type] , function(m) {
								բ(this, գ, ե, զ, [բ.create, "option", {args:[բ.attr(0, "value", m), բ.attr(1, "textContent", m)]}], [բ.append, գ, զ]);
							});
						}], [բ.forms, ["", բ.computedObservable(this, ե, [content], function(){return content.value.mode[type]}, [])]], [բ.append, գ, զ]);
					}], [բ.append, գ, զ]);
				});
			});
		}], [բ.append, գ, զ]);
	}], [բ.append, գ, զ]);

	բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(0, "class", "bottom")]}], [բ.body, ժ, function(գ, զ, ժ){

		բ(this, գ, ե, զ, [բ.create, "nav", {}], [բ.body, ժ, function(գ, զ, ժ){
			բ(this, գ, ե, զ, [բ.create, "div", {args:[բ.attr(0, "style", "margin:8px 0 10px")]}], [բ.body, ժ, function(գ, զ, ժ){
				բ.forEach(this, Object.keys(tabs) , function(key) {
					բ(this, գ, ե, զ, [բ.create, "span", {args:[բ.attr(0, "class", "item"), բ.attr(2, "class", key), բ.attr(2, "class:active", բ.computedObservable(this, ե, [tab], function(){return (tab.value == key)}, [])), բ.attr(3, "click", function(event){ tab.value = key }), բ.attr(1, "textContent", tabs[key])]}], [բ.append, գ, զ]);
				});
			}], [բ.append, գ, զ]);
		}], [բ.append, գ, զ]);

		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(1, "visible", բ.computedObservable(this, ե, [tab], function(){return (tab.value == "output")}, []))]}], [բ.body, ժ, function(գ, զ, ժ){
			բ.bindIfElse(this, գ, ե, զ, [[function(){return (!result.value.error)}, [result]]], function(գ, ե, զ) {
				բ(this, գ, ե, զ, [բ.create, "iframe", {args:[բ.attr(0, "style", "width:100%;height:100%;border:none"), բ.attr(0, "src", "about:blank")]}], [բ.body, ժ, function(գ, զ, ժ){
					բ.on(this, գ, ե, "documentappend", function(){
						window.sandbox = this.contentWindow;
						բ.query(this, գ, գ, this.contentWindow.document.head, false, function(գ, դ){բ(this, գ, ե, զ, [բ.body, ժ, function(գ, զ, ժ){
							բ(this, գ, ե, զ, [բ.create, "meta", {args:[բ.attr(0, "charset", "UTF-8")]}], [բ.append, գ, զ]);
							բ(this, գ, ե, զ, [բ.create, "script", {args:[բ.attr(0, "src", բ.computedObservable(this, ե, [debugMode], function(){return ("./dist/sactory" + (debugMode.value ? ".debug" : "") + ".js")}, []))]}], [բ.append, գ, զ, 0, 0]).onload = function(){
								բ(this, գ, ե, զ, [բ.create, "script", {args:[բ.attr(1, "textContent", բ.computedObservable(this, ե, [result], function(){return (result.value.before + result.value.source + result.value.after)}, []))]}], [բ.append, գ, զ, 0, 0])
							};
						}])})
					});
				}], [բ.append, գ, զ, 0, 0]);
			});
		}], [բ.append, գ, զ]);

		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(1, "visible", բ.computedObservable(this, ե, [tab], function(){return (tab.value == "error")}, []))]}], [բ.body, ժ, function(գ, զ, ժ){
			բ(this, գ, ե, զ, [բ.create, "textarea", {args:[բ.attr(0, "class", "text color-red"), բ.attr(0, "readonly"), բ.attr(1, "value", բ.computedObservable(this, ե, [result], function(){return result.value.errors.join('\n')}, []))]}], [բ.append, գ, զ]);
		}], [բ.append, գ, զ]);

		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(1, "visible", բ.computedObservable(this, ե, [tab], function(){return (tab.value == "warn")}, []))]}], [բ.body, ժ, function(գ, զ, ժ){
			բ(this, գ, ե, զ, [բ.create, "textarea", {args:[բ.attr(0, "class", "text"), բ.attr(0, "readonly"), բ.attr(1, "value", բ.computedObservable(this, ե, [result], function(){return (result.value.warnings ? result.value.warnings.join('\n') : "")}, []))]}], [բ.append, գ, զ]);
		}], [բ.append, գ, զ]);

		բ.bindIfElse(this, գ, ե, զ, [[function(){return (tab.value == "code")}, [tab]]], function(գ, ե, զ) {
			բ(this, գ, ե, զ, [բ.create, "section", {}], [բ.body, ժ, function(գ, զ, ժ){
				բ.forEach(this, ["js", "html", "css"] , function(type) {
					բ.bindIfElse(this, գ, ե, զ, [[function(){return (content.value.show[type])}, [content]]], function(գ, ե, զ) {
						բ(this, գ, ե, զ, [բ.create, "div", {args:[բ.attr(0, "id", ("output-" + type)), բ.attr(0, "class", "editor")]}], [բ.body, ժ, function(գ, զ, ժ){
							բ(this, գ, ե, զ, [բ.create, "textarea", {args:[բ.attr(1, "value", (result.value[type] || ""))]}], [բ.body, ժ, function(գ, զ, ժ){
								բ.on(this, գ, ե, "documentappend", function(){
									outputs[type] = CodeMirror.fromTextArea(this, {
										lineNumbers: true,
										lineWrapping: true,
										readOnly: true,
										mode: "javascript"
									});
								});
							}], [բ.append, գ, զ]);
						}], [բ.append, գ, զ, 0, 0]);
					});
				});
			}], [բ.append, գ, զ]);
		});

		բ(this, գ, ե, զ, [բ.create, "section", {args:[բ.attr(1, "visible", բ.computedObservable(this, ե, [tab], function(){return (tab.value == "info")}, []))]}], [բ.body, ժ, function(գ, զ, ժ){
			բ(this, գ, ե, զ, [բ.create, "textarea", {args:[բ.attr(0, "class", "text"), բ.attr(0, "readonly"), բ.attr(1, "value", բ.computedObservable(this, ե, [result], function(){return (result.value.errors.length ? "" : JSON.stringify(result.value.info, null, 4))}, []))]}], [բ.append, գ, զ]);
		}], [բ.append, գ, զ]);

	}], [բ.append, գ, զ]);

}])


});})