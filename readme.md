<h1 align="center">
    html to object
</h1>

This library was written to convert HTML string to JSON/JS Object.

# Example

## From 

```HTML
<div>
    <div>
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <p class="my-class" id="my-id" data-custom="custom-data">
            Hello, world!
        </p>
    </div>
</div>
```

## To

```json
{
    "tag": "parse-root",
    "children": [
        {
            "tag": "div",
            "children": [
                {
                    "tag": "div",
                    "children": [
                        {
                            "tag": "p",
                            "children": [
                                {
                                    "type": "text",
                                    "text": "First paragraph"
                                }
                            ],
                            "closed": true,
                            "type": "Element",
                            "attributes": []
                        },
                        {
                            "tag": "p",
                            "children": [
                                {
                                    "type": "text",
                                    "text": "Second paragraph"
                                }
                            ],
                            "closed": true,
                            "type": "Element",
                            "attributes": []
                        },
                        {
                            "tag": "p",
                            "children": [
                                {
                                    "type": "text",
                                    "text": "Hello, world!"
                                }
                            ],
                            "closed": true,
                            "type": "Element",
                            "attributes": [
                                {
                                    "name": "class",
                                    "value": "my-class"
                                },
                                {
                                    "name": "id",
                                    "value": "my-id"
                                },
                                {
                                    "name": "data-custom",
                                    "value": "custom-data"
                                }
                            ]
                        }
                    ],
                    "closed": true,
                    "type": "Element",
                    "attributes": []
                }
            ],
            "closed": true,
            "type": "Element",
            "attributes": []
        }
    ],
    "closed": false,
    "attributes": [],
    "type": "Element"
}
```

# Importing the module

```js
// ES6 / TypeScript
import Parser from "node-html-to-object";

// CommonJS
const { Parser } = require("node-html-to-object");
```

# Using the module

```js
// input data
const html = '<div><div><p>First paragraph</p><p>Second paragraph</p><p class="my-class" id="my-id" data-custom="custom-data">Hello, world!</p></div></div>';

// conversion
const result = Parser.parse(html);
```