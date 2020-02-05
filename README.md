# DIU.Neos.AnchorLink

Extends the Neos CKE5 linkeditor with server-side resolvable anchor links.

![anchorlink](https://user-images.githubusercontent.com/837032/72664973-de351880-3a14-11ea-8d2b-a379b7c7bb47.gif)

## Installation

1. Install the package: `composer require diu/neos-anchorlink`

2. Enable additional linking options with such config:

```
"Neos.NodeTypes.BaseMixins:TextMixin": # Or other nodetype
  properties:
    text:
      ui:
        inline:
          editorOptions:
            linking:
              anchorLink: true
```

3. Create a class implementing `AnchorLinkResolverInterface` that would take current content node, link and a searchTerm and return an array of options for the link anchor selector and configure it in `Objects.yaml` like this:

```
'DIU\Neos\AnchorLink\Controller\AnchorLinkController':
  properties:
    resolver:
      object: Your\Custom\AnchorLinkResolver
```

Out of the box this package is shipped with `ContentNodeAnchorLinkResolver`, it allows linking to any content nodes within the target node.

It's possible to disable the searchbox or adjust its threshold via Settings.yaml, the default settings are:

```
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        "Diu.Neos.AnchorLink":
          displaySearchBox: true
          threshold: 0
```

## Development

If you need to adjust anything in this package, just do so and then rebuild the code like this:

```
cd Resources/Private/AnchorLink
yarn && yarn build
```

And then commit changed filed including Plugin.js
