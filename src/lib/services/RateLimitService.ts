export class RateLimitService {
    private limits: Map<string, { count: number; resetTime: number }> = new Map();
    private readonly LIMIT = 100;
    private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes

    constructor() { }

    checkLimit(key: string): { allowed: boolean; remaining: number; reset: number } {
        const now = Date.now();
        const record = this.limits.get(key);

        if (!record) {
            this.limits.set(key, { count: 1, resetTime: now + this.WINDOW_MS });
            return { allowed: true, remaining: this.LIMIT - 1, reset: now + this.WINDOW_MS };
        }

        if (now > record.resetTime) {
            // Reset window
            this.limits.set(key, { count: 1, resetTime: now + this.WINDOW_MS });
            return { allowed: true, remaining: this.LIMIT - 1, reset: now + this.WINDOW_MS };
        }

        if (record.count >= this.LIMIT) {
            return { allowed: false, remaining: 0, reset: record.resetTime };
        }

        record.count += 1;
        this.limits.set(key, record);
        return { allowed: true, remaining: this.LIMIT - record.count, reset: record.resetTime };
    }
}
