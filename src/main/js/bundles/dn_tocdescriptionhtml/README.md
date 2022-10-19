# dn_tocdescriptionhtml

This bundle provides an additional toc action for map.apps toc bundle that allows you to use html in layer descriptions.

## Usage

Add the bundle "dn_tocdescriptionhtml" to your map.apps 4 app.

Configure the available selection methods in the toc bundle. This bundle adds the _show-html-description_.

Use all actions:
```json
"toc": {
    "Config": {
        "actions": [
            "*"
        ]
    }
},
```

Specify which actions should be used:
```json
"toc": {
    "Config": {
        "actions": [
            "show-description",
            "zoom-to-extent",
            "activate-children",
            "deactivate-children",
            "change-opacity",
            "show-copyright"
        ]
    }
},
```

## Configuration Reference

### HtmlDescriptionActionDefinitionFactory:
```json
"HtmlDescriptionActionDefinitionFactory": {
    "truncationThreshold": 200,
    "marginBox": null
}
```

| Property                       | Type    | Possible Values | Default                   | Description                                                                                                             |
|--------------------------------|---------|-----------------|---------------------------|------------------------------------------------------------------------------------------------------------------------ |
| truncationThreshold            | Number  |                 | ```200```                 | Maximum length of the description before it is displayed in a separate window.                                          |
| marginBox                      | Object  |                 | ```{"w": 320,"h": 520}``` | Dimensions of the separate description window.                                                                                                          |
