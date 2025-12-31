const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}

/**
 * 获取加密安全的随机整数
 * @param max 最大值（不包含）
 */
function getSecureRandomInt(max: number): number {
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return (randomBuffer[0] ?? 0) % max;
}

export function buildUUID(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    switch (i) {
      case 9:
      case 14:
      case 19:
      case 24: {
        uuid += '-';
        break;
      }
      case 15: {
        uuid += 4;
        break;
      }
      case 20: {
        uuid += hexList[getSecureRandomInt(4) | 8];
        break;
      }
      default: {
        uuid += hexList[getSecureRandomInt(16)];
      }
    }
  }
  return uuid.replaceAll('-', '');
}

let unique = 0;
export function buildShortUUID(prefix = ''): string {
  const time = Date.now();
  const random = getSecureRandomInt(1_000_000_000);
  unique++;
  return `${prefix}_${random}${unique}${String(time)}`;
}
