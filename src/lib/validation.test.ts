import { describe, expect, it } from 'vitest';
import { contactMessageSchema } from './validation';

describe('contactMessageSchema', () => {
  it('accepts a valid contact message', () => {
    expect(contactMessageSchema.safeParse({
      senderName: 'Ada Lovelace',
      senderEmail: 'ada@example.com',
      subject: 'A collaboration',
      message: 'I would like to discuss a collaboration.',
    }).success).toBe(true);
  });

  it('rejects malformed email and short messages', () => {
    const result = contactMessageSchema.safeParse({
      senderName: 'A',
      senderEmail: 'not-an-email',
      message: 'Hi',
    });
    expect(result.success).toBe(false);
  });
});
