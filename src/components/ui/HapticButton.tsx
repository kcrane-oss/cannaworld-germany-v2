import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useHaptics } from "@/hooks/useHaptics";

type HapticType = "light" | "medium" | "heavy" | "success" | "error" | "warning";

interface HapticButtonProps extends ButtonProps {
  haptic?: HapticType;
}

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ haptic = "light", onClick, ...props }, ref) => {
    const { lightImpact, mediumImpact, heavyImpact, successNotification, errorNotification, warningNotification } = useHaptics();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      switch (haptic) {
        case "light": await lightImpact(); break;
        case "medium": await mediumImpact(); break;
        case "heavy": await heavyImpact(); break;
        case "success": await successNotification(); break;
        case "error": await errorNotification(); break;
        case "warning": await warningNotification(); break;
      }
      onClick?.(e);
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);
HapticButton.displayName = "HapticButton";
