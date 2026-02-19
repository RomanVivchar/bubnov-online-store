import { createClient } from '@blinkdotnew/sdk';

const projectId = import.meta.env.VITE_BLINK_PROJECT_ID || 'bubnov-shop-site-jfx0bczx';
const publishableKey = import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || '';

export const blink = createClient({
  projectId,
  publishableKey,
  auth: { mode: 'headless' },
});
