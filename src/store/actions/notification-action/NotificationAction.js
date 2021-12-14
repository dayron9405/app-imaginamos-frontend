export const NOTIFICATION_ACTION = 'NOTIFICATION_ACTION';
export const notificationCardOpenClose = (state) => {
    return {
        type: NOTIFICATION_ACTION,
        payload: state
    };
};