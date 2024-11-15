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
import { useSettings } from "@/components/contexts/SettingsContext";

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
  allowMouse = true,
}: {
  left?: () => void;
  right?: () => void;
  up?: () => void;
  down?: () => void;
  subjectRef?: RefObject<any>;
  respectDisableGesturesSetting?: boolean;
  allowMouse?: boolean;
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

  const handleStart = useCallback((e: TouchEvent | MouseEvent) => {
    const { clientX, clientY } = "clientX" in e ? e : e.targetTouches[0];
    touchCoordsRef.current = { x: clientX, y: clientY, time: Date.now() };
  }, []);

  const handleEnd = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (settings.disableGestures && respectDisableGesturesSetting) return;
      if (!allowMouse && "clientX" in e) return;

      const { clientX: touchEndX, clientY: touchEndY } =
        "clientX" in e ? e : e.changedTouches[0];
      const {
        x: touchStartX,
        y: touchStartY,
        time: touchStartTime,
      } = touchCoordsRef.current;
      const elapsedTime = (Date.now() - touchStartTime) / 1000;
      const threshold = 40; // px
      const swipeTimeThreshold = 2.5; // sec

      if (elapsedTime > swipeTimeThreshold) return;

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

    subject.addEventListener("touchstart", handleStart, { passive: true });
    subject.addEventListener("touchend", handleEnd, { passive: true });
    subject.addEventListener("mousedown", handleStart, { passive: true });
    subject.addEventListener("mouseup", handleEnd, { passive: true });

    return () => {
      subject.removeEventListener("touchstart", handleStart);
      subject.removeEventListener("touchend", handleEnd);
      subject.removeEventListener("mousedown", handleStart);
      subject.removeEventListener("mouseup", handleEnd);
    };
  }, [subjectRef, handleStart, handleEnd]);
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
  const status = useClientSideLogic<boolean>(checkFunction, false);
  return status ?? false;
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

  const [cachedValue, setCachedValue] = useState<string>(
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
    if (`${formatValue(`${value}`)}` === `${formatValue(`${cachedValue}`)}`) {
      return;
    }

    setCachedValue(`${formatValue(`${value}`)}`);
    setStoredValue(`${formatValue(`${value}`)}`);
  }, [value, formatValue, cachedValue]);

  return [storedValue, handleChange];
}

export const useDragAndTouch = ({
  onMove = null,
  onFinish = () => {},
  onStart = () => {},
  dependencies = [],
  isDisabled = false,
}: {
  onMove?: ((event: MouseEvent | TouchEvent) => void) | null;
  onFinish?: ((event: MouseEvent | TouchEvent) => void) | (() => void);
  onStart?:
    | ((event: React.MouseEvent | React.TouchEvent) => void)
    | (() => void);
  dependencies?: any[];
  isDisabled?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const handleStartDragging = (event: React.MouseEvent) => {
    event.preventDefault();
    onStart(event);
    setIsDragging(true);
  };

  const handleStartTouching = (event: React.TouchEvent) => {
    onStart(event);
    setIsTouching(true);
  };

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (onMove === null || (!isDragging && !isTouching)) {
        return;
      }

      onMove(event);
    },
    [isDragging, isTouching, onMove, ...dependencies]
  );

  const handleDragFinish = (event: MouseEvent) => {
    setIsDragging(false);

    if (!isTouching) {
      onFinish(event);
    }
  };

  const handleTouchFinish = (event: TouchEvent) => {
    setIsTouching(false);

    if (!isDragging) {
      onFinish(event);
    }
  };

  useEffect(() => {
    if (isDisabled) {
      setIsDragging(false);
      setIsTouching(false);
      return;
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleDragFinish);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleDragFinish);
    }

    if (isTouching) {
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleTouchFinish);
    } else {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleTouchFinish);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleDragFinish);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleTouchFinish);
    };
  }, [isDragging, isTouching, handleMove, handleDragFinish, handleTouchFinish]);

  return { handleStartDragging, handleStartTouching };
};
