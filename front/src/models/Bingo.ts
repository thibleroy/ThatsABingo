export class BingoItem {
    id: string;
    value: string;
}
export interface BingoCard {
    name: string;
    id: string;
    bingoItems: BingoItem[];
}
export const bingoTopics = {
    items: {
        GET: 'getBingoItems',
        ADD: 'addBingoItems',
        EDIT: 'editBingoItems',
        REMOVE: 'removeBingoItems'
    },
    cards: {
        GET: 'getBingoCards',
        ADD: 'addBingoCards',
        EDIT: 'editBingoCards',
        REMOVE: 'removeBingoCards'
    }
};
