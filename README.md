# LaunchDarkly HTML SDK

A module for controlling browser HTML with LaunchDarkly feature flags. It can be included in an HTML page without having to write any additional Javascript.

## Motivation

At last, LaunchDarkly support for the internet's most popular programming language.

With the addition of the LaunchDarkly HTML SDK, you can use feature flags to:

* change an attribute value
* change the text content
* add or remove CSS classes

... in any HTML element in the page, without writing Javascript. (But Javascript support is still required.)

This module is based on the LaunchDarkly Javascript SDK.

## Examples

```html
<!-- Evaluate the `panel-height` and `panel-width` flags to get replacement
     height and width values. The existing height and width attribute values
     are the fallbacks.
-->
<div height="300" width="500"
    data-ld-height="panel-height" data-ld-width="panel-width">
</div>

<!-- Special attributes: `class` and `innertext`.
    `class` ADDS to the element's classlist rather than replacing it.
    `innertext` replaces the element's contents rather than an attribute.
-->

<!--
     Adds the value of the "blue-panel" flag as a class.
-->
<div class="panel" data-ld-class="blue-panel"></div>

<!-- Replaces the content of this element with the value of 
     the "h1-content" flag.
-->
<h1 data-ld-innertext="h1-content" >Old Heading<h1>
```

## Usage

By default, the SDK looks for configuration and user data (including the client ID) in the page's `<meta>` elements. For example:

```html
<meta property="ld:clientid" content="foo">
<meta property="ld:config:sendEvents" content="true" data-json>
<meta property="ld:user:name" content="hi" data-private>
<meta property="ld:user:groups" content="group1" >
<meta property="ld:user:groups" content="group2">
```

Add the module to your page using a `<script>` tag. 

```html
<script src="launchdarkly-html-sdk.js"></script>
```

Once loaded, the SDK will attempt to make a connection to the LaunchDarkly servers. After the connection is complete, all `data-ld` attributes in the page will be evaluated and their elements updated. There will be further updates as events warrant.

## Known Issues

### Better use of booleans

The initial API design depended far more heavily on boolean flags, whereas this design effectively removes their use. We need a middle ground.

### No support for multiple projects or environments


## Credits

All of this by Tarq & Yoz.