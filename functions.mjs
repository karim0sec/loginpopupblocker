export function GetAppByName(apps, name) {
    return apps.filter(function (app) {
        return app.name === name; 
    });
}

export function GetAppByURL(apps, url) {
    return apps.filter(function(app) {
        var urlPattern = /((?:http|ftp)s?):\/\/([^\/]+)(\/.*)?/;
        var prepUrl = "";
        let match;

        if ((match = app.url.match(urlPattern)) !== null) {
            prepUrl = match[1]+"://"+match[2].replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\*\\./g,'(?:[^/]*\\.)*').replace(/\*$/,'[^/]*');
            if (match[3]) { 
                prepUrl+= match[3].replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\/\*(?=$|\/)/g, '(?:/[^]*)?');
            }
        }
        if (prepUrl) {
            var regex = RegExp("^" + prepUrl + "$", "i");
            if (url.match(regex)) {
                return app;
            }
        }
    });
}

export function UpdateApp(apps, app, enable) {
    let index = apps.findIndex((iApp) => iApp === app[0]);
    console.log(apps);
    console.log(app[0]);
    let updated = Object.assign(apps.slice(), {[index]: {...apps[index], enabled: enable}})
    if (index >= 0)
        chrome.storage.local.set({"apps": updated}, () => {
            console.log(`updated ${index}`);
            console.log(updated);
        });
    else
        console.log(`not found ${index}`);
}

export function ParseDynamicValue(input) {
    const regex = /\/shots\/\${(.*?)}/gm;
    let match;

    while ((match = regex.exec(input)) !== null) {
        if (match.index == regex.lastIndex) {
            regex.lastIndex++;
        }
        return match[1];
    }
}
