import {
  Wrench,
  Zap,
  Waves,
  Hammer,
  Cpu,
} from "lucide-react";

export const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  zap: Zap,
  cpu: Cpu,
  hammer: Hammer,
  waves: Waves,
  wrench: Wrench,
};

export function getIcon(iconName: string) {
  return iconMap[iconName] || Zap;
}
