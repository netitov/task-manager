export async function sendNotification(title, options) {
  if ('Notification' in window && Notification.permission === 'granted') {
    //check if browser supports notification
    try {
      //send notification
      await new Notification(title, options);
    } catch (error) {
      console.error(error);
    }
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    //send another permissionrequest of it wasn't denied
    await Notification.requestPermission();

    //try to send notification again
    await sendNotification(title, options);
  }
}

export async function requestUserPermission() {
  if ('Notification' in window && Notification.permission !== 'denied') {
    await Notification.requestPermission();
  }
}
