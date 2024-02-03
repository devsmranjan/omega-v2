import { Router } from 'express';
import { ValidationChain, check } from 'express-validator';
import { signIn, signUp } from '../controllers';
import { validate, validateCredentials } from '../middlewares/validate.middleware';

const router = Router();

const signUpValidations: ValidationChain[] = [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('Enter a valid username'),
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Enter a valid password. Length should be minimum 6'),
    check('name').not().isEmpty().withMessage('Enter a valid name'),
];

// sign up for new user
router.post('/signup', signUpValidations, validate, signUp);

const signInValidations: ValidationChain[] = [
    // check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('Invalid credentials'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Invalid credentials'),
];

router.post('/signin', signInValidations, validateCredentials, signIn);

export const authRouter = router;
