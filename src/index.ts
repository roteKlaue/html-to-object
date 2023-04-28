import { OpeningClosingTagMissMatchError, MissingClosingTagError } from "./error";
import { Element, pos, Attribute } from "./types";

class Parser {
    private static readonly a: string[] = ["br", "hr", "img", "input", "link", "meta", "area", "base", "col", "command", "embed", "keygen", "param", "source", "track", "wbr", "!DOCTYPE html"];
    public static parse(html: string) {
        const root: Element = {
            tag: 'parse-root', children: [], closed: false,
            attributes: [],
            type: "Element"
        };
        const objects = [root];
        let startPos: pos = { end: 0, start: 0 };
        let last = startPos;
        // @ts-ignore
        startPos = this.getNextTagPosition(html, startPos.start);
        let currentIndex = 0;

        do {
            // @ts-ignore
            const content = html.slice(last.end, startPos.start);
            if (content?.length) {
                objects[currentIndex].children.push({ type: "text", text: content });
            }
            // @ts-ignore
            const tag = html.slice(startPos.start, this.getNextTagPosition(html, startPos.start).end);
            const strippedTag = this.stripTagCharacters(tag).split(" ")[0];

            if (tag.includes("/")) {
                if (this.a.includes(strippedTag)) {
                    const newObject: Element = {
                        tag: strippedTag, children: [], closed: true, type: "Element",
                        attributes: this.parseAttributes(tag)
                    };
                    objects[currentIndex].children.push(newObject);
                } else {
                    const lastOpenObject = objects[objects.length - 1];
                    if (lastOpenObject.tag !== strippedTag) {
                        throw new OpeningClosingTagMissMatchError(`Unexpected closing tag ${strippedTag}. Expected closing tag for ${lastOpenObject.tag}`);
                    }
                    lastOpenObject.closed = true;
                    objects.pop();
                    currentIndex--;
                    while (objects[currentIndex]?.closed) {
                        objects.pop();
                        currentIndex--;
                    }
                }
            } else {
                const newObject: Element = {
                    tag: strippedTag, children: [], closed: false, type: "Element",
                    attributes: this.parseAttributes(tag)
                };
                objects[currentIndex].children.push(newObject);

                if (this.a.includes(strippedTag)) {
                    newObject.closed = true;
                } else {
                    objects.push(newObject);
                    currentIndex++;
                }
            }

            // @ts-ignore
            last = startPos;
            // @ts-ignore
        } while ((startPos = this.getNextTagPosition(html, startPos.end)) !== -1);

        if (objects.length !== 1) {
            throw new MissingClosingTagError(`Missing closing tag for ${objects[objects.length - 1].tag}`);
        }

        return root;
    }

    /**
     * Extracts attribute name-value pairs from an HTML tag and returns an array of objects.
     * @param {string} html - The HTML tag to parse.
     * @returns {Array} An array of objects representing the attributes of the HTML tag.
     */
    private static parseAttributes(html: string): Attribute[] {
        const attributeRegex = /([^\s=]+)="([^"]+)"/g;
        const attributeMatches = html.matchAll(attributeRegex);

        const attributes = [];
        for (const match of attributeMatches) {
            const attributeName = match[1], attributeValue = match[2];
            attributes.push({ name: attributeName, value: attributeValue });
        }
        return attributes;
    }

    /**
     * Finds the position of the next HTML tag in a string.
     * @param {string} html - The HTML string to search.
     * @param {number} startPos - The starting position to search from.
     * @returns {Object|number} An object with start and end positions of the tag, or -1 if no tag is found.
     */
    private static getNextTagPosition(html: string, startPos: number) {
        const tagStart = html.indexOf('<', startPos);
        if (tagStart === -1) return -1;

        const tagEnd = html.indexOf('>', tagStart);
        if (tagEnd === -1) return -1;

        return { start: tagStart, end: tagEnd + 1 };
    }

    /**
     * Strips "<", ">", and "/" characters from an HTML tag.
     * @param {string} tag - The HTML tag to strip characters from.
     * @returns {string} The tag name without any characters.
     */
    private static stripTagCharacters(tag: string) {
        return tag.replace(/[<>/]/g, '');
    }
}

export default Parser;
export { Parser };