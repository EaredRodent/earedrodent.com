export default ({ store }) => {
  if (store.state['other']['device'].raspberryDetected) {
    import('./raspberryCssFix.css')
  }
}
