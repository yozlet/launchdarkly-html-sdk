# LaunchDarkly HTML SDK

A module for controlling browser HTML with LaunchDarkly feature flags. It can be included in an HTML page without having to write any additional Javascript.

## Motivation

At last, LaunchDarkly support for the internet's most popular programming language.

With the addition of the LaunchDarkly HTML SDK, you can use feature flags to:

* add or remove CSS classes
* change the text content
* change an attribute value

... in any HTML element in the page, without writing Javascript. (But Javascript support is still required.)

This module is based on the LaunchDarkly Javascript SDK.

## Examples

```html
<!-- Adds the "blue-bg" class to this element
    when the "blue-panel" flag evaluates to true 
-->
<div data-ld-key="blue-panel" data-ld-addclass="blue-bg"></div>

<!-- after successful connection to LaunchDarkly or a proxy, this
    will evaluate the "h1-content" flag and replace the
    current inner text with the result; otherwise, the existing
    inner text will remain
-->
<h1 data-ld-key="h1-content" data-ld-innertext>Old Heading<h1>
```

## Usage

Add the module to your page using a `<script>` tag. Note the addition of the `data-ld-clientkey` attribute.

```html
<script src="launchdarkly-html-sdk.js" data-ld-clientkey="ADD YOUR CLIENT KEY HERE"></script>
```

Once loaded, the SDK will attempt to make a connection to the LaunchDarkly servers. After the connection is complete, all `data-ld` attributes in the page will be evaluated and their elements updated. There will be further updates as events warrant.

## Known Issues

### No user/context object

There are plenty of possible ways to do this, not just in the page; it may be useful for site cookies to be included.

### No support for multiple projects or environments

### No support for Relay Proxy or other flag sources
