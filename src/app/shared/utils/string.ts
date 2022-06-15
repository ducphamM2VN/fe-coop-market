export function contains(text: string, term: string): boolean {
    // return text.search(term) >= 0;
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
}

