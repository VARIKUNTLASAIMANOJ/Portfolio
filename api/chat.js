// Vercel Function: POST /api/chat. Set ANTHROPIC_API_KEY in the project's
// environment variables; without it the site answers from the page alone.
import { handleChat } from '../server/chat.js';

export function POST(request) {
  return handleChat(request);
}
