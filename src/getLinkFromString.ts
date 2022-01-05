function getLinkFromString(s: string): string {
    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    const URLRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
    const match = URLRegex.exec(s);
    return match ? match[0] : null;
}

export { getLinkFromString }