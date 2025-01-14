# Released on Firefox

<https://addons.mozilla.org/en-US/firefox/addon/suggestions-purge/>

# Released on Chrome

<TBD>

## Firefox Temporary Web Extension settings

```bash
about:debugging#/runtime/this-firefox
```

## Docs

<https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/>

# Chrome Temparary Web Extension 

```bash
chrome://extensions/

# Go to --> Load unpacked and navigate to dur. where your manifest.json is located
```

## Docs / Guide

<https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world>


### Release scripts

```bash
#create ne 'release' directory with needed artifacts
mkdir -p release && cp manifest.json main.js release

#add icons folder to release dir
cp icons/icon-48.png icons/icon-96.png release

cd release

zip -r suggestions-purge.zip .
```

### Follow next steps to publish your zipped artifacts

1. reate a Firefox Add-ons Account

    Register at [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/) (AMO).

2. Submit Your Extension

    Log in to your AMO account.
    Go to Tools for Developers → Submit a New Add-on.
    Follow the steps to upload your ZIP package.

3. Fill in Metadata

    Provide details like the extension name, description, supported languages, and categories.
    Add screenshots and promotional images (optional but recommended).

4. Review Process

    Mozilla will review your extension for policy compliance. The review can take from a few hours to several days.

5. Publish

    Once approved, the extension will be available on the Mozilla Add-ons website. You can share the link with users.

### Other browsers should have simmilar page in their settings

...

---

### Publishing to browser stores

#### Firefox

<https://extensionworkshop.com/documentation/publish/submitting-an-add-on/>

#### Chrome

<https://developer.chrome.com/docs/webstore/publish>

Account registration - devconsole
<https://chrome.google.com/webstore/devconsole/register>


#### Manifest v3 format

Docs

<https://developer.chrome.com/docs/extensions/reference/manifest>

more complex Example

<https://github.com/SimGus/chrome-extension-v3-starter/blob/master/manifest.json>

#### V3 requires Extension Key to be present in the `manifest.json`

- Chrome

<https://developer.chrome.com/docs/extensions/reference/manifest/key>

- Firefox (Gecko)

<https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings>

<https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/>


### Privacy policy is published on github pages

<https://dommyrock.github.io/sug-purge/>

```bash
# privacy branch contains all tne necesary static files for hosting privacy pages.
git checkout privacy
```