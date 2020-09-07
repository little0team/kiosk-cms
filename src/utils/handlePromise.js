export default function handlePromise(promise) {
  return promise
    .then((response) => [null, response])
    .catch((err) => Promise.resolve([err, null]));
}
