declare type Element = {
    tag: string;
    attributes: Attribute[];
    children: Array<Element | TextNode>;
    type: "Element",
    closed: boolean;
}

declare type TextNode = {
    text: string;
    type: "text"
}

declare type Attribute = {
    name: string;
    value: string;
}

type pos = -1 | { start: Number, end: number };

export {
    Element,
    TextNode,
    Attribute,
    pos
}