import createHttpError from 'http-errors';
import {
  signup,
  existingUser,
  deletedSession,
  findSessionByToken,
} from '../services/auth-services.js';
import { passwordValid } from '../constants/users-constants.js';
import { compareHash } from '../utils/hash.js';
import { createSession } from '../services/session-services.js';
import { generateTokens } from '../utils/generateTokens.js';

export const signupController = async (req, res, next) => {
  try {
    const { password, repeatPassword, name, surname, email } = req.body;

    if (!name) {
      throw createHttpError(400, 'Поле Ім’я не може бути порожнім');
    }
    if (!surname) {
      throw createHttpError(400, 'Поле Прізвище не може бути порожнім');
    }
    if (!password || !repeatPassword) {
      throw createHttpError(400, 'Пароль і повтор паролю є обов’язковими');
    }
    if (password !== repeatPassword) {
      throw createHttpError(400, 'Паролі не співпадають');
    }
    if (!passwordValid.test(password)) {
      throw createHttpError(
        400,
        'Пароль повинен містити щонайменше 8 символів, включаючи літери та цифри',
      );
    }

    const user = await existingUser(email);
    if (user) {
      throw createHttpError(
        409,
        'Користувач з цією електронною адресою вже існує',
      );
    }
    console.log('Дані користувача для реєстрації:', { name, surname, email });

    const newUser = await signup({ name, surname, email, password });

    const tokens = generateTokens(newUser._id);
    await createSession(newUser._id, tokens);

    res.status(201).json({
      status: 201,
      user: {
        id: newUser._id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
      },
      tokens,
      message: 'Користувача успішно зареєстровано',
    });
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};

export const signinController = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const user = await existingUser(email);
    if (!user) {
      throw createHttpError(
        404,
        'Користувача з цією електронною адресою ще не існує',
      );
    }

    const passwordCompare = await compareHash(password, user.password);

    if (!passwordCompare) {
      throw createHttpError(401, 'Неправильний пароль');
    }

    const tokens = generateTokens(user._id);
    await createSession(user._id, tokens);

    res.status(201).json({
      status: 201,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
      tokens,
      message: 'Вхід виконано успішно',
    });
  } catch (error) {
    console.error('Signin error:', err);
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const isRefreshToken = await findSessionByToken(refreshToken);
    if (!isRefreshToken) {
      throw createHttpError(404, 'Сесію не знайдено');
    }

    await deletedSession(refreshToken);

    res.status(200).json({
      status: 200,
      message: 'Вихід виконано успішно',
    });
  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
};
