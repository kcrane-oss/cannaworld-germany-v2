import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export function useHaptics() {
  const isNative = Capacitor.isNativePlatform();

  const lightImpact = async () => {
    if (!isNative) return;
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const mediumImpact = async () => {
    if (!isNative) return;
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const heavyImpact = async () => {
    if (!isNative) return;
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  const successNotification = async () => {
    if (!isNative) return;
    await Haptics.notification({ type: NotificationType.Success });
  };

  const warningNotification = async () => {
    if (!isNative) return;
    await Haptics.notification({ type: NotificationType.Warning });
  };

  const errorNotification = async () => {
    if (!isNative) return;
    await Haptics.notification({ type: NotificationType.Error });
  };

  const vibrate = async () => {
    if (!isNative) return;
    await Haptics.vibrate();
  };

  return {
    lightImpact,
    mediumImpact,
    heavyImpact,
    successNotification,
    warningNotification,
    errorNotification,
    vibrate,
  };
}
