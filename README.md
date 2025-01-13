# Firefox Temporary Web Extension settings

```bash
about:debugging#/runtime/this-firefox
```

## Docs

<https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/>

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
