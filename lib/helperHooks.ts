import {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getNavigation } from "./constants/navigationFinder";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useUser } from "@/components/contexts/UserContext";
import { useSettings } from "@/components/contexts/SettingsContext";
import { evaluateGoogleAuthCode } from "@/lib/dataLayer/client/accountStateCommunicator";
import { useToast } from "@/components/contexts/ToastContext";

export function useNavigation(): NavigationKey {
  const pathname = usePathname();
  const navigation = useMemo(() => {
    return getNavigation(pathname);
  }, [pathname]);

  return navigation;
}

export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useSwipe = ({
  left,
  right,
  up,
  down,
  subjectRef,
  respectDisableGesturesSetting = true,
}: {
  left?: () => void;
  right?: () => void;
  up?: () => void;
  down?: () => void;
  subjectRef?: RefObject<any>;
  respectDisableGesturesSetting?: boolean;
}) => {
  const { settings } = useSettings();
  const touchCoordsRef = useRef({ x: 0, y: 0, time: Date.now() });
  const fnsRef = useRef({ up, down, left, right });
  fnsRef.current = {
    up,
    left,
    down,
    right,
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { clientX, clientY } = e.targetTouches[0];
    touchCoordsRef.current = { x: clientX, y: clientY, time: Date.now() };
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (settings.disableGestures && respectDisableGesturesSetting) return;
      const { clientX: touchEndX, clientY: touchEndY } = e.changedTouches[0];
      const {
        x: touchStartX,
        y: touchStartY,
        time: touchStartTime,
      } = touchCoordsRef.current;
      const elapsedTime = (Date.now() - touchStartTime) / 1000;
      const threshold = 40;
      const swipeSpeed = 5; // sec;

      if (elapsedTime > swipeSpeed) return;

      const xDistance = touchStartX - touchEndX;
      const yDistance = touchStartY - touchEndY;

      if (Math.abs(xDistance) < threshold && Math.abs(yDistance) < threshold)
        return;

      if (Math.abs(xDistance) >= Math.abs(yDistance)) {
        xDistance > 0 ? fnsRef.current.right?.() : fnsRef.current.left?.();
      } else {
        yDistance > 0 ? fnsRef.current.down?.() : fnsRef.current.up?.();
      }
    },
    [settings, respectDisableGesturesSetting]
  );

  useEffect(() => {
    const subject = subjectRef?.current;
    if (!subject) return;

    subject.addEventListener("touchstart", handleTouchStart, { passive: true });
    subject.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      subject.removeEventListener("touchstart", handleTouchStart);
      subject.removeEventListener("touchend", handleTouchEnd);
    };
  }, [subjectRef, handleTouchStart, handleTouchEnd]);
};

export function useNextRenderEffect(callback: () => void, dependencies: any[]) {
  const [hasExecuted, setHasExecuted] = useState(true);

  useEffect(() => {
    if (hasExecuted) {
      return;
    }

    callback();
    setHasExecuted(true);
  }, [hasExecuted, callback, ...dependencies]);

  return () => {
    setHasExecuted(false);
  };
}

export function useClientSideFlag(checkFunction: () => boolean): boolean {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(checkFunction());
  }, [checkFunction]);

  return status;
}

export function useClientSideLogic<T>(
  checkFunction: () => T,
  defaultValue: T | null = null
): T | null {
  const [status, setStatus] = useState<T | null>(defaultValue);

  useEffect(() => {
    setStatus(checkFunction());
  }, [checkFunction]);

  return status;
}

export default function useSiteLogin(
  onError:
    | ((
        errorResponse: Pick<
          CodeResponse,
          "error" | "error_description" | "error_uri"
        >
      ) => void)
    | undefined = () => {}
) {
  const { setUser } = useUser();
  const { settings, updateSettings } = useSettings();
  const { appendToast } = useToast();

  const validateCode = async (codeResponse: any) => {
    const codeAuth = codeResponse.code;
    const userData = await evaluateGoogleAuthCode(codeAuth, settings);
    if (userData === null) {
      return;
    }
    setUser(userData);
    if (userData.websiteSettings !== null) {
      updateSettings(userData.websiteSettings, false);
    }

    appendToast({
      title: "Zimo Web",
      description: `Signed in as ${userData.name}.`,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      validateCode(codeResponse);
    },
    flow: "auth-code",
    onError: onError,
  });

  return { login };
}

export function useInputParser<T>({
  value,
  setValue,
  isValid,
  formatValue,
  forceTrim = true,
}: InputParserData<T> & { forceTrim?: boolean }): [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void
] {
  const [storedValue, setStoredValue] = useState<string>(
    `${formatValue(`${value}`)}`
  );

  const handleChange = (event: ChangeEvent<any>) => {
    let eventValue = event.target.value;
    if (forceTrim) {
      eventValue = eventValue.trim();
    }

    setStoredValue(eventValue);

    if (!isValid(eventValue)) {
      return;
    }

    const formattedValue = formatValue(eventValue);
    setValue(formattedValue);
  };

  useEffect(() => {
    setStoredValue(`${formatValue(`${value}`)}`);
  }, [value, formatValue]);

  return [storedValue, handleChange];
}
