export function generateCode(length: number) {
  //let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', result="";
  let chars = '0123456789',
    result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

export function getTimeStamp() {
  let date_ob = new Date();
  let date = ('0' + date_ob.getDate()).slice(-2);
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  return hours + ':' + minutes + ' ';
}

export const getScore = (host: boolean, score: any) => {
  const { win, scores, score: singleScore, opponentScore } = score;

  if (win) return host ? 1 : 0; // Host wins or loses.

  if (scores) return host ? scores[0] : scores[1]; // Use scores array if available.

  if (host) return singleScore ?? 0; // Host score fallback.
  return opponentScore ?? 1; // Opponent score fallback.
};
