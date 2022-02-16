import smartPlurals from 'smart-plurals'
import { trim } from '../utils';

export default function pluralize(string, amount, lang = 'en') {
    let values = string.split('|').map((item) => {
        if (typeof item === 'string' || item instanceof String) {
            item = trim(item);
        }
        return item;
    });

    return smartPlurals.Plurals.getRule(lang)(parseInt(amount), values);
}
