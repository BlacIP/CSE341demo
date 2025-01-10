const bolroute = (req, res) => {
    res.send('Hello Boluwatife A');
};

const omotroute = (req, res) => {
    res.send('Hello Omotyinbo familiy');
};

const bobroute = (req, res) => {
    res.send('Hello Bob');
};

module.exports = {
    bobroute,
    bolroute,
    omotroute
};