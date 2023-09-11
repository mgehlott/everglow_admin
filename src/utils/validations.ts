const Validation = {
  checkNetConnection: async () => {
    let isConnected = window.navigator.onLine
    if (isConnected) {
      return true
    } else {
      return false
    }
  },
}

export default Validation
