class MissingClosingTagError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class OpeningClosingTagMissMatchError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export {
    MissingClosingTagError,
    OpeningClosingTagMissMatchError
}