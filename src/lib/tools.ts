import { TOOLS } from '@/constants/tools';
import type { Tool } from '@/types/tools';

export function getToolByHref(href: string): Tool {
  const tool = TOOLS.find((item) => item.href === href);

  if (!tool) {
    throw new Error(`Unknown tool href: ${href}`);
  }

  return tool;
}
