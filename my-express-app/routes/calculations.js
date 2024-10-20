const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let { num1, num2, operation } = req.body;

    // Converte num1 e num2 para números
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    // Verifica se a conversão foi bem-sucedida
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ message: 'Invalid numbers provided' });
    }

    let result;
    switch (operation) {
        case 'soma':
            result = num1 + num2;
            break;
        case 'subtrair':
            result = num1 - num2;
            break;
        case 'multiplicar':
            result = num1 * num2;
            break;
        case 'dividir':
            result = num2 !== 0 ? num1 / num2 : 'Não é possivel dividir por 0';
            break;
        default:
            return res.status(400).json({ message: 'Operação invalida' });
    }

    res.json({ num1, num2, operation, result });
});

module.exports = router;
