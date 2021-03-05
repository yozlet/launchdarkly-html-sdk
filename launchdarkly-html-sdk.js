(function(){

    var jsSdkUrl = "https://unpkg.com/launchdarkly-js-client-sdk/dist/ldclient.min.js";
    var activeElements = getActiveElements();
    var client_key = getClientKey();
    loadLdJsSDK(jsSdkUrl, initSdk);

    // Returns an array of all elements with ld-data-* attributes
    function getActiveElements() {

    }

    // Returns the client key specified in a data-ld-clientkey attr
    function getClientKey() {

    }

    // Dynamically loads the LaunchDarkly browser-JS SDK
    function loadLdJsSDK(url, handler){
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.crossOrigin = "anonymous";
    
        scriptTag.onload = handler;
        scriptTag.onreadystatechange = handler;
    
        document.body.appendChild(scriptTag);    
    }

    // Performs initial flag evaluations and sets up change handlers
    function initSdk() {

    }

    function getConfigAndUserFromMeta() {
        const BUILT_INS = [
            "key",
            "email",
            "firstName",
            "lastName",
            "name",
            "avatar",
            "ip",
            "country",
            "anonymous",
        ];

        const privateAttributeNames = [];

        let result = { user: { anonymous: true, custom: {} }, config: { pr } };
        return Array.from(document.querySelectorAll("head meta[property^='ld:']"))
            .map(function (elem) {
                console.log(elem);
                const [_, kind, name] = elem.getAttribute("property").split(":", 3);
                return (
                    (kind &&
                    name && [
                        kind,
                        name,
                        elem.getAttribute("content"),
                        elem.hasAttribute("data-private"),
                        elem.hasAttribute("data-json"),
                    ]) ||
                    null
                );
            })
            .filter(Boolean)
            .reduce(function (
                acc,
                [kind, name, value, is_private, should_parse_json]
                ) {
                    if (!acc.hasOwnProperty(kind) && kind !== "clientid") {
                        acc[kind] = {};
                    }
                    if (should_parse_json && (value != null || value != undefined)) {
                        try {
                        value = JSON.parse(value);
                        } catch (e) {
                        console.warn(
                            "ld meta: ",
                            kind,
                            name,
                            "invalid json value: ",
                            value
                            );
                        }
                    }

                    let target = acc[kind];
                    if (kind == "user") {
                        target = BUILT_INS.includes(name) ? acc.user : acc.user.custom;
                        if (
                        is_private &&
                        name != "key" &&
                        !acc.config.privateAttributeNames.includes(name)
                        ) {
                        acc.config.privateAttributeNames.push(name);
                        }
                    }
                    if (kind == "clientid") {
                        target = acc;
                        name = "clientid";
                        delete acc.clientid;
                    }
                    if (target.hasOwnProperty(name)) {
                        target[name] = [target[name], value];
                    } else {
                        target[name] = value;
                    }
                    return acc;
            },
        result);
    }
}())