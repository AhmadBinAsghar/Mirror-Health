import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Check the type of the event that was received
    switch (type) {
        case EventType.DISMISSED:
            console.log('User dismissed notification', notification);
            break;
        case EventType.ACTION_PRESS:
            console.log('User pressed an action with ID:', pressAction?.id);
            // Handle the press action (e.g., navigate to a specific screen)
            break;
        default:
            console.log('Unknown background event type:', type);
            break;
    }
});