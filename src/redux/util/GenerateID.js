let lastId = 0;

export const GenerateID = (prefix='id') => {
    lastId++;
    return `${lastId}`;
}