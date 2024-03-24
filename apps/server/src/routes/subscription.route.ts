import { Router } from 'express';
import {
    addSubscription,
    addSubscriptionCallback,
    fetchAllSubscriptions,
    removeSubscription,
    updateSubscription,
} from '../controllers/subscriptions.controller';
import { authenticated } from '../middlewares';
import { endpoints } from '../utils';

export const router = Router();

// fetch all subscriptions data
// query - uid , for individual
router.get('/', authenticated, fetchAllSubscriptions);

// add subscription -  start google sign in process for subscription
router.get(endpoints.SUBSCRIPTIONS_ADD_GOOGLE, authenticated, addSubscription);

// google sign in callback process for subscription
router.get(endpoints.SUBSCRIPTIONS_ADD_GOOGLE_CALLBACK, addSubscriptionCallback);

// update subscription data
router.put('/', authenticated, updateSubscription);

// fetch all subscriptions data
// router.put(endpoints.SUBSCRIPTIONS_UPDATE_SUBSCRIPTION, authenticated, updateSubscription);

// remove subscription
router.delete('/:subUid', authenticated, removeSubscription);

export const subscriptionRouter = router;
