export function getMatches(string: string, regex: RegExp, index: number = 1) {
    let matches = new Array<string | Array<string>>();
    let match: RegExpExecArray | null;
    while (match = regex.exec(string)) {
        if (index !== -1) {
            matches.push(match[index]);
        } else {
            matches.push(match);
        }
    }
    return matches;
}

export function kebabCaseToPascalCase(string: string) {
    let parts = string.split('-');
    for (let i = 0; i < parts.length; i++) {
        parts[i] = capitalizeFirstLetter(parts[i]);
    }
    return parts.join('');
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}