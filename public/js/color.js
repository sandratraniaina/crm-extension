const generateRandomColor = (number) => {
    return Array(number).fill().map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
};