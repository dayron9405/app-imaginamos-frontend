export const ALERTS_ACTION = 'ALERTS_ACTION';
export const alertsOpenClose = (state) => {
    return {
        type: ALERTS_ACTION,
        payload: state
    };
};