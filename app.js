chrome.runtime.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			import('/functions.mjs').then(func => {
				chrome.storage.local.get('apps', (data) => {
					let apps = data.apps;
					var app = func.GetAppByURL(apps, document.URL)[0];
					if (app.enabled === true) {
						app.elements.forEach(element => {
							let items = $(element.selector);
							switch (element.action) {
								case "remove":
									items.remove();
									break;
								case "remove parent":
									items.parentElement.remove();
									break;
								case "style":
									if (element.css) {
										element.css.forEach(style => {
											items.css(style.name, style.value);
										});
									}
									break;
								case "attr":
									if (element.attributes) {
										element.attributes.forEach(attribute => {
											items.attr(attribute.name, attribute.value);
										});
									}
									break;
								case "void":
									console.log('voiding');
									if (app.module && element.func) {
										import(`/data/${app.module}.mjs`).then(module => {
											module[`${element.func}`](items);
										}).catch(exception => {
											console.log(`An error has occured\nApp: ${app.name}\nModule/Function: ${app.module}.mjs/${element.func}\n${exception}`);
										});
									}
									break;								  
								default:
									console.log(`Error in app: ${app.name}, element: ${element.selector}. Invalid action.`);
									break;
							}
						});
					}
				});
			});
		}
	}, 10);
});
