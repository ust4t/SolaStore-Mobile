export const encodeURLString = url => {
  return url
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=? ;'",.<>\{\}\[\]\\\/]/gi, '-');
};
