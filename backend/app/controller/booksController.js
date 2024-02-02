const bookService = require('../services/bookService');
const HttpStatus = require('http-status');
const axios = require("axios");

exports.getAllBooks = async (req, res) => {
    try {
        const priceParam = req.query.price;
        const priceOption = req.query.option;
        const limitParam = parseInt(req.query.limit) || 10;
        const pageParam = parseInt(req.query.page) || 1;

        const startIndex = (pageParam - 1) * limitParam;
        const endIndex = pageParam * limitParam;

        const books = await bookService.getAllBooks(priceParam, priceOption, limitParam, startIndex, endIndex);

        const response = {
            totalBooks: books.length,
            books: books,
            currentPage: pageParam,
            totalPages: Math.ceil(books.length / limitParam)
        };

        res
            .status(HttpStatus.OK)
            .json(response);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};
async function sendNotificationToVK(message) {
    try {
        const vkToken = 'YOUR_VK_ACCESS_TOKEN';
        const vk_userid = 330882826; // Идентификатор группы или аккаунта VK

        // Выполняем POST-запрос к API VK
        const response = await axios.post(`https://api.vk.com/method/messages.send`, {
            access_token: vkToken,
            peer_id: vk_userid,
            message: message,
            random_id: Math.floor(Math.random() * 1000000000), // Уникальный идентификатор сообщения
            v: '5.131' // Версия API VK
        });

        console.log('Notification sent to VK:', response.data);
    } catch (error) {
        console.error('Error sending notification to VK:', error);
    }
}

exports.addBook = async (req, res) => {
    try {
        const book = req.body;
        const message = await bookService.addBook(book);

        // Отправляем уведомление на VK
        await sendNotificationToVK(`Добавлена новая книга: ${book.title}`);

        // Отправляем уведомление на сервер Telegram
        axios.post('http://localhost:3001/info', book)
            .then(() => console.log("SENT TO THE TELEGRAM BOT SERVER!"))
            .catch(error => console.error('Error sending request:', error));

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateBook = req.body;

        const message = bookService.updateBookById(bookId, updateBook);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const message = bookService.deleteBookById(bookId);

        res
            .status(HttpStatus.OK)
            .json(message);
    } catch (error) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
};
