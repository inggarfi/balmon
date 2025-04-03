// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");
    const tokenBot = env.TOKEN_BOT;
    const chatId = env.CHAT_ID;
    const userIP = request.headers.get("CF-Connecting-IP");
    const isBlocked = await env.BLOCKED_IPS.get(userIP);
    if (isBlocked) {
      return new Response("You are blocked", { status: 403 });
    }
    if (!message) {
      return new Response("No message provided", { status: 400 });
    }
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    if (imageExtensions.some((ext) => message.toLowerCase().includes(ext))) {
      await env.BLOCKED_IPS.put(userIP, "blocked", { expirationTtl: 86400 });
      return new Response("Image sending is not allowed. Your IP has been blocked.", { status: 403 });
    }
    const now = Date.now();
    const timestampsStr = await env.BLOCKED_IPS.get(`count_${userIP}`);
    const timestamps = timestampsStr ? JSON.parse(timestampsStr) : [];
    timestamps.push(now);
    const recentMessages = timestamps.filter((t) => now - t <= 6e3);
    await env.BLOCKED_IPS.put(`count_${userIP}`, JSON.stringify(recentMessages), { expirationTtl: 600 });
    if (recentMessages.length > 10) {
      await env.BLOCKED_IPS.put(userIP, "blocked", { expirationTtl: 86400 });
      return new Response("ngapain dek?", { status: 403 });
    }
    const telegramUrl = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`;
    await fetch(telegramUrl);
    return new Response("forbiden", { status: 403 });
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
