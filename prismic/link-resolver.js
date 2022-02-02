export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'tool') {
    return '/tools/' + doc.uid
  }

  if (doc.type === 'games') {
    return '/games/' + doc.uid
  }

  if (doc.type) {
    return '/' + doc.uid
  }

  return '/not-found'
}
