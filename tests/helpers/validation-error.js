export default function(pointer) {
  return {
    status: 422,
    source: { pointer },
    detail: 'testfoutmelding',
  };
}
